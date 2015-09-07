Meteor.methods
  getCustomerName: (id)->
    Rice.Collection.Customer.findOne(id).name

  getSumPayment: (id) ->
      payment = Rice.Collection.Payment.findOne({saleId: id})
      if(payment)
        payment.sumPaidAmount
      else
        0
