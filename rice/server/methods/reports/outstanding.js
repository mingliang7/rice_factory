Meteor.methods({
  rice_outstandingReport: function(params) {
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
    var customerId = params.customer;
    var type = params.type;
    var staff = params.staff;
    /****** Title *****/
    data.title = Cpanel.Collection.Company.findOne();

    /****** Header *****/
    data.header = {
      staff: staff == '' ? 'All' : staff,
      type: type == '' ? 'All' : type,
      customer: ReportInfo.customerName(params.customer),
      branch: ReportInfo.branchName(params.branch),
      date: params.date,
      exchange: ReportInfo.readbleExchange(params.exchange)
    };

    /****** Content *****/
    var content = [];
    var selector = {};
    selector.saleDate = {
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
    if (customerId != 'All') {
      selector.customerId = customerId;
    }
    if (type != '') {
      selector['_customer.type'] = type;
    }
    var index = 1;
    var paidAmount = 0;
    var sales = Rice.Collection.Sale.find(selector, {
      sort: {
        _id: 1
      }
    }).fetch();
    var tmpPayment = [];
    sales.forEach(function(sale) {
      sale.index = index;
      if (!_.isUndefined(sale._payment)) {
        sale._payment.forEach(function(payment) {
          if (payment.paymentDate <= today) {
            tmpPayment.push(payment);
          }
        });
        sale._payment = tmpPayment.last();
      } else {
        sale._payment = {
          sumPaidAmount: 0,
          dueAmount: sale.total,
          paidAmount: sale.paidAmount,
          outstandingAmount: sale.outstandingAmount
        };
      }
      content.push(sale);
      index++;
    });
    if (content.length > 0) {
      data.content = content;
    }
    return data;
  }
});
