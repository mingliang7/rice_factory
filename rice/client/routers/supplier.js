var subs = new SubsManager();

riceRoutes.route('/supplier', {
  name: 'rice.supplier',
  subscriptions: function(params, queryParams) {
    // Customer
    //this.register('rice_supplier', subs.subscribe('rice_supplier', Session.get('currentBranch')));
    // Address
    this.register('rice_address', subs.subscribe('rice_address'));
    this.register(
      'rice_saleCategories',
      subs.subscribe('rice_saleCategories')
    );
    this.register(
      'rice_saleItemsCategories',
      subs.subscribe('rice_saleItemsCategories')
    );
    this.register('rice_exchange', subs.subscribe('cpanel_exchange'));
  },
  action: function(params, queryParams) {
    Layout.main('rice_supplier');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Supplier',
    parent: 'rice.home'
  }
});
