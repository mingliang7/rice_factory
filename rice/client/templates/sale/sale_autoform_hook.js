AutoForm.hooks({
    rice_saleInsert:{
        before: {
            insert: function(doc){
                doc.paidAmount = 0;
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function(formType, _id) {
            StateItem = new ReactiveObj({
                qty: 0,
                price: 0,
                discount: 0,
                subDiscount: 0,
                cost: 0,
                exchange: 0,
                cssClassForAddMore: 'disabled'
            });
            alertify.success('Successfully');
            alertify.sale().close();
            excutePayment(_id);
        },
        onError: function(formType, err){
            alertify.error(err.message)
        }
    },
    rice_saleUpdate: {
        docToForm: function (doc, ss) {
            doc.saleDate = moment(doc.saleDate).format('YYYY-MM-DD');
            return doc;
        },
        onSuccess: function (formType, result) {
          StateItem = new ReactiveObj({
              qty: 0,
              price: 0,
              discount: 0,
              subDiscount: 0,
              cost: 0,
              exchange: 0,
              cssClassForAddMore: 'disabled'
          });
          alertify.sale().close();
          alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    // Customer addon
    rice_customerAddon: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Rice.Collection.Customer, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            //alertify.customer().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});



var excutePayment = function(id){
    Meteor.call('getReactiveSaleId', id, function(err, result){
        if(err){
            alertify.error(err);
        }else{
            console.log(result);
        }
    });
}
