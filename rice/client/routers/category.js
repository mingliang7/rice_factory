var subs = new SubsManager();

riceRoutes.route('/categories', {
    name: 'rice.categories',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('rice_customer', subs.subscribe('rice_customer', Session.get('currentBranch')));
        // Address
        this.register('rice_categories', subs.subscribe('rice_categories'));
    },
    action: function (params, queryParams) {
        Layout.main('rice_categories');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Categories',
        parent: 'rice.home'
    }
});
