var subs = new SubsManager();
riceRoutes.route('/saleReport', {
  name: 'rice.saleReport',
  action: function(params, queryParams) {
    Layout.main('rice_saleReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Sale Report',
    parent: 'rice.home'
  }
});


riceRoutes.route('/saleReportGen', {
  name: 'rice.saleReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_saleReportGen');
  },
  breadcrumb: {
    title: 'Sale Report',
    parent: 'rice.home'
  }
});
