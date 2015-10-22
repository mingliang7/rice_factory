riceRoutes.route('/help', {
  name: 'rice.help',
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
