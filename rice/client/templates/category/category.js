var tpl = Template.rice_categories;
tpl.onRendered(function() {
    createNewAlertify('category');
});
tpl.events({
    'click .insert': function() {
        alertify.category(fa('plus', 'New Category'), renderTemplate(Template.rice_categoryInsert));
    },
    'click .update': function() {
        var self = this;
        alertify.category(fa('pencil', 'Edit Category'), renderTemplate(Template.rice_categoryUpdate, self));
    },
    'click .show': function() {
        var data = Rice.Collection.Category.findOne({
            _id: this._id
        });
        alertify.alert(fa("eye", "Category"), renderTemplate(Template.rice_categoryShow, data));
    },
    'dblclick tbody > tr': function(event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        // alertify.customer(fa('shopping-cart'), renderTemplate(Template.rice_saleInsert, rowData)).maximize();
        FlowRouter.go('rice.items', {
            categoryId: rowData._id
        });
    },
    'click .remove': function() {
        var self = this;
        alertify.confirm(fa("remove", "Category"), "Are you sure to delete [" + self._id + "]?", function() {
            Rice.Collection.Category.remove(self._id, function(error) {
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
    rice_categoryInsert: {
        before: {
            insert: function(doc) {
                doc._id = idGenerator.gen(Rice.Collection.Category, 3)
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
    rice_categoryUpdate: {
        onSuccess: function() {
            alertify.category().close();
            alertify.success('Successfully updated');
        },
        onError: function(formType, err) {
            alertify.error(err.message);
        }
    }
})