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
    var aggregateSelector = [{
      $unwind: '$saleItems'
    }, {
      $match: {
        saleDate: {
          $gte: fDate,
          $lte: tDate
        }
      }
    }, {
      $group: {
        _id: {
          saleItems: '$saleItems.saleItemId'
        },
        totalLineCost: {
          $sum: '$saleItems.lineCost'
        },
        totalQty: {
          $sum: '$saleItems.qty'
        },
        totalAmount: {
          $sum: '$saleItems.amount'
        }
      }
    }];

    var index = 1;
    var saleAggregate = Rice.Collection.Sale.aggregate(aggregateSelector);
    var sales = Rice.Collection.Sale.find(selector).fetch();
    sales.forEach(function(sale) {
      sale.index = index;
      sale.itemIds = extractAggregate(saleAggregate);
      subTotal += sale.subTotal;
      total += sale.total;
      if (!_.isUndefined(sale.subDiscount)) {
        discount += sale.subDiscount;
      }
      content.push(sale);
      index += 1;
    });
    footer = saleAggregate;
    if (content.length > 0) {
      data.content = content;
      data.footer = {
        subTotal: subTotal,
        discount: discount,
        total: total,
        totalInDollar: fx.convert(total, {
          from: 'KHR',
          to: 'USD'
        }),
        totalInBath: fx.convert(total, {
          from: 'KHR',
          to: 'THB'
        })
      };
    }

    return data;
  }
});

var extractAggregate = function(arrVal) {
  arr = [];
  arrVal.forEach(function(item) {
    arr.push(item._id.saleItems);
  });
  return arr;
};
