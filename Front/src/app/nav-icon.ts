import { Component, Input } from '@angular/core';

type IconName = 'dashboard' | 'scan' | 'plots' | 'reports' | 'guides' | 'messages' | 'leaf';

@Component({
  selector: 'app-nav-icon',
  standalone: true,
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path [attr.d]="paths[name] || paths['dashboard']" /></svg>`,
  styles: [`:host{display:inline-flex;width:22px;height:22px;flex:none;vertical-align:middle}svg{display:block;width:100%;height:100%}`]
})
export class NavIcon {
  @Input() name: IconName | string = 'dashboard';
  readonly paths: Record<string, string> = {
    dashboard: 'M4 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM15 3h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM4 14h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1ZM15 12h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z',
    scan: 'M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3M7 14c0-5 4-7 10-7 0 6-2 10-7 10M7 17l7-7',
    plots: 'm3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15',
    reports: 'm10.3 4.4-8 14A1.7 1.7 0 0 0 3.8 21h16.4a1.7 1.7 0 0 0 1.5-2.6l-8-14a2 2 0 0 0-3.4 0ZM12 9v5m0 3.5v.1',
    guides: 'M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15M5 8h3m-3 4h3m8-4h3m-3 4h3',
    messages: 'M5 3h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-6 4V5a2 2 0 0 1 2-2Zm2 5h10M7 12h7',
    leaf: 'M20 3C9 3 4 7 4 14a6 6 0 0 0 6 6c7 0 10-6 10-17ZM3 21 15 9m-6 6v-4m0 4h4'
  };
}
