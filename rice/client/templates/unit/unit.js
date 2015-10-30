Template.rice_unitTabular.onRendered(function() {
  createNewAlertify('unit', 'zoom');
});
Template.rice_unitTabular.events({
  "click .insert": function(event, template) {
    alertify.unit(fa('plus', 'Add New'), renderTemplate(Template.rice_unitInsertTemplate));
  },
  "click .update": function() {
    alertify.unit(fa('pencil', 'Edit'), renderTemplate(Template.rice_unitUpdateTemplate,
      this));
  },
  "click .remove": function() {
    var self = this;
    var flag = checkUnit(self);
    if (flag) {
      alertify.confirm(fa('remove', 'Remove Unit'),
        "Are you sure to delete #" + self._id,
        function() {
          Rice.Collection.Unit.remove(self._id, function(err) {
            if (err == undefined) {
              alertify.error(err.message);
            } else {
              alertify.success('Successfully remove');
            }
          });
        }, null);
    } else {
      alertify.warning('Sorry  this unit is in use');
    }
  },
  "click .show": function() {
    var self = this;
    alertify.unit(fa('eye', 'show'), renderTemplate(Template.rice_unitShowTemplate,
      self));
  }
});
AutoForm.hooks({
  rice_unitInsertTemplate: {
    before: {
      insert: function(doc) {
        doc._id = idGenerator.gen(Rice.Collection.Unit, 2);
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
  rice_unitUpdateTemplate: {
    onSuccess: function(formType, result) {
      alertify.success('Successfully updated');
      alertify.unit().close();
    },
    onError: function(formType, err) {
      alertify.error(err.message);
    }
  }
});

var checkUnit = function(unit) {
  var saleItem = Rice.Collection.SaleItem.findOne({
    unit: unit._id
  });
  var purchaseItem = Rice.Collection.PurchaseItem.findOne({
    unit: unit._id
  });

  if (!_.isUndefined(saleItem) || !_.isUndefined(purchaseItem)) {
    return false;
  }
  return true;

};
