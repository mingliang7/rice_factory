cashRoutes.route('/chartAccount', {
  name: 'cash.chartAccount',
  subscriptions: function(params, queryParams) {
    this.register('cash_accountType', Meteor.subscribe(
      'cash_accountType'))
  },
  action: function(params, queryParams) {
    Layout.main('cash_chartAccount');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'chartAccount',
    parent: 'cash.home'
  }
});
