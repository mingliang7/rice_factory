riceRoutes.route('/purchaseList', {
  name: 'rice.purchaseList',
  subscriptions: function(params, queryParams) {},
  action: function(query, queryParams) {
    Layout.main('rice_purchasedList');
  }
});
