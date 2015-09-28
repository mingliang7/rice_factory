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
  getItemName: function(id) {
    if (id) {
      var categoryName = Rice.Collection.SaleCategory.findOne(id.slice(0,
          3))
        .name;
      var unit = ReactiveMethod.call('getUnit', id);
      var itemName = Rice.Collection.SaleItem.findOne(id).name;
      return id + ' | ' + categoryName + itemName + ' (' + unit.shortName +
        ')';
    }
    return 'No Result';
  },

  getProfit: function(totalAmount, totalCost) {
    if (totalAmount) {
      return numeral(totalAmount - totalCost).format('0,0.00');
    }
    return 0;

  },
  data: function() {
    var params = FlowRouter.current().queryParams;
    Fetcher.setDefault('data', false);
    Fetcher.retrieve('data', 'rice_saleByItemReport', params);
    return Fetcher.get('data');
  }

});
