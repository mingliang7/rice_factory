var tpl = Template.rice_saleCategories;
tpl.onRendered(function() {
    createNewAlertify('saleCategory');
});
tpl.events({
    'click .insert': function() {
        alertify.saleCategory(fa('plus', 'New SaleCategory'), renderTemplate(Template.rice_saleCategoryInsert));
    },
    'click .update': function() {
        var self = this;
        alertify.saleCategory(fa('pencil', 'Edit SaleCategory'), renderTemplate(Template.rice_saleCategoryUpdate, self));
    },
    'click .show': function() {
        var data = Rice.Collection.SaleCategory.findOne({
            _id: this._id
        });
        alertify.alert(fa("eye", "SaleCategory"), renderTemplate(Template.rice_saleCategoryShow, data));
    },
    'dblclick tbody > tr': function(event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        // alertify.customer(fa('shopping-cart'), renderTemplate(Template.rice_saleInsert, rowData)).maximize();
        FlowRouter.go('rice.saleItems', {
            saleCategoryId: rowData._id
        });
    },
    'click .remove': function() {
        var self = this;
        alertify.confirm(fa("remove", "SaleCategory"), "Are you sure to delete [" + self._id + "]?", function() {
            Rice.Collection.SaleCategory.remove(self._id, function(error) {
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
    rice_saleCategoryInsert: {
        before: {
            insert: function(doc) {
                doc._id = idGenerator.gen(Rice.Collection.SaleCategory, 3)
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
    rice_saleCategoryUpdate: {
        onSuccess: function() {
            alertify.saleCategory().close();
            alertify.success('Successfully updated');
        },
        onError: function(formType, err) {
            alertify.error(err.message);
        }
    }
})