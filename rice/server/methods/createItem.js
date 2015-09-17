Meteor.methods({
  generateCategory: function() {
    var arr = [{
      name: 'អង្ករ',
      shortName: 'អក'
    }, {
      name: 'ស្រូវ',
      shortName: 'ស'
    }];
    for (var i = 0; i < arr.length; i++) {
      arr[i]._id = idGenerator.gen(Rice.Collection.SaleCategory, 3);
      Rice.Collection.SaleCategory.insert(arr[i]);
    }
  },
  generateSaleItem: function() {
    var items = [{
      name: 'នាងខុន',
      shortName: 'នខ',
      price: 50000,
      cost: 45000,
    }, {
      name: 'នាងមិញ',
      shortName: 'នម',
      price: 40000,
      cost: 30000,
    }];
    var categories = Rice.Collection.SaleCategory.find({}).fetch();
    categories.forEach(function(category) {
      categoryId = category._id;
      items.forEach(function(item) {
        item.saleCategoryId = categoryId;
        item._id = idGenerator.genWithPrefix(Rice.Collection.SaleItem,
          categoryId, 3);
        Rice.Collection.SaleItem.insert(item);
      });
    });

  }
});
