Meteor.methods({
  extractContent: function(sales) {
    var outstandingAmount = 0,
      dueAmount = 0,
      paidAmount = 0,
      sumPaidAmount = 0;
    sales.forEach(function(sale) {
      outstandingAmount += sale._payment.outstandingAmount;
      paidAmount += sale._payment.paidAmount;
      sumPaidAmount += sale._payment.sumPaidAmount;
      dueAmount += sale._payment.dueAmount;
    });
    var footer = {
      outstandingAmount: outstandingAmount,
      dueAmount: dueAmount,
      paidAmount: paidAmount,
      sumPaidAmount: sumPaidAmount,
      sumPaidAmountInKhmer: fx.convert(sumPaidAmount, {
        from: 'USD',
        to: 'KHR'
      }),
      sumPaidAmountInBath: fx.convert(sumPaidAmount, {
        from: 'USD',
        to: 'THB'
      }),
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
    return footer;
  }
});
