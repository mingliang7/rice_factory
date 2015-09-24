/**
 * Declare template
 */
var indexTpl = Template.rice_supplier,
  insertTpl = Template.rice_supplierInsert,
  updateTpl = Template.rice_supplierUpdate,
  showTpl = Template.rice_supplierShow,
  addressAddonTpl = Template.rice_addressInsert;

/**
 * Index
 */
indexTpl.onCreated(function() {
  // SEO
  SEO.set({
    title: 'Supplier',
    description: 'Description for this page'
  });

  // Create new  alertify
  createNewAlertify(["purchase", "supplier", "address", 'quickPayment']);
});

indexTpl.onRendered(function() {
  createNewAlertify('purchaseQuickPayment');
});

indexTpl.helpers({});

indexTpl.events({
  'click .insert': function(e, t) {
    alertify.supplier(fa("plus", "Supplier"), renderTemplate(insertTpl))
      .maximize();
  },
  'click .update': function(e, t) {
    var data = Rice.Collection.Supplier.findOne(this._id);

    alertify.supplier(fa("pencil", "Supplier"), renderTemplate(updateTpl,
        data))
      .maximize();
  },
  'click #purchase': function() {
    StateItem = new ReactiveObj({
      qty: 0,
      price: 0,
      discount: 0,
      subDiscount: 0,
      cost: 0,
      exchange: 0,
      cssClassForAddMore: 'disabled'
    });
    FlowRouter.go('rice.purchase', {
      supplierId: this._id
    });
  },
  'click .remove': function(e, t) {
    var self = this;

    alertify.confirm(
      fa("remove", "Supplier"),
      "Are you sure to delete [" + self._id + "]?",
      function() {
        Rice.Collection.Supplier.softRemove(self._id, function(error) {
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
    var data = Rice.Collection.Supplier.findOne({
      _id: this._id
    });
    data.photoUrl = null;

    if (!_.isUndefined(data.photo)) {
      data.photoUrl = Files.findOne(data.photo).url();
    }

    alertify.supplier(fa("eye", "Supplier"), renderTemplate(showTpl, data));
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
    alertify.purchase(fa('shopping-cart', "Quick Purchase (" + rowData._id +
      ' | ' + rowData.name + ')'), renderTemplate(Template.rice_purchaseInsert,
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
  // Supplier
  rice_supplierInsert: {
    before: {
      insert: function(doc) {
        var prefix = Session.get('currentBranch') + '-';
        doc._id = idGenerator.genWithPrefix(Rice.Collection.Supplier,
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
  rice_supplierUpdate: {
    onSuccess: function(formType, result) {
      alertify.supplier().close();
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
