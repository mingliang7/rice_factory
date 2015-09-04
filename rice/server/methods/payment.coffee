Meteor.methods
  getCustomerName: (id)->
    Rice.Collection.Customer.findOne(id).name

  getSumPayment: (id) ->
      payment = Rice.Collection.Payment.findOne(id)
      if(payment)
        payment.sumPaidAmount
        console.log 'in if blog'
      else
        console.log 'in else blog'
        0
