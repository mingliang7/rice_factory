cashRoutes.route('/home', {
  name: 'cash.home',
  action: function(params, queryParams) {
    Layout.main('cash_home');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'home'
  }
});
