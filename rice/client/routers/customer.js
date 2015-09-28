var subs = new SubsManager();

riceRoutes.route('/customer', {
  name: 'rice.customer',
  subscriptions: function(params, queryParams) {
    // Customer
    //this.register('rice_customer', subs.subscribe('rice_customer', Session.get('currentBranch')));
    // Address
    this.register('rice_unit', subs.subscribe('rice_unit'));
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
    Layout.main('rice_customer');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Customer',
    parent: 'rice.home'
  }
});
