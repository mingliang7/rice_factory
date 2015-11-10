cashRoutes.route('/expenseReport', {
  name: 'cash.expenseReport',
  action: function(params, queryParams) {
    Layout.main('cash_expenseReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'expenseReport Report',
    parent: 'cash.home'
  }
});

cashRoutes.route('/expenseReportGen', {
  name: 'cash.expenseReportGen',
  action: function(params, queryParams) {
    Layout.report('cash_expenseReportGen');
  }
});
