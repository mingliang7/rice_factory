// List
Rice.ListState = new ReactiveObj();
Rice.List = {
  gender: function () {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    list.push({
      label: 'Male',
      value: 'M'
    });
    list.push({
      label: 'Female',
      value: 'F'
    });
    return list;
  },
  unit: function () {
    var list = [];
    list.push({
      label: '(Select One)',
      value: ''
    });
    var units = Rice.Collection.Unit.find().fetch();
    if (!_.isUndefined(units)) {
      units.forEach(function (unit) {
        list.push({
          label: unit.name + ' | (' + unit.shortName + ')',
          value: unit._id
        });
      });
    }
    return list;
  },
  saleCategories: function () {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });
    var categories = Rice.Collection.SaleCategory.find().fetch();
    categories.forEach(function (category) {
      list.push({
        label: category._id + ' | ' + category.name,
        value: category._id
      });
    });
    return list;
  },
  purchaseCategories: function () {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });
    var categories = Rice.Collection.PurchaseCategory.find().fetch();
    categories.forEach(function (category) {
      list.push({
        label: category._id + ' | ' + category.name,
        value: category._id
      });
    });
    return list;
  },
  customer: function () {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    Rice.Collection.Customer.find({
      status: 'enabled'
    }).forEach(function (obj) {
      list.push({
        label: obj._id + ' : ' + obj.name,
        value: obj._id
      });
    });
    return list;
  },
  status: function () {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    list.push({
      label: 'Enabled',
      value: 'enabled'
    });
    list.push({
      label: 'Disabled',
      value: 'disabled'
    });
    return list;
  },
  position: function (selectOne) {
    var list;
    list = [];
    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: "(Select One)",
        value: ""
      });
    }
    list.push({
      label: 'Seller',
      value: 'seller'
    });
    list.push({
      label: 'Cashier',
      value: 'cashier'
    });
    list.push({
      label: 'Accountant',
      value: 'accountant'
    });
    list.push({
      label: 'Admin',
      value: 'admin'
    });
    list.push({
      label: 'Manager',
      value: 'manager'
    });
    return list;
  },
  exchange: function (selectOne) {
    var list;
    list = [];
    var exchanges = Cpanel.Collection.Exchange.find().fetch();
    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: "(Select One)",
        value: ""
      });
    }
    exchanges.forEach(function (ex) {
      list.push({
        label: JSON.stringify(ex.rates),
        value: ex._id
      });
    });
    return list;
  },
  staff: function (selecOne) {
    var list, staff, userId;
    list = [];
    userId = Meteor.userId();
    staff = Rice.Collection.UserStaffs.findOne({
      userId: userId
    });
    list.push({
      label: "(Select One)",
      value: ""
    });
    if (staff !== void 0) {
      findStaff(list, staff.staffIds);
    }
    return list;
  },
  getStaffListByBranchId: function (selectOne) {
    var branchId, list, staffs;
    list = [];
    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: '(Select One)',
        value: ''
      });
    }
    branchId = Session.get('currentBranch');
    staffs = Rice.Collection.Staffs.find({
      branchId: branchId
    });
    staffs.forEach(function (staff) {
      list.push({
        label: staff._id + ' : ' + staff.name,
        value: staff._id
      });
    });
    return list;
  },
  userIds: function () {
    var list = [{
      label: "(Select One)",
      value: ""
    }];
    var branchId = Session.get('currentBranch');
    var userIds = Rice.Collection.UserStaffs.find().map(function (user) {
      return user.userId;
    });
    var user = Meteor.users.find({
      _id: {
        $not: {
          $in: userIds
        }
      },
      username: {
        $ne: 'super'
      }
    }).fetch();
    console.log(user.length);
    if (user !== undefined) {
      user.forEach(function (u) {
        if (u.rolesBranch) {
          u.rolesBranch.forEach(function (r) {
            if (r == branchId) {
              console.log(r + " " + branchId);
              list.push({
                label: u.username,
                value: u._id
              });
              //  return false;
            }
          });
        }
      });
    }
    console.log(list);
    return list;
  },
  type: function () {
    var list = [];
    list.push({
      label: '(Select One)',
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
  chartAccountId() {
    var list = []
    var tmpId = {};
    var tmpArr = {};
    var tmpPurchaseId = {};
    var tmpPurchaseArr = {};
    var sales = Rice.Collection.SaleItem.find({}, {
      sort: {
        saleCategoryId: 1
      }
    }).fetch();
    sales.forEach(function (item) {
      if (_.isUndefined(tmpArr[item.saleCategoryId])) {
        tmpArr[item.saleCategoryId] = [];
      }
      tmpId[item.saleCategoryId] = {
        text: getCategoryName(item.saleCategoryId),
        children: getItem(tmpArr[item.saleCategoryId], item)
      }
    });

    var purchases = Rice.Collection.PurchaseItem.find({}, {
      sort: {
        purchaseCategoryId: 1
      }
    }).fetch();
    purchases.forEach(function (item) {
      if (_.isUndefined(tmpPurchaseArr[item.purchaseCategoryId])) {
        tmpPurchaseArr[item.purchaseCategoryId] = [];
      }
      tmpPurchaseId[item.purchaseCategoryId] = {
        text: getPurchaseCategoryName(item.purchaseCategoryId),
        children: getItem(tmpPurchaseArr[item.purchaseCategoryId], item)
      }
    });

    for (var k in tmpId) {
      list.push(tmpId[k])
    }
    for (var j in tmpPurchaseId) {
      list.push(tmpPurchaseId[j])
    }
    return list;
  },
  productType: function () {
    var list = [{
      label: '(Select One)',
      value: ''
    }, {
      label: 'Sale',
      value: 'sale'
    }, {
      label: 'Purchase',
      value: 'purchase'
    }]
    return list;
  }
};

var findStaff, staffName;

staffName = function (id) {
  var name;
  name = Rice.Collection.Staffs.findOne(id).name;
  return name;
};

findStaff = function (list, staffIds) {
  var i;
  i = 0;
  while (i < staffIds.length) {
    list.push({
      label: staffName(staffIds[i]),
      value: staffIds[i]
    });
    i++;
  }
  return list;
};

var getCategoryName = function (id) {
  let sale = Rice.Collection.SaleCategory.findOne(id);
  return `${sale.name}(Sale)`
};

var getItem = function (arr, item) {
  var unit = Rice.Collection.Unit.findOne(item.unit).shortName;
  arr.push({
    id: item._id,
    text: item._id + ' | ' + item.name + ' (' + unit + ')'
  });
  return arr;
};


var getPurchaseCategoryName = function (id) {
  let purchase = Rice.Collection.PurchaseCategory.findOne(id);
  return `${purchase.name}(Purchase)`
};

var getItem = function (arr, item) {
  var unit = Rice.Collection.Unit.findOne(item.unit).shortName;
  arr.push({
    id: item._id,
    text: item._id + ' | ' + item.name + ' (' + unit + ')'
  });
  return arr;
};
