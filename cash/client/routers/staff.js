cashRoutes.route('/staff', {
  name: 'cash.staff',
  subscriptions:function(params,queryParams){
    this.register('cash_address', Meteor.subscribe(
        'cash_address'))
  },
  action: function(params, queryParams) {
    Layout.main('cash_staff');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'staff',
    parent: 'cash.home'
  }
});
