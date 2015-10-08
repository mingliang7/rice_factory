var subs = new SubsManager();
riceRoutes.route('/purchaseByItemReport', {
  name: 'rice.purchaseByItemReport',
  action: function(params, queryParams) {
    Layout.main('rice_purchaseByItemReport');
  },
  subscriptions: function() {

  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Purchases By Item Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/purchaseByItemReportGen', {
  name: 'rice.rice_purchaseByItemReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_purchaseByItemReportGen');
  },
  subscriptions: function() {},
  breadcrumb: {
    title: 'Purchases By Item Report',
    parent: 'rice.home'
  }
});
