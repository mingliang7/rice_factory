var subs = new SubsManager();

riceRoutes.route('/purchase/:supplierId', {
  name: 'rice.purchase',
  subscriptions: function(params, queryParams) {

    this.register(
      'rice_purchaseCategories',
      subs.subscribe('rice_purchaseCategories')
    );
    this.register(
      'rice_purchaseItems',
      subs.subscribe('rice_purchaseItems')
    );
    this.register('rice_exchange', subs.subscribe('cpanel_exchange'));
  },
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
