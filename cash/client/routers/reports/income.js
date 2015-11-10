cashRoutes.route('/incomeReport', {
  name: 'cash.incomeReport',
  action: function(params, queryParams) {
    Layout.main('cash_incomeReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'incomeReport Report',
    parent: 'cash.home'
  }
});

cashRoutes.route('/incomeReportGen', {
  name: 'cash.incomeReportGen',
  action: function(params, queryParams) {
    Layout.report('cash_incomeReportGen');
  }
});
