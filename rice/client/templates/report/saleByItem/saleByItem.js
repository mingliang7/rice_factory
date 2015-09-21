var state = new ReactiveObj();

Template.rice_saleByItemReport.onCreated(function() {});
Template.rice_saleByItemReport.onRendered(function() {
  datePicker();
});

Template.collapseTabular.events({});

Template.rice_saleByItemReport.events({
  'change [name="category"]': function(e) {
    var value = $(e.currentTarget).val();
    Rice.ListState.set('categoryId', value);
  }
});

Template.rice_saleByItemReport.helpers({});
Template.rice_saleByItemReport.onDestroyed(function() {
  Rice.ListState.set([], {});
});

Template.rice_saleByItemReport.events({
  "click .reset": function(event, template) {
    clearSelect2();
  }
});

var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTimeRange(date);
};



Template.rice_saleByItemReportGen.helpers({
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
      Fetcher.retrieve('data', 'rice_saleByItemReport', params);
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
