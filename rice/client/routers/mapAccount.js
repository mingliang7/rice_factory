riceRoutes.route('/mapAccount', {
  name: 'rice.mapAccount',
  action: function (params, queryParams) {
    Layout.main('rice_mapAccount');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Map Account',
    parent: 'rice.home'
  }
});
