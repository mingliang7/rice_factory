/**
 * Declare template
 */
var indexTpl = Template.rice_customer,
  insertTpl = Template.rice_customerInsert,
  updateTpl = Template.rice_customerUpdate,
  showTpl = Template.rice_customerShow,
  addressAddonTpl = Template.rice_addressInsert;

/**
 * Index
 */
indexTpl.onCreated(function() {
  // SEO
  SEO.set({
    title: 'Customer',
    description: 'Description for this page'
  });

  // Create new  alertify
  createNewAlertify(["sale", "customer", "address", 'quickPayment']);
});

indexTpl.onRendered(function() {
  createNewAlertify('saleQuickPayment');
});

indexTpl.helpers({});

indexTpl.events({
  'click .insert': function(e, t) {
    alertify.customer(fa("plus", "Customer"), renderTemplate(insertTpl))
      .maximize();
  },
  'click .update': function(e, t) {
    var data = Rice.Collection.Customer.findOne(this._id);

    alertify.customer(fa("pencil", "Customer"), renderTemplate(updateTpl,
        data))
      .maximize();
  },
  'click #sale': function() {
    StateItem = new ReactiveObj({
      qty: 0,
      price: 0,
      discount: 0,
      subDiscount: 0,
      cost: 0,
      exchange: 0,
      cssClassForAddMore: 'disabled'
    });
    FlowRouter.go('rice.sale', {
      customerId: this._id
    });
  },
  'click .remove': function(e, t) {
    var self = this;

    alertify.confirm(
      fa("remove", "Customer"),
      "Are you sure to delete [" + self._id + "]?",
      function() {
        Rice.Collection.Customer.softRemove(self._id, function(error) {
          if (error) {
            alertify.error(error.message);
          } else {
            alertify.success("Success");
          }
        });
      },
      null
    );

  },
  'click .show': function(e, t) {
    var data = Rice.Collection.Customer.findOne({
      _id: this._id
    });
    data.photoUrl = null;

    if (!_.isUndefined(data.photo)) {
      data.photoUrl = Files.findOne(data.photo).url();
    }

    alertify.customer(fa("eye", "Customer"), renderTemplate(showTpl, data));
  },
  'dblclick tbody > tr': function(event) {
    StateItem = new ReactiveObj({
      qty: 0,
      price: 0,
      discount: 0,
      subDiscount: 0,
      cost: 0,
      exchange: 0,
      cssClassForAddMore: 'disabled'
    });
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    alertify.sale(fa('shopping-cart', "Quick Sale (" + rowData._id +
      ' | ' + rowData.name + ')'), renderTemplate(Template.rice_saleInsert,
      rowData)).maximize();

  }
});

indexTpl.onDestroyed(function() {
  //
});

/**
 * Insert
 */
insertTpl.onRendered(function() {
  configOnRender();
});

insertTpl.events({
  'click .addressAddon': function(e, t) {
    alertify.address(fa("plus", "Address"), renderTemplate(
      addressAddonTpl))
  }
});

/**
 * Update
 */
updateTpl.onRendered(function() {
  configOnRender();
});

updateTpl.helpers({});

updateTpl.events({
  'click .addressAddon': function(e, t) {
    alertify.address(fa("plus", "Address"), renderTemplate(
      addressAddonTpl));
  }
});

/**
 * Hook
 */
AutoForm.hooks({
  // Customer
  rice_customerInsert: {
    before: {
      insert: function(doc) {
        var prefix = Session.get('currentBranch') + '-';
        doc._id = idGenerator.genWithPrefix(Rice.Collection.Customer,
          prefix, 4);
        doc.branchId = Session.get('currentBranch');
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  rice_customerUpdate: {
    onSuccess: function(formType, result) {
      alertify.customer().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  // Address addon
  rice_addressAddon: {
    before: {
      insert: function(doc) {
        doc._id = idGenerator.gen(Rice.Collection.Address, 3);
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      //alertify.address().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});

// Config date picker
var configOnRender = function() {
  // date
  var dob = $('[name="dob"]');
  DateTimePicker.date(dob);

  // Remote select2
  //$('[name="addressId"]').select2({
  //    placeholder: "Search address",
  //    allowClear: true,
  //    ajax: {
  //        url: function (param) {
  //            var url = "/rice/addressRemote/" + param;
  //            return url;
  //        },
  //        type: "GET",
  //        dataType: 'json',
  //        delay: 250,
  //        //data: function (param) {
  //        //    return {term: param};
  //        //},
  //        results: function (data, page) {
  //            return {results: data};
  //        },
  //        cache: true
  //    },
  //    minimumInputLength: 3
  //});
};
