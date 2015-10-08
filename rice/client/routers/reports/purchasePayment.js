var subs = new SubsManager();
riceRoutes.route('/purchasePaymentReport', {
  name: 'rice.purchasePaymentReport',
  action: function(params, queryParams) {
    Layout.main('rice_purchasePaymentReport');
  },
  subscriptions: function() {

  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Payment Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/purchasePaymentReportGen', {
  name: 'rice.purchasePaymentReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_purchasePaymentReportGen');
  },
  breadcrumb: {
    title: 'Payment Report',
    parent: 'rice.home'
  }
});
