Meteor.methods({
  rice_saleReport: function(params) {
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
    var discount = 0;
    var subTotal = 0;
    var total = 0;
    var exchange = Cpanel.Collection.Exchange.findOne(params.exchange);
    fx.base = exchange.base;
    fx.rates = exchange.rates;
    var customerId = params.customer;
    /****** Title *****/
    data.title = Cpanel.Collection.Company.findOne();

    /****** Header *****/
    data.header = {
      customer: ReportInfo.customerName(params.customer),
      branch: ReportInfo.branchName(params.branch),
      date: params.date,
      exchange: ReportInfo.readbleExchange(params.exchange)
    };

    /****** Content *****/
    var content = [];
    var selector;
    if (customerId == 'All' || customerId == '') {
      selector = {
        saleDate: {
          $gte: fDate,
          $lte: tDate
        }
      };
    } else {
      selector = {
        customerId: customerId,
        saleDate: {
          $gte: fDate,
          $lte: tDate
        }
      };
    }

    var index = 1;
    var totalProfit = 0;
    var sales = Rice.Collection.Sale.find(selector).fetch();
    sales.forEach(function(sale) {
      sale.index = index;
      subTotal += sale.subTotal;
      total += sale.total;
      totalProfit += sale.profit;
      if (!_.isUndefined(sale.subDiscount)) {
        discount += sale.subDiscount;
      }
      content.push(sale);
      index += 1;
    });
    if (content.length > 0) {
      data.content = content;
      data.footer = {
        subTotal: subTotal,
        discount: discount,
        total: total,
        profit: totalProfit,
        profitInKhmer: fx.convert(totalProfit, {
          from: 'USD',
          to: 'KHR'
        }),
        profitInBath: fx.convert(totalProfit, {
          from: 'USD',
          to: 'THB'
        }),
        totalInKhmer: fx.convert(total, {
          from: 'USD',
          to: 'KHR'
        }),
        totalInBath: fx.convert(total, {
          from: 'USD',
          to: 'THB'
        })
      };
    }

    return data;
  }
});
