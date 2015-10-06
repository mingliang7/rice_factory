var sub = new SubsManager();

riceRoutes.route('/purchasePayment/:supplierId/:purchaseId', {
  name: 'rice.purchasePayment',
  action: function(params, queryParams) {
    Layout.main('rice_purchasePaymentTable');
  },
  breadcrumb: {
    params: ['supplierId', 'purchaseId'],
    title: 'payment',
    parent: 'rice.purchase'
  }
});
