var reportTpl = Template.cash_balanceOutStandingReport,
  generateTpl = Template.cash_balanceOutStandingReportGen;

reportTpl.onRendered(function() {
  var name = $('[name="date"]');
  DateTimePicker.date(name);
});

reportTpl.onCreated(function() {
  SEO.set({
    title: 'balanceOutstandingReport',
    description: 'balanceOutstandingReport'
  });
});
generateTpl.onCreated(function() {
  SEO.set({
    title: 'balanceOutstandingReport',
    description: 'balanceOutstandingReport'
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
    Fetcher.retrieve('data','acc_balanceOutstandingReport',q);

    return Fetcher.get('data');

   /* var callId = JSON.stringify(q);

    var call = Meteor.callAsync(callId, 'acc_balanceOutstandingReport', q);

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
  }
});
