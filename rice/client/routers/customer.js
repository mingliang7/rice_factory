var subs = new SubsManager();

riceRoutes.route('/customer', {
    name: 'rice.customer',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('rice_customer', subs.subscribe('rice_customer', Session.get('currentBranch')));
        // Address
        this.register('rice_address', subs.subscribe('rice_address'));
    },
    action: function (params, queryParams) {
        Layout.main('rice_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer',
        parent: 'rice.home'
    }
});
