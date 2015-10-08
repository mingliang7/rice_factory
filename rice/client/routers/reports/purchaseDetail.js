var subs = new SubsManager();
riceRoutes.route('/purchaseDetailReport', {
  name: 'rice.purchaseDetailReport',
  action: function(params, queryParams) {
    Layout.main('rice_purchaseDetailReport');
  },
  subscriptions: function() {

  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Purchase Detail Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/purchaseDetailReportGen', {
  name: 'rice.purchaseDetailReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_purchaseDetailReportGen');
  },
  subscriptions: function() {

  },
  breadcrumb: {
    title: 'Purchase Detail Report',
    parent: 'rice.home'
  }
});
