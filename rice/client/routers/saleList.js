var subs = new SubsManager();
riceRoutes.route('/saleList', {
  name: 'rice.saleList',
  subscriptions: function(params, queryParams) {},
  action: function(query, queryParams) {
    Layout.main('rice_sellingList');
  }
});
