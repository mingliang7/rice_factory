var subs = new SubsManager();

riceRoutes.route('/sale/:customerId', {
  name: 'rice.sale',
  subscriptions: function(params, queryParams) {

    this.register(
      'rice_saleCategories',
      subs.subscribe('rice_saleCategories')
    );
    this.register(
      'rice_saleItemsCategories',
      subs.subscribe('rice_saleItemsCategories')
    );
    this.register('rice_exchange', subs.subscribe('cpanel_exchange'));
    this.register('rice_quickPayment', subs.subscribe('rice_quickPayment'));

  },
  action: function(params, queryParams) {
    Layout.main('rice_sale');
  },
  breadcrumb: {
    params: ['customerId'],
    //queryParams: ['show', 'color'],
    title: 'Sale',
    parent: 'rice.customer'
  }
});
