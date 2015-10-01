var subs = new SubsManager();

riceRoutes.route('/purchaseItems/:purchaseCategoryId', {
  name: 'rice.purchaseItems',
  subscriptions: function(params, queryParams) {},
  action: function(params, queryParams) {
    Layout.main('rice_purchaseItems');
  },
  breadcrumb: {
    params: ['purchaseCategoryId'],
    //queryParams: ['show', 'color'],
    title: 'Sale Items',
    parent: 'rice.purchaseCategories'
  }
});
