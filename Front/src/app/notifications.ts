import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { LanguageService } from './language';

@Component({
  selector:'app-notifications', standalone:true, styleUrl:'./notifications.css',
  template: `
    <button #bell class="notification-trigger" (click)="open.set(!open())" [class.active]="open()"
      [attr.aria-label]="t('Notifications','Fampandrenesana') + (unread() ? ': ' + unread() : '')"
      [attr.aria-expanded]="open()" aria-controls="notification-panel">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4M12 2V1"/></svg>
      @if(unread()){<span class="count" aria-hidden="true">{{unread()}}</span>}
    </button>
    @if(open()){
      <section id="notification-panel" class="notification-panel" [attr.aria-label]="t('Notifications','Fampandrenesana')">
        <div class="panel-title"><div><h2>{{t('Notifications','Fampandrenesana')}}</h2><small>{{unread()}} {{t('non lues','tsy mbola novakina')}}</small></div><button class="close" (click)="open.set(false); bell.focus()" [attr.aria-label]="t('Fermer','Hidio')">×</button></div>
        <div class="panel-meta"><span>{{t('Aujourd’hui · Démonstration','Anio · Santionany')}}</span><button (click)="readAll()" [disabled]="!unread()">{{t('Tout marquer lu','Mariho ho voavaky daholo')}}</button></div>
        @for(item of items();track item.id){
          <button class="notification-item" [class.unread]="!item.read" (click)="markRead(item.id)">
            <span class="item-icon" [class.reminder]="item.id===2">{{item.id===1?'✓':'◷'}}</span>
            <span class="item-copy"><strong>{{t(item.frTitle,item.mgTitle)}}</strong><span>{{t(item.fr,item.mg)}}</span><small>{{item.id===1?t('Il y a 12 minutes','12 minitra lasa'):t('Aujourd’hui, 08:00','Anio, 08:00')}}</small></span>
            @if(!item.read){<i class="unread-dot" aria-hidden="true"></i>}
          </button>
        }
        <p class="panel-foot" role="status">{{unread()?t('Touchez une notification pour la marquer comme lue.','Tsindrio ny fampandrenesana hanamarihana azy ho voavaky.'):t('Vous avez tout lu.','Voavakinao daholo.')}}</p>
      </section>
    }
  `
})
export class Notifications {
  private language=inject(LanguageService);
  private element=inject(ElementRef<HTMLElement>);
  open=signal(false);
  items=signal([
    {id:1,read:false,frTitle:'Exemple de suivi · Fandriana',mgTitle:'Ohatra fanaraha-maso · Fandriana',fr:'Le dossier fictif DEMO-002 est en cours de suivi.',mg:'Eo am-panaraha-maso ny tatitra santionany DEMO-002.'},
    {id:2,read:false,frTitle:'Observation · Ambositra',mgTitle:'Fandinihana · Ambositra',fr:'Exemple : compléter les observations de la parcelle A.',mg:'Ohatra: fenoy ny fandinihana ny saha A.'}
  ]);
  t(fr:string,mg:string){return this.language.lang()==='fr'?fr:mg}
  unread(){return this.items().filter(i=>!i.read).length}
  markRead(id:number){this.items.update(items=>items.map(i=>i.id===id?{...i,read:true}:i))}
  readAll(){this.items.update(items=>items.map(i=>({...i,read:true})))}
  @HostListener('document:click',['$event']) outside(event:Event){if(!this.element.nativeElement.contains(event.target as Node))this.open.set(false)}
  @HostListener('document:keydown.escape') escape(){if(this.open()){this.open.set(false);this.element.nativeElement.querySelector('button')?.focus()}}
}
