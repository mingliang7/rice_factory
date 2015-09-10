riceRoutes.route('/staff', {
  name: 'rice.staff',
  action: function(query, queryParams) {
    Layout.main('rice_staff');
  }
});
