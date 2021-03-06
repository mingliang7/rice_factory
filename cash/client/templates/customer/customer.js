/***** Declare template */
var indexTpl = Template.cash_customer,
    insertTpl = Template.cash_customerInsert,
    updateTpl = Template.cash_customerUpdate,
    showTpl = Template.cash_customerShow,
    addressAddonTpl = Template.cash_addressAddon;

/**** Index */
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify(["customer", "addressAddon"]);
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    selector: function () {
        var pattern = Session.get('currentBranch');
        //var pattern = new RegExp("^" + branchId.current.branch);
        return {cpanel_branchId: pattern};
    }
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.customer(fa("plus", "Customer"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Cash.Collection.Customer.findOne(this._id);
        alertify.customer(fa("pencil", "Customer"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Customer"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Cash.Collection.Customer.remove(self._id, function (error) {
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
        var data = Cash.Collection.Customer.findOne({_id: this._id});
        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }

        alertify.alert(fa("eye", "Customer"), renderTemplate(showTpl, data));
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
        alertify.addressAddon(fa("plus", "Address"), renderTemplate(addressAddonTpl))
    }
});

// Update
updateTpl.onRendered(function () {
    datePicker();
});

updateTpl.events({
    'click .addressAddon': function (e, t) {
        alertify.addressAddon(fa("plus", "Address"), renderTemplate(addressAddonTpl));
    }
});

// Hook
AutoForm.hooks({
    // Customer
    cash_customerInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Cash.Collection.Customer, prefix, 3);
                doc.cpanel_branchId = Session.get('currentBranch');
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
    cash_customerUpdate: {
        onSuccess: function (formType, result) {
            alertify.customer().close();
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
        },
        onSuccess: function (formType, result) {
            //alertify.addressAddon();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var datePicker = function () {
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);
};
