Template.rice_purchasePaymentTable.onRendered(function() {
  createNewAlertify('purchaseQuickPayment', 'purchasePayment');
});
Template.rice_purchasePaymentTable.helpers({
  selector: function() {
    var supplierId = FlowRouter.getParam('supplierId');
    var purchaseId = FlowRouter.getParam('purchaseId');
    return {
      supplierId: supplierId,
      purchaseId: purchaseId
    };
  },
  purchaseId: function() {
    var purchaseId = FlowRouter.getParam('purchaseId');
    return purchaseId;
  },
  supplier: function() {
    var purchaseId = FlowRouter.getParam('purchaseId');
    var purchase = ReactiveMethod.call('purchaseItem', purchaseId);
    return purchase.supplierId + ' | ' + purchase._supplier.name;
  }
});
Template.rice_purchasePaymentTable.events({
  "click .insert": function(event, template) {
    var purchaseId = FlowRouter.getParam('purchaseId');
    Meteor.call('purchaseItem', purchaseId, function(err, result) {
      if (result.outstandingAmount == 0) {
        alertify.warning('PurchasePayment #' + result._id +
          ' has been paid!');
      } else {
        QuickPayment.firePurchaseQuickPayment(
          'purchaseQuickPayment', 'PurchasePayment',
          result);
      }
    });
  },
  'click .update': function() {
    var data = this;
    var id = this._id;
    Meteor.call('checkAvailablePurchasePayment', this._id, this.purchaseId,
      function(err,
        result) {
        if (result) {
          QuickPayment.fireUpdatePurchaseQuickPayment(
            'purchaseQuickPayment',
            'Edit PurchasePayment', data);
        } else {
          alertify.warning('PurchasePayment #' + id +
            ' is not the last record!');
        }
      });
  },
  'click .remove': function() {
    var self = this;
    Meteor.call('checkAvailablePurchasePayment', self._id, self.purchaseId,
      function(err,
        result) {
        if (!result) {
          alertify.warning('Sorry purchasePayment #' + self._id +
            ' not the last record!');
        } else {
          alertify.confirm(
            fa("remove", "Remove Payment"),
            "Are you sure to delete [" + self._id + "]?",
            function() {
              Meteor.call('removePurchasePayment', self._id, function(
                err,
                result) {
                if (err) {
                  alertify.warning(err);
                } else {
                  alertify.success("Success");
                }
              });
            },
            null
          );
        }
      });
  },
  'click .show': function() {
    var data = this;
    alertify.purchaseQuickPayment(fa("eye", "Sale"),
      renderTemplate(
        Template.rice_purchasePaymentTableShow,
        data));
  }
});
