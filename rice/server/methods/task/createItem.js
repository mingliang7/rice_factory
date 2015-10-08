Meteor.methods({
  generateSaleCategory: function() {
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
  generateUnit: function() {
    var unit = {
      name: 'តោន',
      shortName: 'T'
    };
    Rice.Collection.Unit.insert(unit);
  },
  generateSaleItem: function() {
    var unit = Rice.Collection.Unit.findOne();
    var items = [{
      name: 'នាងខុន',
      shortName: 'នខ',
      unit: unit._id,
      price: 600,
      cost: 550,
    }, {
      name: 'នាងមិញ',
      shortName: 'នម',
      unit: unit._id,
      price: 700,
      cost: 600,
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
