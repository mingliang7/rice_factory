Meteor.methods({
  rice_purchaseByItemReport: function(params) {
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
    var categoryId = params.category;
    var itemId = params.item;
    /****** Title *****/
    data.title = Cpanel.Collection.Company.findOne();

    /****** Header *****/
    data.header = {
      category: ReportInfo.category(params.category),
      item: ReportInfo.item(params.item),
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

    if (categoryId != '' && itemId == '') {
      selector['purchaseItems.purchaseCategoryId'] = categoryId;
    } else if (categoryId != '' && itemId != '') {
      selector['purchaseItems.purchaseCategoryId'] = categoryId;
      selector['purchaseItems.purchaseItemId'] = itemId;
    }
    var index = 1;
    var totalProfit = 0;
    var purchases = Rice.Collection.Purchase.aggregate([{
      $unwind: '$purchaseItems'
    }, {
      $match: selector
    }, {
      $group: {
        _id: '$purchaseItems.purchaseItemId',
        averagePrice: {
          $avg: '$purchaseItems.price'
        },
        cost: {
          $last: '$purchaseItems.cost'
        },
        totalQty: {
          $sum: '$purchaseItems.qty'
        },
        totalDiscount: {
          $avg: '$purchaseItems.discount'
        },
        totalCost: {
          $sum: '$purchaseItems.lineCost'
        },
        totalAmount: {
          $sum: '$purchaseItems.amount'
        }
      }
    }, {
      $sort: {
        _id: 1
      }
    }]);
    var totalCost = 0;
    purchases.forEach(function(purchase) {
      total += purchase.totalAmount;
      totalCost += purchase.totalCost;
      content.push(purchase);
    });
    console.log(totalCost);
    if (content.length > 0) {
      data.content = content;
      data.footer = {
        total: total,
        totalInKhmer: fx.convert(total, {
          from: 'USD',
          to: 'KHR'
        }),
        totalInBath: fx.convert(total, {
          from: 'USD',
          to: 'THB'
        }),
      };
    }
    return data;
  }
});
