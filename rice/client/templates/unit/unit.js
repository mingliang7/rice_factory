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
    alertify.confirm(fa('remove', 'Remove staff'),
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
    },
    onError: function(formType, err) {
      alertify.error(err.message);
    }
  }
});
