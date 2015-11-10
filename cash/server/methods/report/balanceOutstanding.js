Meteor.methods({
  acc_balanceOutstandingReport: function(params) {
    var data = {
      title: {},
      header: {},
      result: [{
        index: 'No Result'
      }],
      footer: {}
    };

    var date = s.words(params.date, ' To ');
    var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
    var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();

    /****** Title *****/
    data.title = Cpanel.Collection.Company.findOne();

    /****** Header *****/
    data.header = params;

    /****** Content *****/
    var self = params;
    var result = {};

    var curDate = self.date;
    if (self.branchId != "All") {
      var branchId = self.branchId;
    }
    var openingBalance = Cash.Collection.OpeningClosingBalance.findOne({
      date: {
        $lt: curDate
      }
    }, {
      sort: {
        date: -1
      }
    });

    data.openingBalanceKHR = openingBalance.value.KHR;
    data.openingBalanceDate = openingBalance.date;
    data.openingBalanceUSD = openingBalance.value.USD;
    data.openingBalanceTHB = openingBalance.value.THB;

    data.profitKHR = pro(curDate, "KHR", branchId);
    data.profitUSD = pro(curDate, "USD", branchId);
    data.profitTHB = pro(curDate, "THB", branchId);

    data.BalanceKHR = data.openingBalanceKHR + data.profitKHR;
    data.BalanceUSD = data.openingBalanceUSD + data.profitUSD;
    data.BalanceTHB = data.openingBalanceTHB + data.profitTHB;

    if (result.length > 0) {
      data.result = result;
    }
    return data;
  }
});


var pro = function(curdate, currencyId, brandId) {
  var selector = {};
  var openingBalance = Cash.Collection.OpeningClosingBalance.findOne({
    date: {
      $lt: curdate
    }
  }, {
    sort: {
      date: -1
    }
  });
  if (openingBalance != null) {
    /* var dateFrom = moment(openingBalance.date).add(1, "days").toDate();*/
    var dateTo = curdate;
    selector.journalDate = {
      $gt: openingBalance.date,
      $lte: dateTo
    };
    selector.currencyId = currencyId;
    if (brandId != null) {
      selector.branchId = brandId;
    }

    selector['transaction.accountDoc.accountTypeId'] = {
      $in: ["40", "50"]
    };
    var profit = 0;
    var grandTotalIncome = 0;
    var grandTotalExpense = 0;
    var result = Cash.Collection.Journal.find(selector);
    result.forEach(function(obj) {
      obj.transaction.forEach(function(ob) {
        if (ob.accountDoc.accountTypeId == "40") {
          grandTotalIncome += ob.amount;
        } else if (ob.accountDoc.accountTypeId == "50") {
          grandTotalExpense += ob.amount;
        }
      })
    });
    profit = (grandTotalIncome - grandTotalExpense);

    return profit;
  } else {
    return 0;
  }
}
