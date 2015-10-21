riceRoutes.route('/outstandingReport', {
  name: 'rice.outstandingReport',
  action: function(params, queryParams) {
    Layout.main('rice_outstandingReport');
  },
  subscriptions: function() {

  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Sale Outstanding Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/outstandingReportGen', {
  name: 'rice.outstandingReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_outstandingReportGen');
  },
  breadcrumb: {
    title: 'Outstanding Report',
    parent: 'rice.home'
  }
});
