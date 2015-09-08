var sub = new SubsManager();

riceRoutes.route('/payment/:customerId/:saleId', {
  name: 'rice.payment',
  action: function (params, queryParams) {
    Layout.main('rice_payment');
  },
  breadcrumb: {
    params: ['customerId','saleId'],
    title: 'Payment',
    parent: 'rice.sale'
  }
});
