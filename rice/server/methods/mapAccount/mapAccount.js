Meteor.methods({
  mapAccount: function (doc, type) {
    var data = {};
    data.voucherId = "1";
    data.staff = doc.staffId;
    data.currencyId = "USD";
    data.memo = doc.des === undefined ? '' : doc.des;
    data.total = doc.paidAmount;
    return findChartAccount(data, doc, type);

  },
  mapAccountUpdate: function (doc, type) {
    var data = {};
    data.voucherId = "1";
    data.staff = doc.staffId;
    data.currencyId = "USD";
    data.memo = doc.des === undefined ? '' : doc.des;
    data.total = doc.paidAmount;
    return updateChartAccount(data, doc, type);
  },
  mapAccountRemove: function (accountId) {
    Meteor.call('journalRemove', accountId);
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

updateChartAccount = function (data, doc, type) {
  var transaction = [];
  var chartAccount = Rice.Collection.MapAccount.findOne({
    type: type
  });
  transaction.push({
    account: chartAccount.chartAccountCompare,
    amount: doc.paidAmount
  });
  Meteor.call('journalUpdate', data, transaction, doc.branchId, doc.accountId);
}
