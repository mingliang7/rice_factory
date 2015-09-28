var subs = new SubsManager();
riceRoutes.route('/unit', {
  name: 'rice.unit',
  subscriptions: function() {
    this.register(
      'rice_unit',
      subs.subscribe('rice_unit')
    );
  },
  action: function(query, queryParams) {
    Layout.main('rice_unit');
  }
});
