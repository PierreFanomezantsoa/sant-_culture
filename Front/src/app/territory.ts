import { Injectable, computed, signal } from '@angular/core';

export interface DemoReport { id:string; title:string; plot:string; district:string; date:string; status:string; emoji:string }
@Injectable({providedIn:'root'})
export class Territory {
  readonly region = 'Amoron’i Mania';
  readonly districts = ['Ambositra','Fandriana','Ambatofinandrahana','Manandriana'];
  readonly district = signal('');
  readonly plots = [
    {name:'Parcelle A',district:'Ambositra',area:'0,30 ha',health:'À surveiller',humidity:'Non mesurée',tone:'watch'},
    {name:'Parcelle B',district:'Fandriana',area:'0,25 ha',health:'À surveiller',humidity:'Non mesurée',tone:'watch'},
    {name:'Parcelle C',district:'Ambatofinandrahana',area:'0,40 ha',health:'Bonne santé',humidity:'Non mesurée',tone:'healthy'},
    {name:'Parcelle D',district:'Manandriana',area:'0,20 ha',health:'Non évaluée',humidity:'Non mesurée',tone:''}
  ];
  readonly reports = signal<DemoReport[]>([
    {id:'DEMO-001',title:'Taches brunes sur feuilles',plot:'Parcelle A',district:'Ambositra',date:'22 oct. 2026',status:'En attente',emoji:'🍂'},
    {id:'DEMO-002',title:'Flétrissement inhabituel',plot:'Parcelle B',district:'Fandriana',date:'21 oct. 2026',status:'En cours',emoji:'🥀'},
    {id:'DEMO-003',title:'Feuilles jaunissantes',plot:'Parcelle C',district:'Ambatofinandrahana',date:'20 oct. 2026',status:'Résolu',emoji:'🍃'},
    {id:'DEMO-004',title:'Observation à compléter',plot:'Parcelle D',district:'Manandriana',date:'22 oct. 2026',status:'En attente',emoji:'📋'}
  ]);
  readonly visiblePlots = computed(()=>this.plots.filter(p=>!this.district()||p.district===this.district()));
  readonly visibleReports = computed(()=>this.reports().filter(r=>!this.district()||r.district===this.district()));
  select(value:string){if(value===''||this.districts.includes(value))this.district.set(value)}
  count(district:string){return this.reports().filter(r=>r.district===district).length}
}
