// List for report
Rice.ListForReport = {
  branch: function() {
    var list = [];
    list.push({
      label: "(Select One)",
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
  },
  type: function() {
    var list = [];
    list.push({
      label: 'All',
      value: ''
    });
    list.push({
      label: 'Local',
      value: 'local'
    });
    list.push({
      label: 'Global',
      value: 'global'
    });
    return list;
  },
  staff: function() {
    var list, staff, userId;
    list = [];
    userId = Meteor.userId();
    staffs = Rice.Collection.Staffs.find().fetch();
    list.push({
      label: "All",
      value: ""
    });
    staffs.forEach(function(staff) {
      list.push({
        label: staff._id + ' | ' + staff.name,
        value: staff._id
      });
    });
    return list;
  }
};
