// Declare template
var indexTpl = Template.rice_purchase,
  insertTpl = Template.rice_purchaseInsert,
  updateTpl = Template.rice_purchaseUpdate,
  showTpl = Template.rice_purchaseShow,

  supplierSearchTpl = Template.rice_purchaseSupplierSearch,
  supplierAddonTpl = Template.rice_supplierInsert;

// Index
indexTpl.onCreated(function() {
  // SEO
  SEO.set({
    title: 'Purchase',
    description: 'Description for this page'
  });

  // Create new  alertify
  createNewAlertify(['purchase', 'supplier', 'supplierSearch',
    'purchaseQuickPayment'
  ]);
});

indexTpl.onRendered(function() {
  //
});
Template.rice_purchaseInsert.events({
  "change [name='exchange']": function(e) {
    var val = $(e.currentTarget).val();
    var exchange = Cpanel.Collection.Exchange.findOne(val);
    StateItem.set('exchange', exchange);
  }
});
indexTpl.helpers({
  tabularSelector: function() {
    return {
      supplierId: FlowRouter.getParam('supplierId')
    };
  },
  supplier: function() {
    var supplierId = FlowRouter.getParam('supplierId');
    var data = ReactiveMethod.call('getSupplier', supplierId);
    if (!_.isUndefined(data.photo)) {
      data.photoUrl = Files.findOne(data.photo).url();
    } else {
      data.photoUrl = null;
    }
    return data;
  }
});

indexTpl.events({
  'click .print': function() {
    Report.purchaseInvoice(this._id);
  },
  'click #payment': function() {
    FlowRouter.go('rice.purchasePayment', {
      supplierId: this.supplierId,
      purchaseId: this._id
    });

  },
  'click .insert': function(e, t) {
    purchaseItemsState.clear();
    alertify.purchase(fa("plus", "Purchase"), renderTemplate(insertTpl))
      .maximize();
  },
  'click .update': function(e, t) {
    var id = this._id;
    var data = this;
    if (data.paidAmount !== 0) {
      alertify.warning('Sorry purchase #' + data._id + ' had payment!');
    } else {
      Meteor.call('purchaseItem', id, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          alertify.purchase(fa("pencil", "Purchase"), renderTemplate(
              updateTpl, data))
            .maximize();
        }
      });
    }
  },
  'click .remove': function(e, t) {
    var self = this;
    if (self.paidAmount !== 0) {
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
  },
  'click .show': function(e, t) {
    var id = this._id;
    Meteor.call("purchaseItem", id, function(error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        alertify.purchase(fa("eye", "Purchase"), renderTemplate(
          showTpl,
          result));
      }
    });
  },
  'dblclick tbody > tr': function(event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (rowData.outstandingAmount === 0) {
      alertify.warning('Sorry purchase #' + rowData._id +
        ' has been paid!');
    } else {
      QuickPayment.firePurchaseQuickPayment('purchaseQuickPayment',
        'Quick Pay',
        rowData);
    }
  }
});
showTpl.helpers({
  extract: function(items) {
    var concate = '';
    items.forEach(function(item) {
      concate += '<li>' + 'Item: ' + getItemName(item.purchaseItemId) +
        ', Qty: ' + formatKh(item.qty) +
        ', Price: ' + formatKh(item.price) +
        ', Discount: ' + item.discount +
        ', Amount: ' +
        formatKh(item.amount) +
        '</li>';
    });
    return concate;
  }
});
indexTpl.onDestroyed(function() {
  //
});

// Insert
insertTpl.onRendered(function() {
  Session.set('invioceId', undefined);
  Session.set('payNprint', undefined);
  Session.set('pay', undefined);
  datePicker();
});

insertTpl.helpers({
  supplier: function() {
    data = this;
    supplierId = FlowRouter.getParam('supplierId');
    if (supplierId) {
      var data = ReactiveMethod.call('getSupplier', supplierId);
      if (!_.isUndefined(data.photo)) {
        data.photoUrl = Files.findOne(data.photo).url();
      } else {
        data.photoUrl = null;
      }
      return data;
    } else {
      return data;
    }
  }
});

insertTpl.events({
  'click .pay': function() {
    Session.set('saveNpay', true);
  },
  'click .payNprint': function() {
    Session.set('payNprint', true);
  },
  'click [name="supplierId"]': function(e, t) {
    var val = $('[name="supplierId"]').val();
    var data = {
      data: val
    };

    alertify.supplierSearch(fa("list", "Supplier Search List"),
      renderTemplate(supplierSearchTpl, data));
  },
  'click .supplierAddon': function(e, t) {
    alertify.supplier(fa("plus", "Supplier"), renderTemplate(
      supplierAddonTpl));
  },
  // Test search list change
  'change [name="supplierId"]': function() {
    $('[name="des"]').val('Supplier is changed');
  }
});

insertTpl.onDestroyed(function() {});

// Update
updateTpl.onRendered(function() {
  datePicker();
});

updateTpl.helpers({});

updateTpl.events({
  'click [name="supplierId"]': function(e, t) {
    var val = $('[name="supplierId"]').val();
    var data = {
      data: val
    };

    alertify.supplierSearch(fa("list", "Supplier Search List"),
      renderTemplate(supplierSearchTpl, data));
  },
  'click .supplierAddon': function(e, t) {
    alertify.supplier(fa("plus", "Supplier"), renderTemplate(
      supplierAddonTpl));
  }
});

updateTpl.onDestroyed(function() {});

// Hook


// Config date picker
var datePicker = function() {
  var dob = $('[name="purchaseDate"]');
  DateTimePicker.dateTime(dob);
};

// Supplier search
supplierSearchTpl.events({
  'click .purchaseItem': function(e, t) {
    $('[name="supplierId"]').val(this._id);
    $('[name="supplierId"]').change();

    alertify.supplierSearch().close();
  }
});

// Get current supplier
var getCurrentSupplier = function(id) {

};


var getItemName = function(id) {
  return Rice.Collection.PurchaseItem.findOne(id).name;
};

var formatKh = function(val) {
  return numeral(val).format('0,0');
};
