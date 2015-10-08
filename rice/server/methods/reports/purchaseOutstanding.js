Meteor.methods({
  rice_purchaseOutstandingReport: function(params) {
    var data = {
      title: {},
      header: {},
      content: [{
        index: 'No Result'
      }],
      footer: {}
    };

    var tomorrow = moment(params.date, 'YYYY-MM-DD').add(1, 'days').toDate();
    var today = moment(params.date).toDate();
    var discount = 0;
    var dueAmount = 0;
    var outstandingAmount = 0;
    var paidAmount = 0;
    var exchange = Cpanel.Collection.Exchange.findOne(params.exchange);
    fx.base = exchange.base;
    fx.rates = exchange.rates;
    var supplierId = params.supplier;
    var staff = params.staff;
    /****** Title *****/
    data.title = Cpanel.Collection.Company.findOne();

    /****** Header *****/
    data.header = {
      staff: staff == '' ? 'All' : staff,
      supplier: ReportInfo.supplierName(params.supplier),
      branch: ReportInfo.branchName(params.branch),
      date: params.date,
      exchange: ReportInfo.readbleExchange(params.exchange)
    };

    /****** Content *****/
    var content = [];
    var selector = {};
    selector.purchaseDate = {
      $lt: tomorrow
    };
    selector.$or = [{
      statusDate: {
        $gt: today
      }
    }, {
      status: 'active'
    }];
    console.log(selector);
    if (staff != '') {
      selector.staffId = staff;
    }
    if (supplierId != 'All') {
      selector.supplierId = supplierId;
    }
    var index = 1;
    var purchases = Rice.Collection.Purchase.find(selector, {
      sort: {
        _id: 1
      }
    }).fetch();
    var tmpPayment = [];
    purchases.forEach(function(purchase) {
      purchase.index = index;
      if (!_.isUndefined(purchase._payment)) {
        purchase._payment.forEach(function(payment) {
          if (payment.paymentDate <= today) {
            tmpPayment.push(payment);
          }
        });
        purchase._payment = tmpPayment.last();
      } else {
        purchase._payment = {
          sumPaidAmount: 0,
          dueAmount: purchase.total,
          paidAmount: purchase.paidAmount,
          outstandingAmount: purchase.outstandingAmount
        };
      }
      content.push(purchase);
      index++;
    });
    if (content.length > 0) {
      data.content = content;
    }
    return data;
  }
});
