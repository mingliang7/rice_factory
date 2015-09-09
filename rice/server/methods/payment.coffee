Meteor.methods
  removePayment: (id) ->
    Rice.Collection.Payment.remove(id)
    
  getCustomerName: (id)->
    Rice.Collection.Customer.findOne(id).name

  getSumPayment: (id) ->
      payment = Rice.Collection.Payment.findOne({saleId: id})
      if(payment)
        payment.sumPaidAmount
      else
        0
  checkAvailable: (id, saleId) ->
    payment = Rice.Collection.Payment.findOne(
      {
      saleId: saleId
      }, {sort: {paymentDate: -1}}
    )
    if(payment._id == id)
      true
    else
      false
  findValidDate: (currentSaleId) ->
    maxDate = ''
    payments = Rice.Collection.Payment.find({saleId: currentSaleId}).fetch()
    console.log payments
    if (payments != undefined)
      payments.forEach (payment) ->
        paymentDate = moment(payment.paymentDate).format('YYYY-MM-DD HH:mm:ss')
        if maxDate is ''
          maxDate = paymentDate
        else if maxDate > paymentDate
          maxDate = paymentDate
        maxDate
    console.log maxDate
    maxDate
