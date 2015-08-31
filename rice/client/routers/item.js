var subs = new SubsManager();

riceRoutes.route('/items/:category_id', {
    name: 'rice.items',
    subscriptions: function (params, queryParams) {
        // Sale
        this.register(
            'rice_items',
            subs.subscribe('rice_items', params.categoryId)
        );
    },
    action: function (params, queryParams) {
        Layout.main('rice_items');
    },
    breadcrumb: {
        params: ['categoryId'],
        //queryParams: ['show', 'color'],
        title: 'Items',
        parent: 'rice.categoryies'
    }
});
