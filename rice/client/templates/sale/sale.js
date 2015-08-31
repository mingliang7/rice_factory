// Declare template
var indexTpl = Template.rice_sale,
    insertTpl = Template.rice_saleInsert,
    updateTpl = Template.rice_saleUpdate,
    showTpl = Template.rice_saleShow,

    customerSearchTpl = Template.rice_saleCustomerSearch,
    customerAddonTpl = Template.rice_customerInsert;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Sale',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(['sale', 'customer', 'customerSearch']);
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    tabularSelector: function () {
        return {customerId: FlowRouter.getParam('customerId')};
    },
    customer: function () {
        return getCurrentCustomer();
    }
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.sale(fa("plus", "Sale"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Rice.Collection.Sale.findOne(this._id);

        alertify.sale(fa("pencil", "Sale"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Sale"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Rice.Collection.Sale.remove(self._id, function (error) {
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
        var data = Rice.Collection.Sale.findOne({_id: this._id});

        alertify.alert(fa("eye", "Sale"), renderTemplate(showTpl, data));
    }
});

indexTpl.onDestroyed(function () {
    //
});

// Insert
insertTpl.onRendered(function () {
    datePicker();
});

insertTpl.helpers({
    customer: function () {
        return getCurrentCustomer();
    }
});

insertTpl.events({
    'click [name="customerId"]': function (e, t) {
        var val = $('[name="customerId"]').val();
        var data = {data: val};

        alertify.customerSearch(fa("list", "Customer Search List"), renderTemplate(customerSearchTpl, data));
    },
    'click .customerAddon': function (e, t) {
        alertify.customer(fa("plus", "Customer"), renderTemplate(customerAddonTpl));
    },
    // Test search list change
    'change [name="customerId"]': function () {
        $('[name="des"]').val('Customer is changed');
    }
});

insertTpl.onDestroyed(function () {
});

// Update
updateTpl.onRendered(function () {
    datePicker();
});

updateTpl.helpers({});

updateTpl.events({
    'click [name="customerId"]': function (e, t) {
        var val = $('[name="customerId"]').val();
        var data = {data: val};

        alertify.customerSearch(fa("list", "Customer Search List"), renderTemplate(customerSearchTpl, data));
    },
    'click .customerAddon': function (e, t) {
        alertify.customer(fa("plus", "Customer"), renderTemplate(customerAddonTpl));
    }
});

updateTpl.onDestroyed(function () {
});

// Hook
AutoForm.hooks({
    // Sale
    rice_saleInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-' + doc.customerId;
                doc._id = idGenerator.genWithPrefix(Rice.Collection.Sale, prefix, 3);
                doc.cpanel_branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            itemsState.clear();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rice_saleUpdate: {
        docToForm: function (doc, ss) {
            doc.saleDate = moment(doc.saleDate).format('YYYY-MM-DD');
            return doc;
        },
        onSuccess: function (formType, result) {
            alertify.sale().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    // Customer addon
    rice_customerAddon: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Rice.Collection.Customer, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            //alertify.customer().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var datePicker = function () {
    var dob = $('[name="saleDate"]');
    DateTimePicker.dateTime(dob);
};

// Customer search
customerSearchTpl.events({
    'click .item': function (e, t) {
        $('[name="customerId"]').val(this._id);
        $('[name="customerId"]').change();

        alertify.customerSearch().close();
    }
});

// Get current customer
var getCurrentCustomer = function () {
    var id = FlowRouter.getParam('customerId');
    var data = Rice.Collection.Customer.findOne(id);
    if (!_.isUndefined(data.photo)) {
        data.photoUrl = Files.findOne(data.photo).url();
    } else {
        data.photoUrl = null;
    }

    return data;
};
