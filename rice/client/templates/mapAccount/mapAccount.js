var indexTpl = Template.rice_mapAccount,
  updateTpl = Template.rice_mapAccountUpdate,
  insertTpl = Template.rice_mapAccountInsert;

/**
 * Index
 */

indexTpl.onRendered(function () {
  /* Create new alertify */
  createNewAlertify("mapAccount");
  // SEO
  SEO.set({
    title: 'Map Closing',
    description: 'Description for this page'
  });
});

indexTpl.events({
  'click .insert' () {
    alertify.mapAccount(fa('eyes', 'New Chart'), renderTemplate(insertTpl));
  },
  'click .update': function (e, t) {
    var data = Rice.Collection.MapClosing.findOne(this._id);
    alertify.mapAccount(renderTemplate(updateTpl, data))
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
  rice_mapAccountInsert: {
    onSuccess: function (formType, result) {
      alertify.success('Successfully Insert');
    },
    onError: function (formType, err) {
      alertify.error(err.message);
    }
  },
  rice_mapAccountUpdate: {
    onSuccess: function (formType, result) {
      alertify.mapAccount().close();
      alertify.success('Success');
      console.log(result);
    },
    onError: function (formType, error) {
      alertify.error(error.message);
    }
  }
});
