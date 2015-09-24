var tpl = Template.rice_purchaseCategories;
tpl.onRendered(function() {
    createNewAlertify('purchaseCategory');
});
tpl.events({
    'click .insert': function() {
        alertify.purchaseCategory(fa('plus', 'New PurchaseCategory'), renderTemplate(Template.rice_purchaseCategoryInsert));
    },
    'click .update': function() {
        var self = this;
        alertify.purchaseCategory(fa('pencil', 'Edit PurchaseCategory'), renderTemplate(Template.rice_purchaseCategoryUpdate, self));
    },
    'click .show': function() {
        var data = Rice.Collection.PurchaseCategory.findOne({
            _id: this._id
        });
        alertify.alert(fa("eye", "PurchaseCategory"), renderTemplate(Template.rice_purchaseCategoryShow, data));
    },
    'dblclick tbody > tr': function(event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        // alertify.supplier(fa('shopping-cart'), renderTemplate(Template.rice_purchaseInsert, rowData)).maximize();
        FlowRouter.go('rice.purchaseItems', {
            purchaseCategoryId: rowData._id
        });
    },
    'click .remove': function() {
        var self = this;
        alertify.confirm(fa("remove", "PurchaseCategory"), "Are you sure to delete [" + self._id + "]?", function() {
            Rice.Collection.PurchaseCategory.remove(self._id, function(error) {
                if (error) {
                    alertify.error(error.message);
                } else {
                    alertify.success("Success");
                }
            });
        }, null);
    }
});
AutoForm.hooks({
    rice_purchaseCategoryInsert: {
        before: {
            insert: function(doc) {
                doc._id = idGenerator.gen(Rice.Collection.PurchaseCategory, 3)
                return doc;
            }
        },
        onSuccess: function(formType, result) {
            alertify.success('Successfully');
        },
        onError: function(formType, err) {
            alertify.error(err.message);
        }
    },
    rice_purchaseCategoryUpdate: {
        onSuccess: function() {
            alertify.purchaseCategory().close();
            alertify.success('Successfully updated');
        },
        onError: function(formType, err) {
            alertify.error(err.message);
        }
    }
})