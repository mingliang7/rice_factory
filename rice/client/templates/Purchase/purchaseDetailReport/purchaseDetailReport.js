var state = new ReactiveObj();

Template.rice_purchaseDetailReport.onCreated(function() {
  createNewAlertify('listCustomer', 'zoom');
});
Template.rice_purchaseDetailReport.onRendered(function() {
  state.set('supplierId', {
    _id: 'All',
    name: 'All'
  });
  datePicker();
});

Template.purchaseDetailCustomerList.helpers({

});
Template.purchaseDetailCustomerList.events({
  "click tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    state.set('supplierId', rowData);
    $('.purchaseDetailCustomerList').modal('hide');
    // alertify.listCustomer().close();
  }
});

Template.rice_purchaseDetailReport.events({
  "click .select-supplier": function(event, template) {
    // alertify.listCustomer(fa('list-alt', 'Customer'), renderTemplate(
    //   Template.purchaseDetailCustomerList)).maximize();
  },
  'change [name="type"]': function(e) {
    var currentValue = $(e.currentTarget).val();
    state.set('type', currentValue);
    state.set('supplierId', {
      _id: 'All',
      name: 'All'
    });
  }
});

Template.rice_purchaseDetailReport.helpers({
  supplierId: function() {
    return state.get('supplierId');
  }

});
Template.rice_purchaseDetailReport.onDestroyed(function() {});

Template.rice_purchaseDetailReport.events({
  "click .reset": function(event, template) {
    state.set('supplierId', {
      _id: 'All',
      name: 'All'
    });
    clearSelect2($('[name="exchange"]'));
  },
  'click [name="supplier"]': function() {
    state.set('supplierId', {
      _id: 'All',
      name: 'All'
    });
  },
  'click .clear-supplier': function() {
    state.set('supplierId', {
      _id: 'All',
      name: 'All'
    });
  }
});
Template.rice_purchaseDetailReport.onDestroyed(function() {
  state.set([], {});
});
var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTimeRange(date);
};



Template.rice_purchaseDetailReportGen.helpers({
  options: function() {
    // font size = null (default), bg
    // paper = a4, a5, mini
    // orientation = portrait, landscape
    return {
      //fontSize: 'bg',
      paper: 'a4',
      orientation: 'portrait'
    };
  },
  checkDiscount: function(discount) {
    if (discount == 0) {
      return false
    } else {
      return true;
    }
  },
  getProfit: function(amount, lineCost) {
    return numeral(amount - lineCost).format('0,0.00');
  },
  getItemName: function(id) {
    return Rice.Collection.PurchaseItem.findOne(id).name;
  },
  data: function() {
      var params = FlowRouter.current().queryParams;
      Fetcher.setDefault('data', false);
      Fetcher.retrieve('data', 'rice_purchaseDetailReport', params);
      return Fetcher.get('data');
    }
    // },
    // purchaseItems: function() {
    //   var val = this;
    //   td = '';
    //   console.log(val);
    //   val.purchaseItems.forEach(function(item) {
    //     obj = itemName(item.purchaseItemId);
    //     td += '<td>' + obj + '</td>';
    //   });
    //   return td;
    // }
});

// var itemName = function(itemId) {
//   var categoryId = itemId.slice(0, 3);
//   console.log(categoryId);
//   categoryName = Rice.Collection.PurchaseCategory.findOne(categoryId).name;
//   purchaseItemName = Rice.Collection.PurchaseItem.findOne({
//     _id: itemId,
//     purchaseCategoryId: categoryId
//   }).name;
//   return categoryName + purchaseItemName;
// };
