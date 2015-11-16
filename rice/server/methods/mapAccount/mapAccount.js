Meteor.methods({
  mapAccountSale: function (doc) {
    var data = {};
    data.voucherId = "1";
    data.staff = doc.staffId;
    data.currencyId = "USD";
    data.memo = doc.des === undefined ? '' : doc.des;
    data.total = doc.paidAmount;
    return findChartAccount(data, doc, 'sale');
  },
  mapAccountPurchase: function (doc) {
    var data = {};
    data.voucherId = "1";
    data.staff = doc.staffId;
    data.currencyId = "USD";
    data.memo = doc.des === undefined ? '' : doc.des;
    data.total = doc.paidAmount;
    return findChartAccount(data, doc, 'purchase');
  }
});


findChartAccount = function (data, doc, type) {
  var transaction = [];
  var chartAccount = Rice.Collection.MapAccount.findOne({
    type: type
  });
  transaction.push({
    account: chartAccount.chartAccountCompare,
    amount: doc.paidAmount
  });
  console.log(data, transaction);
  return Meteor.call('journalEntry', data, transaction, doc.branchId);
}
