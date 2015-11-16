cashRoutes.route('/closingBalance', {
  name: 'cash.closingBalance',
  action: function(params, queryParams) {
    Layout.main('cash_closingBalance');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'closingBalance',
    parent: 'cash.home'
  }
});
