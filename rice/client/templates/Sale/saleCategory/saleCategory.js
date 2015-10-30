var tpl = Template.rice_saleCategories;
tpl.onRendered(function() {
  createNewAlertify('saleCategory');
});
tpl.events({
  'click .insert': function() {
    alertify.saleCategory(fa('plus', 'New SaleCategory'), renderTemplate(
      Template.rice_saleCategoryInsert));
  },
  'click .update': function() {
    var self = this;
    alertify.saleCategory(fa('pencil', 'Edit SaleCategory'),
      renderTemplate(Template.rice_saleCategoryUpdate, self));
  },
  'click .show': function() {
    var data = Rice.Collection.SaleCategory.findOne({
      _id: this._id
    });
    alertify.saleCategory(fa("eye", "SaleCategory"), renderTemplate(
      Template.rice_saleCategoryShow, data));
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
    var flag = checkSaleItems(self);
    if (flag) {
      alertify.confirm(fa("remove", "SaleCategory"),
        "Are you sure to delete [" + self._id + "]?",
        function() {
          Rice.Collection.SaleCategory.remove(self._id, function(error) {
            if (error) {
              alertify.error(error.message);
            } else {
              alertify.success("Success");
            }
          });
        }, null);
    } else {
      alertify.warning('Sorry this category has items!');
    }
  }
});
AutoForm.hooks({
  rice_saleCategoryInsert: {
    before: {
      insert: function(doc) {
        doc._id = idGenerator.gen(Rice.Collection.SaleCategory, 3);
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
});
var checkSaleItems = function(self) {
  var saleItems = Rice.Collection.SaleItem.find({
    saleCategoryId: self._id
  }).fetch();
  console.log(saleItems);
  if (saleItems.length > 0) {
    return false;
  }
  return true;
};
