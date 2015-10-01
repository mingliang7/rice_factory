var subs = new SubsManager();
riceRoutes.route('/paymentReport', {
  name: 'rice.paymentReport',
  action: function(params, queryParams) {
    Layout.main('rice_paymentReport');
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


riceRoutes.route('/paymentReportGen', {
  name: 'rice.paymentReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_paymentReportGen');
  },
  breadcrumb: {
    title: 'Sale Report',
    parent: 'rice.home'
  }
});
