var subs = new SubsManager();

riceRoutes.route('/sale/:customerId', {
  name: 'rice.sale',
  subscriptions: function(params, queryParams) {},
  action: function(params, queryParams) {
    Layout.main('rice_sale');
  },
  breadcrumb: {
    params: ['customerId'],
    //queryParams: ['show', 'color'],
    title: 'sale',
    parent: 'rice.customer'
  }
});
