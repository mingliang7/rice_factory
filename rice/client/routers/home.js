riceRoutes.route('/home', {
    name: 'rice.home',
    action: function (params, queryParams) {
        Layout.main('rice_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Home'
        //parent: 'Home'
    }
});
