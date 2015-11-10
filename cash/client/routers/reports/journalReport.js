cashRoutes.route('/journalReport', {
  name: 'cash.journalReport',

  action: function(params, queryParams) {
    Layout.main('cash_journalReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'journalReport Report',
    parent: 'cash.home'
  }
});

cashRoutes.route('/journalReportGen', {
  name: 'cash.journalReportGen',
  action: function(params, queryParams) {
    Layout.report('cash_journalReportGen');
  }
});
