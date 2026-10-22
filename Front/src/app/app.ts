import { Component, signal, inject, HostListener } from '@angular/core';
import { Notifications } from './notifications';
import { NavIcon } from './nav-icon';
import { LanguageService, TranslatePipe } from './language';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FarmTools } from './farm-tools';

interface Report { id:string; title:string; plot:string; date:string; status:string; emoji:string }

@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule,FarmTools,TranslatePipe,Notifications,NavIcon],templateUrl:'./app.html',styleUrls:['./app.css','./mobile.css','./sidebar.css']})
export class App {
  readonly language = inject(LanguageService);
  readonly mobileViewport = signal(window.matchMedia('(max-width: 820px)').matches);
  @HostListener('window:resize') resize(){this.mobileViewport.set(window.matchMedia('(max-width: 820px)').matches);}
  @HostListener('document:keydown.escape') closeMenu(){this.menu.set(false);}
  view=signal('dashboard'); menu=signal(false); modal=signal(false); notices=signal(false); toast=signal(''); search='';
  draft={plot:'',symptoms:'',extent:'Quelques plants'};
  nav=[['dashboard','dashboard','Tableau de bord'],['farm','scan','Assistant au champ'],['plots','plots','Mes parcelles'],['reports','reports','Signalements'],['guides','guides','Fiches pratiques'],['messages','messages','Messages']];
  stats=[['♧','Parcelles actives','10','+2 cette saison','green'],['!','À surveiller','3','Action requise','amber'],['◷','En attente d’avis','2','−1 cette semaine','red'],['✓','Cas résolus','12','+4 ce mois','blue']];
  plots=[
    {name:'Parcelle Nord',area:'1,2 ha',health:'À surveiller',humidity:'68%',tone:'watch'},
    {name:'Parcelle Est',area:'0,8 ha',health:'Bonne santé',humidity:'61%',tone:'healthy'},
    {name:'Parcelle Sud',area:'1,5 ha',health:'Critique',humidity:'74%',tone:'critical'}];
  reports:Report[]=[
    {id:'SIG-024',title:'Taches brunes sur feuilles',plot:'Parcelle Nord',date:'22 oct. 2026',status:'En attente',emoji:'🍂'},
    {id:'SIG-021',title:'Flétrissement inhabituel',plot:'Parcelle Sud',date:'20 oct. 2026',status:'En cours',emoji:'🥀'},
    {id:'SIG-018',title:'Feuilles jaunissantes',plot:'Parcelle Est',date:'17 oct. 2026',status:'Résolu',emoji:'🍃'}];
  guides=[['🍂','MALADIE','Reconnaître et prévenir le mildiou'],['💧','PRÉVENTION','Bien arroser les tomates'],['🐛','RAVAGEUR','Identifier les insectes nuisibles']];
  setView(v:string){this.view.set(v);this.menu.set(false)}
  title(){return this.nav.find(n=>n[0]===this.view())?.[2]||''}
  filtered(){const q=this.search.toLowerCase();return this.reports.filter(r=>!q||Object.values(r).map(v=>this.language.translate(v)).join(' ').toLowerCase().includes(q))}
  submit(){this.reports.unshift({id:'SIG-025',title:this.draft.symptoms,plot:this.draft.plot,date:'22 oct. 2026',status:'En attente',emoji:'📷'});this.modal.set(false);this.draft={plot:'',symptoms:'',extent:'Quelques plants'};this.message('Signalement envoyé au technicien')}
  message(t:string){this.toast.set(t);setTimeout(()=>this.toast.set(''),2500)}
}
