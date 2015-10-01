var subs = new SubsManager();
riceRoutes.route('/unit', {
  name: 'rice.unit',
  subscriptions: function() {},
  action: function(query, queryParams) {
    Layout.main('rice_unit');
  }
});
