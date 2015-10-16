riceRoutes.route('/help', {
  name: 'rice.help',
  action: function(params, queryParams) {
    Layout.main('rice_help');
  },
  breadcrumb: {
    // params: ['customerId', 'saleId'],
    title: 'help',
    parent: 'rice.help'
  }
});
