import { Component, Input, signal, OnDestroy, inject, effect } from '@angular/core';
import { LanguageService, TranslatePipe } from './language';
import { FormsModule } from '@angular/forms';
import { Territory } from './territory';

@Component({
  selector: 'farm-tools', standalone: true, imports: [FormsModule, TranslatePipe],
  templateUrl: './farm-tools.html', styleUrls: ['./farm-tools.css', './farm-mobile.css']
})
export class FarmTools implements OnDestroy {
  @Input() compact = false;
  readonly language = inject(LanguageService);
  readonly area = inject(Territory);
  readonly lang = this.language.lang;
  tab = signal('diagnosis');
  readonly region = this.area.region;
  crop = 'Tomate';
  private chosenPlot = '';
  get plot(){return this.area.visiblePlots().find(p=>p.name===this.chosenPlot)?.name || this.area.visiblePlots()[0]?.name || '';}
  set plot(value:string){this.chosenPlot=value;}
  symptom = '';
  scenario = 'spots';
  preview = signal('');
  filename = signal('');
  error = signal('');
  stage = signal<'ready'|'loading'|'result'>('ready');
  saved = signal(false);
  storageError = signal('');
  selectedGuide = signal('');
  history = signal<{date:string;crop:string;plot:string;title:string;district?:string}[]>([]);
  tasks = signal([{title:'Photographier la parcelle sélectionnée',when:'Aujourd’hui',done:false},{title:'Noter l’évolution des symptômes',when:'Dans 2 jours',done:false},{title:'Préparer les questions pour le technicien',when:'Avant la prochaine visite',done:false}]);
  timer?: ReturnType<typeof setTimeout>;
  scenarios: Record<string,{title:string;alternatives:string[]}> = {
    spots:{title:'Exemple : suspicion de maladie foliaire',alternatives:['Maladie foliaire','Carence ou stress','Dégât lié à un ravageur']},
    wilt:{title:'Exemple : flétrissement à examiner',alternatives:['Stress hydrique','Problème racinaire','Autre cause à confirmer']},
    uncertain:{title:'Exemple : résultat non concluant',alternatives:['Photo insuffisante','Symptômes non spécifiques','Examen terrain nécessaire']}
  };
  constructor(){
    effect(()=>{this.area.district();this.reset();});
    try {
      const raw = JSON.parse(localStorage.getItem('agriveille-demo-history') || '[]');
      if(Array.isArray(raw)) this.history.set(raw.filter(r=>r&&typeof r.title==='string'&&typeof r.crop==='string'&&typeof r.plot==='string'&&typeof r.date==='string'));
    } catch { this.storageError.set('Le stockage local est indisponible. Vous pouvez continuer la démonstration.'); }
  }
  t(fr:string,mg:string){return this.lang()==='fr'?fr:mg}
  visibleHistory(){return this.history().filter(item=>!this.area.district()||item.district===this.area.district());}
  result(){return this.scenarios[this.scenario] || this.scenarios['uncertain']}
  choose(event:Event){
    const file=(event.target as HTMLInputElement).files?.[0];
    if(!file)return;
    this.error.set('');
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){this.error.set('Choisissez une image JPG, PNG ou WebP de moins de 10 Mo.');return;}
    this.release(); this.preview.set(URL.createObjectURL(file)); this.filename.set(file.name); this.reset();
  }
  reset(){clearTimeout(this.timer);this.stage.set('ready');this.saved.set(false)}
  analyze(){
    this.reset();this.stage.set('loading');
    this.timer=setTimeout(()=>this.stage.set('result'),1600);
  }
  save(){
    if(this.saved())return;
    const items=[{date:new Date().toLocaleDateString('fr-FR'),crop:this.crop,plot:this.plot,district:this.area.plots.find(p=>p.name===this.plot)?.district,title:this.result().title},...this.history()];
    this.history.set(items);this.saved.set(true);
    try{localStorage.setItem('agriveille-demo-history',JSON.stringify(items))}catch{this.storageError.set('Dossier conservé pour cette session uniquement : stockage local indisponible.')}
  }
  toggle(index:number){this.tasks.update(items=>items.map((item,i)=>i===index?{...item,done:!item.done}:item))}
  completed(){return this.tasks().filter(t=>t.done).length}
  release(){if(this.preview())URL.revokeObjectURL(this.preview())}
  ngOnDestroy(){clearTimeout(this.timer);this.release()}
}
