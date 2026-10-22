import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Territory } from './territory';
import { LanguageService } from './language';

@Component({selector:'app-territory',standalone:true,imports:[FormsModule],styleUrl:'./territory-panel.css',template:`
  <section class="territory">
    <div class="territory-heading"><div><small>{{t('SANTÉ DES CULTURES · MADAGASCAR','FAHASALAMAN’NY VOLY · MADAGASIKARA')}}</small><h2>Amoron’i Mania</h2><p>{{t('4 districts · Une même région, un suivi de proximité.','Distrika 4 · Faritra iray, fanaraha-maso akaiky.')}}</p></div><label>{{t('District','Distrika')}}<select [ngModel]="area.district()" (ngModelChange)="area.select($event)"><option value="">{{t('Les 4 districts','Ny distrika 4')}}</option>@for(d of area.districts;track d){<option [value]="d">{{d}}</option>}</select></label></div>
    <div class="districts">@for(d of area.districts;track d;let i=$index){<button (click)="area.select(area.district()===d?'':d)" [class.selected]="area.district()===d" [attr.aria-pressed]="area.district()===d"><span>0{{i+1}}</span><b>{{d}}</b><small>{{area.count(d)}} {{t('dossier(s) fictif(s)','tatitra santionany')}}</small></button>}</div>
    <div class="reliability"><b>{{t('Territoire vérifié · Données sanitaires de démonstration','Faritra voamarina · Angon-drakitra ara-pahasalamana santionany')}}</b><p>{{t('Les parcelles, superficies et signalements sont fictifs. Les compteurs portent uniquement sur ces exemples, pas sur la situation sanitaire réelle des districts. La tomate reste la culture pilote.','Santionany ny saha, ny velarana ary ny tatitra. Ireo ohatra ireo ihany no isaina fa tsy ny tena fahasalaman’ny voly isaky ny distrika. Ny voatabia no voly andrana.')}}</p><details><summary>{{t('Sources et limites des données','Loharano sy fetran’ny angon-drakitra')}}</summary><p>{{t('Découpage administratif : portail public Torolalana et atlas INSTAT RGPH-3 2018, publié en juillet 2023. Sources consultées le 22 octobre 2026.','Fizaram-paritra: Torolalana sy atlas INSTAT RGPH-3 2018, nivoaka tamin’ny jolay 2023. Nojerena ny 22 oktobra 2026.')}}</p><a href="https://torolalana.gov.mg/mg/services/regions-et-districts/" target="_blank" rel="noopener noreferrer">Torolalana · Faritra sy distrika ↗</a><a href="https://www.instat.mg/documents/upload/main/INSTAT_RGPH-3_ATLAS%20DEMOGRAPHIQUE.pdf" target="_blank" rel="noopener noreferrer">INSTAT · Atlas RGPH-3 (PDF) ↗</a><p>{{t('Aucune prévalence, alerte sanitaire, mesure météo ou humidité réelle n’est disponible dans cette maquette. Un statut « Résolu » représente un suivi fictif, pas un diagnostic validé.','Tsy misy tahan’aretina, fampitandremana na fandrefesana toetrandro sy hamandoana tena izy eto. Santionany ihany ny tatitra voavaha.')}}</p></details></div>
  </section>`})
export class TerritoryPanel {
  readonly area=inject(Territory);
  readonly language=inject(LanguageService);
  t(fr:string,mg:string){return this.language.lang()==='fr'?fr:mg}
}
