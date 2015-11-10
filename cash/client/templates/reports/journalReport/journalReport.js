var reportTpl = Template.cash_journalReport,
  generateTpl = Template.cash_journalReportGen;

reportTpl.onRendered(function() {
  var name = $('[name="date"]');
  DateTimePicker.dateRange(name);
});

reportTpl.onCreated(function() {
  SEO.set({
    title: 'journalReport',
    description: 'journalReport'
  });
});
generateTpl.onCreated(function() {
  SEO.set({
    title: 'journalReport',
    description: 'journalReport'
  });
});
generateTpl.helpers({
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
    // Get query params
    //FlowRouter.watchPathChange();

    var q = FlowRouter.current().queryParams;

    Fetcher.setDefault('data',false);
    Fetcher.retrieve('data','acc_journalReport',q);

    return Fetcher.get('data');

   /* var callId = JSON.stringify(q);

    var call = Meteor.callAsync(callId, 'acc_journalReport', q);

    if (!call.ready()) {
      return false;
    }
    return call.result();*/
  },
  formatMoney: function(val) {
    return numeral(val).format('0,0.00');
  },
  getChartAccount: function(id) {
    return Cash.Collection.ChartAccount.findOne({
      _id: id
    }).name;
  },
  substrVoucher: function(val) {
    return val.substr(8, val.length);
  },
  getCurrency: function(id) {
    return Cpanel.Collection.Currency.findOne({
      _id: id
    }).symbol;
  },
  formatDate: function(val) {
    return moment(val).format("DD/MM/YYYY");
  },
  compare: function(a, b) {
    if (a.journalDate < b.journalDate) {
      return -1;
    } else if (a.journalDate > b.journalDate) {
      return 1;
    } else {
      return 0;
    }
    if (content.length > 0) {
      data.content = content;
    }

    return data;
  }
});
