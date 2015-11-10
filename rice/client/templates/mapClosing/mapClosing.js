var indexTpl = Template.rice_mapClosing,
  updateTpl = Template.rice_mapClosingUpdate,
  insertTpl = Template.rice_mapClosingInsert;

/**
 * Index
 */

indexTpl.onRendered(function () {
  /* Create new alertify */
  createNewAlertify("mapClosing");
  // SEO
  SEO.set({
    title: 'Map Closing',
    description: 'Description for this page'
  });
});

indexTpl.events({
  'click .insert' () {
    alertify.mapClosing(fa('eyes', 'New Chart'), renderTemplate(insertTpl));
  },
  'click .update': function (e, t) {
    var data = Rice.Collection.MapClosing.findOne(this._id);
    alertify.mapClosing(renderTemplate(updateTpl, data))
      .set({
        title: fa("pencil", "Map Closing")
      });
  },
});

insertTpl.onRendered(function () {
  var list = Rice.List.chartAccountId();
  debugger
  $('[name="chartAccount"]').select2({
    data: list
  })
})
updateTpl.events({
  'submit .preventDef': function (evt) {
    evt.preventDefault();
  }
});


/**
 * Hook
 */
AutoForm.hooks({
  acc_mapClosingUpdate: {
    onSuccess: function (formType, result) {
      alertify.mapClosing().close();
      alertify.success('Success');
    },
    onError: function (formType, error) {
      alertify.error(error.message);
    }
  }
});
