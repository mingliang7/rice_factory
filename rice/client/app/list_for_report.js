// List for report
Rice.ListForReport = {
  branch: function() {
    var list = [];
    list.push({
      label: "(Select All)",
      value: ""
    });
    Cpanel.Collection.Branch.find()
      .forEach(function(obj) {
        list.push({
          label: obj.enName,
          value: obj._id
        });
      });

    return list;
  },
  itemByCategory: function() {
    var categoryId = Rice.ListState.get('categoryId');
    var list = [];
    list.push({
      label: "All",
      value: ""
    });
    if (categoryId) {
      var items = Rice.Collection.SaleItem.find({
        saleCategoryId: categoryId
      });
      items.forEach(function(item) {
        list.push({
          label: item._id + ' | ' + item.name,
          value: item._id
        });
      });
    }
    return list;
  }
};
