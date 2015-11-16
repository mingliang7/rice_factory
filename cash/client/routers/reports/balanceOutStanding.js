cashRoutes.route('/balanceOutStandingReport', {
  name: 'cash.balanceOutStandingReport',
  action: function(params, queryParams) {
    Layout.main('cash_balanceOutStandingReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'BalanceOutStanding Report',
    parent: 'cash.home'
  }
});

cashRoutes.route('/balanceOutStandingReportGen', {
  name: 'cash.balanceOutStandingReportGen',
  action: function(params, queryParams) {
    Layout.report('cash_balanceOutStandingReportGen');
  }
});
