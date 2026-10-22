import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../language';
import { TerritoryPanel } from '../territory-panel';
import { FarmTools } from '../farm-tools';
import { App } from '../app';

// The shell owns shared filters and the report dialog across route changes.
class PageContext {
  readonly shell = inject(App);
  readonly area = this.shell.area;
  readonly modal = this.shell.modal;
  get plots(){return this.shell.plots;}
  get stats(){return this.shell.stats;}
  get guides(){return this.shell.guides;}
  view(){return this.shell.view();}
  title(){return this.shell.title();}
  filtered(){return this.shell.filtered();}
  setView(view:string){this.shell.setView(view);}
  message(text:string){this.shell.message(text);}
}
@Component({standalone:true, imports:[TranslatePipe,TerritoryPanel], templateUrl:'./dashboard.html'})
export class DashboardPage extends PageContext {}
@Component({standalone:true, imports:[FarmTools], templateUrl:'./farm.html'})
export class FarmPage extends PageContext {}
@Component({standalone:true, imports:[TranslatePipe], templateUrl:'./plots.html'})
export class PlotsPage extends PageContext {}
@Component({standalone:true, imports:[TranslatePipe], templateUrl:'./reports.html'})
export class ReportsPage extends PageContext {}
@Component({standalone:true, imports:[TranslatePipe], templateUrl:'./guides.html'})
export class GuidesPage extends PageContext {}
@Component({standalone:true, imports:[TranslatePipe], templateUrl:'./messages.html'})
export class MessagesPage extends PageContext {}

