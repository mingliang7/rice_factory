Meteor.methods({
  acc_profitLostReport: function(params) {
    var data = {
      title: {},
      header: {},
      content: [{
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
    var selector = {};
    var exchangeDate = self.exchangeDate;

    var date = self.date.split(" To ");

    /* if (!_.isEmpty(self.date)) {
        selector.journalDate = {$gte: new Date(date[0]), $lte: new Date(date[1])};
    }*/
    if (!_.isEmpty(self.date)) {
      selector.journalDate = {
        $gte: moment(date[0]).format('YYYY-MM-DD'),
        $lte: moment(date[1]).format('YYYY-MM-DD')
      };
    }

    if (self.currencyId != "All") {
      selector.currencyId = self.currencyId;
    }
    if (self.branchId != "All") {
      selector.branchId = self.branchId;
    }

    selector['transaction.accountDoc.accountTypeId'] = {
      $in: ["40", "50"]
    };


    if (self.currencyId != "All") {
      var baseCurrency = self.currencyId;
    } else {
      baseCurrency = Cpanel.Collection.Setting.findOne().baseCurrency;
    }


    var content = {};
    var result = [];
    var resultIncome = [];
    var resultExpense = [];

    var grandTotalIncome = 0;
    var grandTotalExpense = 0;

    var contentProfit = Meteor.call("getProfitLost", selector,
      baseCurrency, exchangeDate);


    contentProfit.reduce(function(key, val) {
      if (!key[val.account]) {
        key[val.account] = {
          result: val.result,
          name: val.name,
          account: val.account,
          currency: baseCurrency,
          code: val.code,
          accountType: val.accountType
        };
        result.push(key[val.account]);
      } else {
        key[val.account].result += val.result;
      }
      return key;
    }, {});


    result.map(function(o) {
      if (o.accountType == "40") {
        grandTotalIncome += o.result;
        resultIncome.push({
          name: o.name,
          amount: o.result,
          currency: baseCurrency,
          code: o.code
        });
      } else if (o.accountType == "50") {
        grandTotalExpense += o.result;
        resultExpense.push({
          name: o.name,
          amount: o.result,
          currency: baseCurrency,
          code: o.code
        });
      }

    });

    data.resultIncome = resultIncome;
    data.grandTotalIncome = grandTotalIncome;
    data.resultExpense = resultExpense;
    data.grandTotalExpense = grandTotalExpense;
    data.profit = grandTotalIncome - grandTotalExpense;

    data.currencySelect = baseCurrency;

    if (content.length > 0) {
      data.content = content;
    }
    return data;
  }
});
