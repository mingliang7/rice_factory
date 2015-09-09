var subs = new SubsManager();
riceRoutes.route('/saleList', {
  name: 'rice.saleList',
  subscriptions: function (params, queryParams) {
    this.register(
        'rice_saleCategories',
        subs.subscribe('rice_saleCategories')
    );
    this.register(
        'rice_saleItemsCategories',
        subs.subscribe('rice_saleItemsCategories')
    );
  },
  action: function(query, queryParams){
    Layout.main('rice_sellingList');
  }
});
