/**
 * Browser view
 */
riceRoutes.route('/customerReport', {
    name: 'rice.customerReport',
    action: function (params, queryParams) {
        Layout.main('rice_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Report',
        parent: 'rice.home'
    }
});

riceRoutes.route('/customerReportGen', {
    name: 'rice.customerReportGen',
    action: function (params, queryParams) {
        Layout.report('rice_customerReportGen');
    }
});

/**
 * Excel
 */
riceRoutes.route('/customerExcelReport', {
    name: 'rice.customerExcelReport',
    action: function (params, queryParams) {
        Layout.main('rice_customerExcelReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Excel Report',
        parent: 'rice.home'
    }
});
