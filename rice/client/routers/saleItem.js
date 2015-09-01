var subs = new SubsManager();

riceRoutes.route('/saleItems/:saleCategoryId', {
    name: 'rice.saleItems',
    subscriptions: function (params, queryParams) {
        // Sale
        this.register(
            'rice_saleItems',
            subs.subscribe('rice_saleItems', params.saleCategoryId)
        );
    },
    action: function (params, queryParams) {
        Layout.main('rice_saleItems');
    },
    breadcrumb: {
        params: ['saleCategoryId'],
        //queryParams: ['show', 'color'],
        title: 'Sale Items',
        parent: 'rice.saleCategories'
    }
});
