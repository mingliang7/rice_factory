AutoForm.hooks({
    rice_saleInsert:{
        before: {
            insert: function(doc){
                doc.paidAmount = 0;
                doc.status = 'active';
                doc.statusDate = doc.saleDate;
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function(formType, _id) {
            alertify.success('Successfully');
            alertify.sale().close();
            var saveNpay = Session.get('saveNpay');
            if(!_.isUndefined(saveNpay)){
              excutePayment('Payment', _id);
              Session.set('saveNpay', undefined);
            }
        },
        onError: function(formType, err){
            alertify.error(err.message);
        }
    },
    rice_saleUpdate: {
        docToForm: function (doc, ss) {
            doc.saleDate = moment(doc.saleDate).format('YYYY-MM-DD');
            return doc;
        },
        onSuccess: function (formType, result) {
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



var excutePayment = function(title, id){
    Meteor.call('getSaleReactiveId', id, function(err, doc){
        if(err){
            alertify.error(err);
        }else{
          QuickPayment.fireQuickPayment('saleQuickPayment', title,  doc);
        }
    });

};
