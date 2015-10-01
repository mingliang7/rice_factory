var subs = new SubsManager();

riceRoutes.route('/purchase/:supplierId', {
  name: 'rice.purchase',
  subscriptions: function(params, queryParams) {},
  action: function(params, queryParams) {
    Layout.main('rice_purchase');
  },
  breadcrumb: {
    params: ['supplierId'],
    //queryParams: ['show', 'color'],
    title: 'purchase',
    parent: 'rice.supplier'
  }
});
