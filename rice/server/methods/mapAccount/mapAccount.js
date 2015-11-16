Meteor.methods({
  mapAccountSale: function (doc) {
    var data = {};
    data.voucherId = "1";
    data.staff = doc.staffId;
    data.currencyId = "USD";
    data.memo = doc.des === undefined ? '' : doc.des;
    data.total = doc.total;
    findChartAccount(data, doc, 'sale');
  },
  mapAccountPurchase: function (doc) {
    console.log(doc);
    var data = {};
    var transaction = [];

    data.voucherId = "1";
    data.staff = doc.staffId;
    data.currencyId = "USD";
    data.memo = doc.des === undefined ? '' : doc.des;
    data.total = doc.total;
    findChartAccount(data, doc, 'purchase');
  }
});


findChartAccount = function (data, doc, type) {
  var transaction = [];
  doc[type + 'Items'].forEach(function (item) {
    var chartAccount = Rice.Collection.MapAccount.findOne({
      chartAccount: item[type + 'ItemId'],
      type: type
    });
    if (!_.isUndefined(chartAccount)) {
      transaction.push({
        account: chartAccount.chartAccountCompare,
        amount: item.amount
      });
    }
  });
  Meteor.call('journalEntry', data, transaction, doc.branchId);
}
