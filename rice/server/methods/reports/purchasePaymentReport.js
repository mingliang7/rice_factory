Meteor.methods({
  rice_purchasePaymentReport: function(params) {
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
    selector.paymentDate = {
      $gte: fDate,
      $lte: tDate
    };
    if (staff != '') {
      selector.staffId = staff;
    }
    if (supplierId != 'All') {
      selector.supplierId = supplierId;
    }
    var index = 1;
    var paidAmount = 0;
    var purchasePayments = Rice.Collection.PurchasePayment.find(selector, {
      sort: {
        _id: 1
      }
    }).fetch();
    purchasePayments.forEach(function(purchasePayment) {
      purchasePayment.index = index;
      outstandingAmount += purchasePayment.outstandingAmount;
      dueAmount += purchasePayment.dueAmount;
      paidAmount += purchasePayment.paidAmount;
      content.push(purchasePayment);
      index += 1;
    });
    if (content.length > 0) {
      data.content = content;
      data.footer = {
        outstandingAmount: outstandingAmount,
        discount: discount,
        dueAmount: dueAmount,
        paidAmount: paidAmount,
        outstandingAmountInKhmer: fx.convert(outstandingAmount, {
          from: 'USD',
          to: 'KHR'
        }),
        outstandingAmountInBath: fx.convert(outstandingAmount, {
          from: 'USD',
          to: 'THB'
        }),
        paidAmountInKhmer: fx.convert(paidAmount, {
          from: 'USD',
          to: 'KHR'
        }),
        paidAmountInBath: fx.convert(paidAmount, {
          from: 'USD',
          to: 'THB'
        }),
        dueAmountInKhmer: fx.convert(dueAmount, {
          from: 'USD',
          to: 'KHR'
        }),
        dueAmountInBath: fx.convert(dueAmount, {
          from: 'USD',
          to: 'THB'
        })
      };
    }

    return data;
  }
});
