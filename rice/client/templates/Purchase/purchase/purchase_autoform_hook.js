AutoForm.hooks({
  rice_purchaseInsert: {
    before: {
      insert: function(doc) {
        doc.paidAmount = 0;
        doc.status = 'active';
        doc.statusDate = doc.purchaseDate;
        doc.branchId = Session.get('currentBranch');
        return doc;
      }
    },
    onSuccess: function(formType, _id) {
      alertify.success('Successfully');
      alertify.purchase().close();
      var saveNpay = Session.get('saveNpay');
      var payNprint = Session.get('payNprint');
      if (!_.isUndefined(saveNpay) || !_.isUndefined(payNprint)) {
        excutePayment('Payment', _id);
        Session.set('saveNpay', undefined);
      }
    },
    onError: function(formType, err) {
      alertify.error(err.message);
    }
  },
  rice_purchaseUpdate: {
    docToForm: function(doc, ss) {
      doc.purchaseDate = moment(doc.purchaseDate).format('YYYY-MM-DD');
      return doc;
    },
    onSuccess: function(formType, result) {
      alertify.purchase().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  // Supplier addon
  rice_supplierAddon: {
    before: {
      insert: function(doc) {
        doc._id = idGenerator.gen(Rice.Collection.Supplier, 3);
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      //alertify.supplier().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});



var excutePayment = function(title, id) {
  Meteor.call('getPurchaseReactiveId', id, function(err, doc) {
    if (err) {
      alertify.error(err);
    } else {
      QuickPayment.firePurchaseQuickPayment('purchaseQuickPayment', title,
        doc);
    }
  });

};
