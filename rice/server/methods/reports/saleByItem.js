Meteor.methods({
  rice_saleByItemReport: function(params) {
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
    selector.saleDate = {
      $gte: fDate,
      $lte: tDate
    };

    if (categoryId != '' && itemId == '') {
      selector['saleItems.saleCategoryId'] = categoryId;
    } else if (categoryId != '' && itemId != '') {
      selector['saleItems.saleCategoryId'] = categoryId;
      selector['saleItems.saleItemId'] = itemId;
    }
    var index = 1;
    var totalProfit = 0;
    var sales = Rice.Collection.Sale.aggregate([{
      $unwind: '$saleItems'
    }, {
      $match: selector
    }, {
      $group: {
        _id: '$saleItems.saleItemId',
        averagePrice: {
          $avg: '$saleItems.price'
        },
        cost: {
          $last: '$saleItems.cost'
        },
        totalQty: {
          $sum: '$saleItems.qty'
        },
        totalDiscount: {
          $avg: '$saleItems.discount'
        },
        totalCost: {
          $sum: '$saleItems.lineCost'
        },
        totalAmount: {
          $sum: '$saleItems.amount'
        }
      }
    }, {
      $sort: {
        _id: 1
      }
    }]);
    sales.forEach(function(sale) {
      content.push(sale);
    });
    if (content.length > 0) {
      data.content = content;
    }
    console.log(data);
    return data;
  }
});
