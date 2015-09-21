var subs = new SubsManager();
riceRoutes.route('/saleDetailReport', {
  name: 'rice.saleDetailReport',
  action: function(params, queryParams) {
    Layout.main('rice_saleDetailReport');
  },
  subscriptions: function() {
    this.register('rice_exchange', subs.subscribe('cpanel_exchange'));

  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Sale Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/saleDetailReportGen', {
  name: 'rice.saleDetailReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_saleDetailReportGen');
  },
  subscriptions: function() {
    this.register('rice_saleItems', subs.subscribe(
      'rice_saleItemsCategories'));
  },
  breadcrumb: {
    title: 'Sale Detail Report',
    parent: 'rice.home'
  }
});
