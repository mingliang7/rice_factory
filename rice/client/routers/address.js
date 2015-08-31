var subs = new SubsManager();

riceRoutes.route('/address', {
    name: 'rice.address',
    subscriptions: function (params, queryParams) {
        this.register(
            'rice_address',
            subs.subscribe('rice_address')
        );
    },
    action: function (params, queryParams) {
        Layout.main('rice_address');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Address',
        parent: 'rice.home'
    }
});
