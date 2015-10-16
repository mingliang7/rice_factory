// Declare template
var indexTpl = Template.rice_sale,
  insertTpl = Template.rice_saleInsert,
  updateTpl = Template.rice_saleUpdate,
  showTpl = Template.rice_saleShow,

  customerSearchTpl = Template.rice_saleCustomerSearch,
  customerAddonTpl = Template.rice_customerInsert;

// Index
indexTpl.onCreated(function() {
  // SEO
  SEO.set({
    title: 'Sale',
    description: 'Description for this page'
  });

  // Create new  alertify
  createNewAlertify(['sale', 'customer', 'customerSearch',
    'saleQuickPayment'
  ]);
});

indexTpl.onRendered(function() {
  //
});

indexTpl.helpers({
  tabularSelector: function() {
    return {
      customerId: FlowRouter.getParam('customerId')
    };
  },
  customer: function() {
    var customerId = FlowRouter.getParam('customerId');
    var data = ReactiveMethod.call('getCustomer', customerId);
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
    Report.saleInvoice(this._id);
  },
  'click #payment': function() {
    FlowRouter.go('rice.payment', {
      customerId: this.customerId,
      saleId: this._id
    });

  },
  'click .insert': function(e, t) {
    saleItemsState.clear();
    alertify.sale(fa("plus", "Sale"), renderTemplate(insertTpl))
      .maximize();
  },
  'click .update': function(e, t) {
    var id = this._id;
    var data = this;
    if (data.paidAmount !== 0) {
      alertify.warning('Sorry sale #' + data._id + ' had payment!');
    } else {
      Meteor.call('saleItem', id, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          alertify.sale(fa("pencil", "Sale"), renderTemplate(
              updateTpl, data))
            .maximize();
        }
      });
    }
  },
  'click .remove': function(e, t) {
    var self = this;
    if (self.paidAmount !== 0) {
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
  },

  'click .show': function(e, t) {
    var id = this._id;
    Meteor.call("saleItem", id, function(error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        alertify.sale(fa("eye", "Sale"), renderTemplate(showTpl,
          result));
      }
    });
  },
  'dblclick tbody > tr': function(event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (rowData.outstandingAmount === 0) {
      alertify.warning('Sorry sale #' + rowData._id + ' has been paid!');
    } else {
      QuickPayment.fireQuickPayment('saleQuickPayment', 'Quick Pay',
        rowData);
    }
  }
});
Template.rice_saleInsert.events({
  'change [name="exchange"]': function(e) {
    var val = $(e.currentTarget).val();
    var exchange = Cpanel.Collection.Exchange.findOne(val);
    StateItem.set('exchange', exchange);
  }
});
showTpl.helpers({
  extract: function(items) {
    var concate = '';
    items.forEach(function(item) {
      concate += '<li>' + 'Item: ' + getItemName(item.saleItemId) +
        ', Qty: ' + formatKh(item.qty) +
        ', Price: ' + formatKh(item.price) +
        ', Cost: ' + formatKh(item.cost) + ', Discount: ' + item.discount +
        ', Amount: ' +
        formatKh(item.amount) + ', Line-Cost: ' + formatKh(item.lineCost) +
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
  customer: function() {
    data = this;
    customerId = FlowRouter.getParam('customerId');
    if (customerId) {
      var data = ReactiveMethod.call('getCustomer', customerId);
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
  'click [name="customerId"]': function(e, t) {
    var val = $('[name="customerId"]').val();
    var data = {
      data: val
    };

    alertify.customerSearch(fa("list", "Customer Search List"),
      renderTemplate(customerSearchTpl, data));
  },
  'click .customerAddon': function(e, t) {
    alertify.customer(fa("plus", "Customer"), renderTemplate(
      customerAddonTpl));
  },
  // Test search list change
  'change [name="customerId"]': function() {
    $('[name="des"]').val('Customer is changed');
  }
});

insertTpl.onDestroyed(function() {});

// Update
updateTpl.onRendered(function() {
  datePicker();
});

updateTpl.helpers({});

updateTpl.events({
  'click [name="customerId"]': function(e, t) {
    var val = $('[name="customerId"]').val();
    var data = {
      data: val
    };

    alertify.customerSearch(fa("list", "Customer Search List"),
      renderTemplate(customerSearchTpl, data));
  },
  'click .customerAddon': function(e, t) {
    alertify.customer(fa("plus", "Customer"), renderTemplate(
      customerAddonTpl));
  }
});

updateTpl.onDestroyed(function() {});

// Hook


// Config date picker
var datePicker = function() {
  var dob = $('[name="saleDate"]');
  DateTimePicker.dateTime(dob);
};

// Customer search
customerSearchTpl.events({
  'click .saleItem': function(e, t) {
    $('[name="customerId"]').val(this._id);
    $('[name="customerId"]').change();

    alertify.customerSearch().close();
  }
});

// Get current customer
var getCurrentCustomer = function(id) {

};


var getItemName = function(id) {
  return Rice.Collection.SaleItem.findOne(id).name;
}

var formatKh = function(val) {
  return numeral(val).format('0,0');
}
