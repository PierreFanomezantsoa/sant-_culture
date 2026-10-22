import { Injectable, computed, signal } from '@angular/core';

export interface DemoReport { id:string; title:string; plot:string; district:string; crop:string; commune:string; date:string; status:string; emoji:string }
@Injectable({providedIn:'root'})
export class Territory {
  readonly region = 'Amoron’i Mania';
  readonly districts = ['Ambositra','Fandriana','Ambatofinandrahana','Manandriana'];
  readonly district = signal('');
  // Crop information supplied by the user; not an official production census.
  readonly profiles = [
    {district:'Ambositra',crops:['Riz','Haricot','Orange','Tomate'],commune:'Andina',note:'Tomate : commune d’Andina'},
    {district:'Fandriana',crops:['Riz','Fruits variés'],commune:'',note:'Espèces fruitières à préciser'},
    {district:'Ambatofinandrahana',crops:['Orge','Maïs','Arachide','Riz'],commune:'',note:'Communes à préciser'},
    {district:'Manandriana',crops:['Orge','Maïs','Arachide','Riz'],commune:'',note:'Communes à préciser'}
  ];
  readonly visibleProfiles = computed(()=>this.profiles.filter(p=>!this.district()||p.district===this.district()));
  readonly plots = [
    {name:'Parcelle A',district:'Ambositra',commune:'Andina',crop:'Tomate',emoji:'🍅',area:'0,30 ha',health:'À surveiller',humidity:'Non mesurée',tone:'watch'},
    {name:'Parcelle B',district:'Fandriana',commune:'',crop:'Riz',emoji:'🌾',area:'0,25 ha',health:'À surveiller',humidity:'Non mesurée',tone:'watch'},
    {name:'Parcelle C',district:'Ambatofinandrahana',commune:'',crop:'Maïs',emoji:'🌽',area:'0,40 ha',health:'Bonne santé',humidity:'Non mesurée',tone:'healthy'},
    {name:'Parcelle D',district:'Manandriana',commune:'',crop:'Orge',emoji:'🌾',area:'0,20 ha',health:'Non évaluée',humidity:'Non mesurée',tone:''}
  ];
  readonly reports = signal<DemoReport[]>([
    {id:'DEMO-001',title:'Taches brunes sur feuilles',plot:'Parcelle A',district:'Ambositra',commune:'Andina',crop:'Tomate',date:'22 oct. 2026',status:'En attente',emoji:'🍂'},
    {id:'DEMO-002',title:'Flétrissement inhabituel',plot:'Parcelle B',district:'Fandriana',commune:'',crop:'Riz',date:'21 oct. 2026',status:'En cours',emoji:'🥀'},
    {id:'DEMO-003',title:'Feuilles jaunissantes',plot:'Parcelle C',district:'Ambatofinandrahana',commune:'',crop:'Maïs',date:'20 oct. 2026',status:'Résolu',emoji:'🍃'},
    {id:'DEMO-004',title:'Observation à compléter',plot:'Parcelle D',district:'Manandriana',commune:'',crop:'Orge',date:'22 oct. 2026',status:'En attente',emoji:'📋'}
  ]);
  readonly visiblePlots = computed(()=>this.plots.filter(p=>!this.district()||p.district===this.district()));
  readonly visibleReports = computed(()=>this.reports().filter(r=>!this.district()||r.district===this.district()));
  select(value:string){if(value===''||this.districts.includes(value))this.district.set(value)}
  count(district:string){return this.reports().filter(r=>r.district===district).length}
}
