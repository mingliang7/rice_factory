Meteor.methods({
  rice_purchaseDetailReport: function(params) {
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
    var supplierId = params.supplier;
    /****** Title *****/
    data.title = Cpanel.Collection.Company.findOne();

    /****** Header *****/
    data.header = {
      supplier: ReportInfo.supplierName(params.supplier),
      branch: ReportInfo.branchName(params.branch),
      date: params.date,
      exchange: ReportInfo.readbleExchange(params.exchange)
    };

    /****** Content *****/
    var content = [];
    var selector = {};
    selector.purchaseDate = {
      $gte: fDate,
      $lte: tDate
    };

    if (supplierId != 'All') {
      selector.supplierId = supplierId;

    }


    var index = 1;
    var totalProfit = 0;
    var lineCost = 0;
    var purchases = Rice.Collection.Purchase.find(selector, {
      sort: {
        _id: 1
      }
    }).fetch();
    purchases.forEach(function(purchase) {
      index = 1;
      subTotal += purchase.subTotal;
      total += purchase.total;
      totalProfit += purchase.profit;
      if (!_.isUndefined(purchase.subDiscount)) {
        discount += purchase.subDiscount;
      }
      purchase.purchaseItems.forEach(function(item) {
        item.index = index;
        index += 1;

      });
      content.push(purchase);

    });
    if (content.length > 0) {
      data.content = content;
      data.footer = {
        subTotal: subTotal,
        discount: discount,
        total: total,
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
