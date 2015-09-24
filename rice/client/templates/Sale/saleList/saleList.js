var status = new ReactiveObj();
Template.rice_sellingList.onRendered(function() {
  createNewAlertify(['saleQuickPayment', 'sale']);
});
Template.rice_sellingList.helpers({

});

Template.rice_sellingList.events({
  'click tbody > tr': function() {
    status.set('status', 'all');
  },
  'click #payment': function() {
    FlowRouter.go('rice.payment', {
      customerId: this.customerId,
      saleId: this._id
    });
  },
  "dblclick tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (rowData.outstandingAmount == 0) {
      alertify.warning('Sorry sale #' + rowData._id + ' has been paid!');
    } else {
      QuickPayment.fireQuickPayment('saleQuickPayment', 'Quick Pay',
        rowData);
    }
  },
  'click .customerSale': function() {
    FlowRouter.go('rice.sale', {
      customerId: this.customerId
    });
  },
  'click .show': function(e, t) {
    var id = this._id;
    Meteor.call("saleItem", id, function(error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        alertify.sale(fa("eye", "Sale"), renderTemplate(Template.rice_saleShow,
          result));
      }
    });
  },
  'click .remove': function(e, t) {
    var self = this;
    if (self.paidAmount != 0) {
      alertify.warning('Sorry sale #' + self._id + ' had payment!');

    } else {
      alertify.confirm(
        fa("remove", "Sale"),
        "Are you sure to delete [" + self._id + "]?",
        function() {
          Rice.Collection.Sale.remove(self._id, function(error) {
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

Template.rice_sellingList.onDestroyed(function() {
  status.set([], {});
});
