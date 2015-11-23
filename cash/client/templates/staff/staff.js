/***** Declare template */
var indexTpl = Template.cash_staff,
  insertTpl = Template.cash_staffInsert,
  updateTpl = Template.cash_staffUpdate,
  showTpl = Template.cash_staffShow,
  addressAddonTpl = Template.cash_addressAddon;

// Index
indexTpl.onCreated(function () {
  // Create new  alertify
  SEO.set({
    title: 'staff',
    description: 'staff'
  });
  createNewAlertify(["staff", "addressAddon", "staffShow"]);
});

indexTpl.onRendered(function () {
  //
});

indexTpl.helpers({
  selector: function () {
    var pattern = Session.get('currentBranch');
    //var pattern = new RegExp("^" + branchId.current.branch);
    return {
      branchId: pattern
    };
  }
});

indexTpl.events({
  'click .insert': function (e, t) {
    alertify.staff(fa("plus", "Staff"), renderTemplate(insertTpl))
      .maximize();
  },
  'click .update': function (e, t) {
    var data = Cash.Collection.Staff.findOne(this._id);
    alertify.staff(fa("pencil", "Staff"), renderTemplate(updateTpl, data))
      .maximize();
  },
  'click .remove': function (e, t) {
    var self = this;

    alertify.confirm(
      fa("remove", "Staff"),
      "Are you sure to delete [" + self._id + "]?",
      function () {
        Cash.Collection.Staff.remove(self._id, function (error) {
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
  'click .show': function (e, t) {
    var data = Cash.Collection.Staff.findOne({
      _id: this._id
    });
    data.photoUrl = null;

    if (!_.isUndefined(data.photo)) {
      data.photoUrl = Files.findOne(data.photo).url();
    }

    /* alertify.alert(fa("eye", "Staff"), renderTemplate(showTpl, data));*/
    alertify.staffShow(fa('eye', 'Staff'), renderTemplate(
      showTpl,
      data));
  }
});

indexTpl.onDestroyed(function () {
  //
});

// Insert
insertTpl.onRendered(function () {
  datePicker();
});

insertTpl.events({
  'click .addressAddon': function (e, t) {
    alertify.addressAddon(fa("plus", "Address"), renderTemplate(
      addressAddonTpl))
  }
});

// Update
updateTpl.onRendered(function () {
  datePicker();
});

updateTpl.events({
  'click .addressAddon': function (e, t) {
    alertify.addressAddon(fa("plus", "Address"), renderTemplate(
      addressAddonTpl));
  }
});

// Hook
AutoForm.hooks({
  // Customer
  cash_staffInsert: {
    before: {
      insert: function (doc) {
        var prefix = Session.get('currentBranch') + '-';
        doc._id = idGenerator.genWithPrefix(Cash.Collection.Staff, prefix,
          3);
        doc.branchId = Session.get('currentBranch');
        return doc;
      }
    },
    onSuccess: function (formType, result) {
      alertify.success('Success');
    },
    onError: function (formType, error) {
      alertify.error(error.message);
    }
  },
  cash_staffUpdate: {
    onSuccess: function (formType, result) {
      alertify.staff().close();
      alertify.success('Success');
    },
    onError: function (formType, error) {
      alertify.error(error.message);
    }
  },
  // Address addon
  cash_addressAddon: {
    before: {
      insert: function (doc) {
        doc._id = idGenerator.gen(Cash.Collection.Address, 3);
        return doc;
      }
    }
    /*,
        onSuccess: function(formType, result) {
          //alertify.addressAddon();
          alertify.success('Success Hery');
        },
        onError: function(formType, error) {
          alertify.error(error.message);
        }*/
  }
});

// Config date picker
var datePicker = function () {
  var dob = $('[name="dob"]');
  DateTimePicker.date(dob);
};
