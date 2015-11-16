Meteor.methods({
  acc_incomeReport: function(params) {
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
    var selector = {};
    var exchangeDate = self.exchangeDate;

    var date = self.date.split(" To ");

    /*if (!_.isEmpty(self.date)) {
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
    if (self.chartAccount != "All") {
      selector['transaction.account'] = self.chartAccount

    }

    selector['transaction.accountDoc.accountTypeId'] = "40";
    if (self.currencyId != "All") {
      var baseCurrency = self.currencyId;
    } else {
      baseCurrency = Cpanel.Collection.Setting.findOne().baseCurrency;
    }

    var result = [];
    var grandTotal = 0;
    var content = Meteor.call("getIncome", selector, baseCurrency,
      exchangeDate);
    content.reduce(function(key, val) {
      if (!key[val.account]) {
        key[val.account] = {
          result: val.result,
          name: val.name,
          account: val.account,
          currency: baseCurrency,
          code: val.code
        };
        result.push(key[val.account]);
      } else {
        key[val.account].result += val.result;
      }
      return key;
    }, {});

    result.map(function(o) {
      grandTotal += o.result;

    });
    data.grandTotal = grandTotal;
    data.currencySelect = baseCurrency;

    if (result.length > 0) {
      data.result = result
    }
    return data;

  },
});
