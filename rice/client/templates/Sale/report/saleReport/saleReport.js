var state = new ReactiveObj();

Template.rice_saleReport.onCreated(function() {
  createNewAlertify('listCustomer', 'zoom');
});
Template.rice_saleReport.onRendered(function() {
  state.set('customerId', {
    _id: 'All',
    name: 'All'
  });
  datePicker();
});
Template.collapseTabular.helpers({
  selector: function() {
    var type = state.get('type');
    console.log(type);
    if (type == '') {
      return {};
    } else {
      return {
        type: type
      };
    }
  }
});
Template.collapseTabular.events({
  "click tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    state.set('customerId', rowData);
    $('.collapseTabular').modal('hide');
    // alertify.listCustomer().close();
  }
});

Template.rice_saleReport.events({
  "click .select-customer": function(event, template) {
    // alertify.listCustomer(fa('list-alt', 'Customer'), renderTemplate(
    //   Template.collapseTabular)).maximize();
  },
  "change [name='type']": function(event) {
    var currentValue = $(event.currentTarget).val();
    state.set('customerId', {
      _id: 'All',
      name: 'All'
    });
    state.set('type', currentValue);
  }
});

Template.rice_saleReport.helpers({
  customerId: function() {
    return state.get('customerId');
  }

});
Template.rice_saleReport.onDestroyed(function() {});

Template.rice_saleReport.events({
  "click .reset": function(event, template) {
    state.set('customerId', {
      _id: 'All',
      name: 'All'
    });
    clearSelect2($('[name="exchange"]'));
  },
  'click [name="customer"]': function() {
    state.set('customerId', {
      _id: 'All',
      name: 'All'
    });
  },
  'click .clear-customer': function() {
    state.set('customerId', {
      _id: 'All',
      name: 'All'
    });
  }
});
Template.rice_saleReport.onDestroyed(function() {
  state.set([], {});
});
var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTimeRange(date);
};



Template.rice_saleReportGen.helpers({
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
  data: function() {
      var params = FlowRouter.current().queryParams;
      Fetcher.setDefault('data', false);
      Fetcher.retrieve('data', 'rice_saleReport', params);
      return Fetcher.get('data');
    }
    // },
    // saleItems: function() {
    //   var val = this;
    //   td = '';
    //   console.log(val);
    //   val.saleItems.forEach(function(item) {
    //     obj = itemName(item.saleItemId);
    //     td += '<td>' + obj + '</td>';
    //   });
    //   return td;
    // }
});

// var itemName = function(itemId) {
//   var categoryId = itemId.slice(0, 3);
//   console.log(categoryId);
//   categoryName = Rice.Collection.SaleCategory.findOne(categoryId).name;
//   saleItemName = Rice.Collection.SaleItem.findOne({
//     _id: itemId,
//     saleCategoryId: categoryId
//   }).name;
//   return categoryName + saleItemName;
// };
