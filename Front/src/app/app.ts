import { Component, signal, inject, HostListener } from '@angular/core';
import { Notifications } from './notifications';
import { NavIcon } from './nav-icon';
import { LanguageService, TranslatePipe } from './language';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FarmTools } from './farm-tools';
import { Territory } from './territory';
import { TerritoryPanel } from './territory-panel';

interface Report { id:string; title:string; plot:string; date:string; status:string; emoji:string }

@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule,FarmTools,TranslatePipe,Notifications,NavIcon,TerritoryPanel],templateUrl:'./app.html',styleUrls:['./app.css','./mobile.css','./sidebar.css']})
export class App {
  readonly language = inject(LanguageService);
  readonly area = inject(Territory);
  readonly mobileViewport = signal(window.matchMedia('(max-width: 820px)').matches);
  @HostListener('window:resize') resize(){this.mobileViewport.set(window.matchMedia('(max-width: 820px)').matches);}
  @HostListener('document:keydown.escape') closeMenu(){this.menu.set(false);}
  view=signal('dashboard'); menu=signal(false); modal=signal(false); notices=signal(false); toast=signal(''); search='';
  draft={plot:'',symptoms:'',extent:'Quelques plants'};
  nav=[['dashboard','dashboard','Tableau de bord'],['farm','scan','Assistant au champ'],['plots','plots','Mes parcelles'],['reports','reports','Signalements'],['guides','guides','Fiches pratiques'],['messages','messages','Messages']];
  get plots(){return this.area.visiblePlots()}
  get reports(){return this.area.visibleReports()}
  get stats(){return [['♧','Parcelles actives',String(this.plots.length),'Exemples fictifs','green'],['!','À surveiller',String(this.plots.filter(p=>p.health==='À surveiller').length),'Exemples fictifs','amber'],['◷','En attente d’avis',String(this.reports.filter(r=>r.status==='En attente').length),'Exemples fictifs','red'],['✓','Cas résolus',String(this.reports.filter(r=>r.status==='Résolu').length),'Exemples fictifs','blue']]}
  guides=[['🍂','MALADIE','Reconnaître et prévenir le mildiou'],['💧','PRÉVENTION','Bien arroser les tomates'],['🐛','RAVAGEUR','Identifier les insectes nuisibles']];
  setView(v:string){this.view.set(v);this.menu.set(false)}
  title(){return this.nav.find(n=>n[0]===this.view())?.[2]||''}
  filtered(){const q=this.search.toLowerCase();return this.reports.filter(r=>!q||Object.values(r).map(v=>this.language.translate(v)).join(' ').toLowerCase().includes(q))}
  submit(){
    const plot=this.plots.find(p=>p.name===this.draft.plot);
    if(!plot){this.draft.plot='';return;}
    this.area.reports.update(items=>[{id:'DEMO-'+String(items.length+1).padStart(3,'0'),title:this.draft.symptoms,plot:plot.name,district:plot.district,date:new Date().toLocaleDateString('fr-FR'),status:'En attente',emoji:'📷'},...items]);
    this.modal.set(false);this.draft={plot:'',symptoms:'',extent:'Quelques plants'};this.message('Dossier de démonstration créé, non transmis');
  }
  message(t:string){this.toast.set(t);setTimeout(()=>this.toast.set(''),2500)}
}
