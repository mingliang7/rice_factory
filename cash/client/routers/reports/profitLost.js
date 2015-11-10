cashRoutes.route('/ProfitLostReport', {
  name: 'cash.ProfitLostReport',
/*  subscriptions: function(params, queryParams) {
    this.register('cpanel_exchange', Meteor.subscribe('cpanel_exchange')),
      this.register('cash_currency', Meteor.subscribe('cash_currency'));
  },*/
  action: function(params, queryParams) {
    Layout.main('cash_ProfitLostReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'ProfitLostReport Report',
    parent: 'cash.home'
  }
});

cashRoutes.route('/ProfitLostReportGen', {
  name: 'cash.ProfitLostReportGen',
  action: function(params, queryParams) {
    Layout.report('cash_ProfitLostReportGen');
  }
});
