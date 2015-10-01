var subs = new SubsManager();

riceRoutes.route('/supplier', {
  name: 'rice.supplier',
  subscriptions: function(params, queryParams) {
    // Customer
    //this.register('rice_supplier', subs.subscribe('rice_supplier', Session.get('currentBranch')));
    // Address
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
