(function () {
  'use strict';

  angular.module('agriSanteApp', ['ngSanitize'])
    .controller('AppController', ['$timeout', '$scope', function ($timeout, $scope) {
      var vm = this;

      var icons = {
        dashboard: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
        leaf: '<svg viewBox="0 0 24 24"><path d="M20 4C10 4 4 9 4 18c5 0 9-2 12-6-2 4-5 7-9 9"/></svg>',
        alert: '<svg viewBox="0 0 24 24"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 9v4M12 17h.01"/></svg>',
        book: '<svg viewBox="0 0 24 24"><path d="M4 5a3 3 0 0 1 3-2h5v17H7a3 3 0 0 0-3 1V5ZM20 5a3 3 0 0 0-3-2h-5v17h5a3 3 0 0 1 3 1V5Z"/></svg>',
        chat: '<svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/></svg>',
        check: '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
        clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
      };

      vm.activeView = 'dashboard';
      vm.sidebarOpen = false;
      vm.notificationsOpen = false;
      vm.reportModal = false;
      vm.selectedReport = null;
      vm.reportFilter = 'all';
      vm.search = '';
      vm.newReport = { plot: '', extent: 'Quelques plants' };

      vm.navItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: icons.dashboard },
        { id: 'plots', label: 'Mes parcelles', icon: icons.leaf },
        { id: 'reports', label: 'Signalements', icon: icons.alert, badge: 3 },
        { id: 'guides', label: 'Fiches pratiques', icon: icons.book },
        { id: 'messages', label: 'Messages', icon: icons.chat, badge: 1 }
      ];

      vm.pages = {
        plots: { title: 'Mes parcelles', subtitle: 'Surveillez la santé de vos parcelles de tomate.' },
        reports: { title: 'Signalements', subtitle: 'Consultez vos demandes et les réponses des techniciens.' },
        guides: { title: 'Fiches pratiques', subtitle: 'Des conseils validés pour protéger vos tomates.' },
        messages: { title: 'Messages', subtitle: 'Échangez avec votre technicien agricole.' }
      };

      vm.stats = [
        { label: 'Parcelles actives', value: '10', trend: '+2 cette saison', trendTone: 'positive', tone: 'green', icon: icons.leaf, target: 'plots' },
        { label: 'À surveiller', value: '3', trend: 'Action requise', trendTone: 'attention', tone: 'orange', icon: icons.alert, target: 'reports' },
        { label: 'En attente d’avis', value: '2', trend: '−1 cette semaine', trendTone: 'positive', tone: 'red', icon: icons.clock, target: 'reports' },
        { label: 'Cas résolus', value: '12', trend: '+4 ce mois', trendTone: 'positive', tone: 'blue', icon: icons.check, target: 'reports' }
      ];

      vm.activities = [
        { tone: 'green', icon: icons.chat, text: '<strong>Dr. Rakoto</strong> a répondu au signalement <strong>#SIG-024</strong>', time: 'Il y a 12 minutes' },
        { tone: 'orange', icon: icons.alert, text: 'Nouveau signalement créé pour la <strong>Parcelle Nord</strong>', time: 'Il y a 2 heures' },
        { tone: 'blue', icon: icons.check, text: 'Intervention terminée sur la <strong>Parcelle Est</strong>', time: 'Hier, 16:40' }
      ];

      vm.plots = [
        { code: 'PAR-001', name: 'Parcelle Nord', area: '1,2 ha', planted: '12 août 2026', humidity: '68%', lastCheck: 'Aujourd’hui', health: 'À surveiller', tone: 'watch-tone' },
        { code: 'PAR-002', name: 'Parcelle Est', area: '0,8 ha', planted: '18 août 2026', humidity: '61%', lastCheck: 'Hier', health: 'Bonne santé', tone: '' },
        { code: 'PAR-003', name: 'Parcelle Sud', area: '1,5 ha', planted: '05 août 2026', humidity: '74%', lastCheck: 'Il y a 2 jours', health: 'Critique', tone: 'critical-tone' },
        { code: 'PAR-004', name: 'Parcelle Ouest', area: '0,6 ha', planted: '24 août 2026', humidity: '59%', lastCheck: 'Aujourd’hui', health: 'Bonne santé', tone: '' }
      ];

      vm.reports = [
        { id:'SIG-024', title:'Taches brunes sur feuilles', plot:'Parcelle Nord', area:'1,2 ha', date:'22 oct. 2026', days:'Aujourd’hui', status:'En attente', statusClass:'waiting', technician:'Dr. Rakoto', techInitials:'DR', emoji:'🍂', imageClass:'leaf', description:'Des taches brunes irrégulières sont apparues sur les feuilles basses.', advice:'Les symptômes évoquent un début d’alternariose. Retirez les feuilles très atteintes et évitez l’arrosage par aspersion. Envoyez une nouvelle photo dans 48 heures.' },
        { id:'SIG-021', title:'Flétrissement inhabituel', plot:'Parcelle Sud', area:'1,5 ha', date:'20 oct. 2026', days:'Il y a 2 jours', status:'En cours', statusClass:'progress', technician:'M. Andry', techInitials:'MA', emoji:'🥀', imageClass:'soil', description:'Plusieurs plants restent flétris même après l’arrosage du matin.', advice:'Vérifiez l’humidité à 15 cm de profondeur et coupez une tige pour observer la coloration interne. Isolez les plants atteints en attendant le diagnostic.' },
        { id:'SIG-018', title:'Feuilles jaunissantes', plot:'Parcelle Est', area:'0,8 ha', date:'17 oct. 2026', days:'Il y a 5 jours', status:'Résolu', statusClass:'resolved', technician:'Dr. Rakoto', techInitials:'DR', emoji:'🍃', imageClass:'yellow', description:'Jaunissement progressif des feuilles anciennes sur environ dix plants.', advice:'Une carence en azote a été confirmée. L’apport fractionné recommandé a permis une reprise normale de la végétation.' },
        { id:'SIG-012', title:'Petits trous sur feuilles', plot:'Parcelle Ouest', area:'0,6 ha', date:'09 oct. 2026', days:'Il y a 13 jours', status:'Résolu', statusClass:'resolved', technician:'Mme Soa', techInitials:'MS', emoji:'🌿', imageClass:'leaf', description:'De petits trous circulaires sont visibles sur les jeunes feuilles.', advice:'Des altises ont été identifiées. Le filet anti-insectes et le traitement conseillé ont maîtrisé l’attaque.' },
        { id:'SIG-009', title:'Dépôt blanc poudreux', plot:'Parcelle Nord', area:'1,2 ha', date:'02 oct. 2026', days:'Il y a 20 jours', status:'Résolu', statusClass:'resolved', technician:'Mme Soa', techInitials:'MS', emoji:'🌱', imageClass:'leaf', description:'Un dépôt poudreux blanc recouvre quelques feuilles.', advice:'Oïdium confirmé. Améliorez l’aération et respectez le protocole de traitement remis par la technicienne.' }
      ];

      vm.guides = [
        { category:'MALADIE', title:'Reconnaître et prévenir le mildiou', description:'Les signes à surveiller et les bons gestes pour limiter sa propagation.', readTime:'5 min', emoji:'🍂', tone:'red' },
        { category:'PRÉVENTION', title:'Bien arroser les tomates', description:'Fréquence, quantité et moment idéal pour garder des plants sains.', readTime:'4 min', emoji:'💧', tone:'' },
        { category:'RAVAGEUR', title:'Identifier les insectes nuisibles', description:'Une méthode simple pour reconnaître les principaux ravageurs.', readTime:'7 min', emoji:'🐛', tone:'amber' }
      ];

      vm.filters = [
        { id:'all', label:'Tous' }, { id:'waiting', label:'En attente' }, { id:'progress', label:'En cours' }, { id:'resolved', label:'Résolus' }
      ];

      vm.setView = function (view) {
        vm.activeView = view;
        vm.currentPage = vm.pages[view];
        vm.sidebarOpen = false;
        window.scrollTo(0, 0);
      };

      vm.openReport = function () {
        vm.reportModal = true;
        vm.notificationsOpen = false;
      };

      vm.closeModal = function (event) {
        if (event.target === event.currentTarget) vm.reportModal = false;
      };

      vm.filesSelected = function (files) {
        vm.fileLabel = files.length === 1 ? files[0].name : files.length + ' photos sélectionnées';
        $scope.$applyAsync();
      };

      vm.submitReport = function () {
        vm.reports.unshift({
          id: 'SIG-025', title: vm.newReport.symptoms.slice(0, 38), plot: vm.newReport.plot,
          area: '—', date: '22 oct. 2026', days: 'À l’instant', status: 'En attente',
          statusClass: 'waiting', technician: 'Non assigné', techInitials: '—', emoji: '📷', imageClass: 'leaf',
          description: vm.newReport.symptoms, advice: 'Votre signalement vient d’être transmis. Un technicien vous répondra prochainement.'
        });
        vm.reportModal = false;
        vm.newReport = { plot: '', extent: 'Quelques plants' };
        vm.fileLabel = '';
        vm.showToast('Signalement envoyé avec succès');
      };

      vm.filteredReports = function () {
        if (vm.reportFilter === 'all') return vm.reports;
        return vm.reports.filter(function (report) { return report.statusClass === vm.reportFilter; });
      };

      vm.selectReport = function (report) { vm.selectedReport = report; };

      vm.showToast = function (message) {
        vm.toast = message;
        $timeout(function () { vm.toast = ''; }, 2600);
      };
    }]);
})();
