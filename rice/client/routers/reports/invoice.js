/**
 * Browser view
 */
riceRoutes.route('/invoiceReport', {
  name: 'rice.invoiceReport',
  action: function(params, queryParams) {
    Layout.main('rice_customerReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Sale Report',
    parent: 'rice.home'
  }
});



riceRoutes.route('/invoiceReportGen/:invoiceId', {
  name: 'rice.invoiceReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_invoiceReportGen');
  }
});
riceRoutes.route('/sale/invoiceReportGen/:invoiceId', {
  name: 'rice.invoiceReportGen',
  action: function(params, queryParams) {
    Layout.report('rice_invoiceReportGen');
  }
});

/**
 * Excel
 */
riceRoutes.route('/customerExcelReport', {
  name: 'rice.customerExcelReport',
  action: function(params, queryParams) {
    Layout.main('rice_customerExcelReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Customer Excel Report',
    parent: 'rice.home'
  }
});
