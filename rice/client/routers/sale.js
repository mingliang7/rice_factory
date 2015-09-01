var subs = new SubsManager();

riceRoutes.route('/sale/:customerId', {
    name: 'rice.sale',
    subscriptions: function (params, queryParams) {
        // Sale
        this.register(
            'rice_saleByCustomer',
            subs.subscribe('rice_saleByCustomer', params.customerId)
        );
        // Customer
        this.register(
            'rice_customerById',
            subs.subscribe('rice_customerById', params.customerId)
        );
        this.register(
            'rice_saleCategories',
            subs.subscribe('rice_saleCategories')
        );
        this.register(
            'rice_saleItemsCategories',
            subs.subscribe('rice_saleItemsCategories')
        );
    },
    action: function (params, queryParams) {
        Layout.main('rice_sale');
    },
    breadcrumb: {
        params: ['customerId'],
        //queryParams: ['show', 'color'],
        title: 'Sale',
        parent: 'rice.customer'
    }
});