var subs = new SubsManager();
riceRoutes.route('/purchaseReport', {
  name: 'rice.purchaseReport',
  action: function(params, queryParams) {
    Layout.main('rice_purchaseReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Purchase Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/purchaseReportGen', {
  name: 'rice.purchaseReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_purchaseReportGen');
  },
  breadcrumb: {
    title: 'Purchase Report',
    parent: 'rice.home'
  }
});
