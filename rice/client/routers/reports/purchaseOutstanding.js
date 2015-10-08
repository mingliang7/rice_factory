riceRoutes.route('/purchaseOutstandingReport', {
  name: 'rice.purchaseOutstandingReport',
  action: function(params, queryParams) {
    Layout.main('rice_purchaseOutstandingReport');
  },
  subscriptions: function() {

  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Payment Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/purchaseOutstandingReportGen', {
  name: 'rice.purchaseOutstandingReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_purchaseOutstandingReportGen');
  },
  breadcrumb: {
    title: 'Outstanding Report',
    parent: 'rice.home'
  }
});
