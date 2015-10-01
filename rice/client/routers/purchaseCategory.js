var subs = new SubsManager();

riceRoutes.route('/purchaseCategories', {
  name: 'rice.purchaseCategories',
  subscriptions: function(params, queryParams) {
    // Customer
    //this.register('rice_customer', subs.subscribe('rice_customer', Session.get('currentBranch')));
    // Address
  },
  action: function(params, queryParams) {
    Layout.main('rice_purchaseCategories');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Purchase Categories',
    parent: 'rice.home'
  }
});
