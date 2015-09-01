var subs = new SubsManager();

riceRoutes.route('/saleCategories', {
    name: 'rice.saleCategories',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('rice_customer', subs.subscribe('rice_customer', Session.get('currentBranch')));
        // Address
        this.register('rice_saleCategories', subs.subscribe('rice_saleCategories'));
    },
    action: function (params, queryParams) {
        Layout.main('rice_saleCategories');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Sale Categories',
        parent: 'rice.home'
    }
});
