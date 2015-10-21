riceRoutes.route('/help', {
  name: 'acc.help',
  action: function(params, queryParams) {
    /*Layout.main('acc_help');*/
    BlazeLayout.render('helpLayout', {
      content: 'rice_help'
    })
  },
  breadcrumb: {
    title: 'Home'
  }
});
