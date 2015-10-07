var status = new ReactiveObj();
Template.rice_purchasedList.onRendered(function() {
  createNewAlertify(['purchaseQuickPayment', 'purchase']);
});
Template.rice_purchasedList.helpers({

});

Template.rice_purchasedList.events({
  'click tbody > tr': function() {
    status.set('status', 'all');
  },
  'click #payment': function() {
    FlowRouter.go('rice.purchasePayment', {
      supplierId: this.supplierId,
      purchaseId: this._id
    });
  },
  "dblclick tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (rowData.outstandingAmount == 0) {
      alertify.warning('Sorry purchase #' + rowData._id +
        ' has been paid!');
    } else {
      QuickPayment.firePurchaseQuickPayment('purchaseQuickPayment',
        'Quick Pay',
        rowData);
    }
  },
  'click .supplier-purchase': function() {
    FlowRouter.go('rice.purchase', {
      supplierId: this.supplierId
    });
  },
  'click .show': function(e, t) {
    var id = this._id;
    Meteor.call("purchaseItem", id, function(error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        alertify.purchase(fa("eye", "Purchase"), renderTemplate(
          Template.rice_purchaseShow,
          result));
      }
    });
  },
  'click .remove': function(e, t) {
    var self = this;
    if (self.paidAmount != 0) {
      alertify.warning('Sorry purchase #' + self._id + ' had payment!');
    } else {
      alertify.confirm(
        fa("remove", "Purchase"),
        "Are you sure to delete [" + self._id + "]?",
        function() {
          Rice.Collection.Purchase.remove(self._id, function(error) {
            if (error) {
              alertify.warning(error.message);
            } else {
              alertify.success("Success");
            }
          });
        },
        null
      );
    }
  }
});

Template.rice_purchasedList.onDestroyed(function() {
  status.set([], {});
});
