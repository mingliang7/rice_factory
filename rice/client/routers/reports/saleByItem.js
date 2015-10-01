var subs = new SubsManager();
riceRoutes.route('/saleByItemReport', {
  name: 'rice.saleByItemReport',
  action: function(params, queryParams) {
    Layout.main('rice_saleByItemReport');
  },
  subscriptions: function() {

  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Sale By Item Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/saleByItemReportGen', {
  name: 'rice.rice_saleByItemReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_saleByItemReportGen');
  },
  subscriptions: function() {
    this.register('rice_saleItems', subs.subscribe(
      'rice_saleItemsCategories'));
    this.register('rice_saleCategories', subs.subscribe(
      'rice_saleCategories'));
  },
  breadcrumb: {
    title: 'Sale By Item Report',
    parent: 'rice.home'
  }
});
