/**
 * Index
 */
var indexTpl = Template.cash_chartAccount,
  insertTpl = Template.cash_chartAccountInsert,
  updateTpl = Template.cash_chartAccountUpdate,
  showTpl = Template.cash_chartAccountShow;

indexTpl.onCreated(function() {
  /* Create new alertify */
  // SEO
  SEO.set({
    title: 'chartAccount',
    description: 'chartAccount'
  });
  createNewAlertify("chartAccount");
});

indexTpl.events({
  //'click #get-item':function(){
  //    var arr=[];
  //    $('#item-list tr').each(function(e){
  //        arr.push($(this).find('.item').val());
  //    });

  //},

  'click .insert': function(e, t) {

    alertify.chartAccount(fa('plus', 'Chart of Account'), renderTemplate(
        insertTpl))
      .maximize();

  },
  'click .update': function(e, t) {

    var data = Cash.Collection.ChartAccount.findOne(this._id);
    var name = data.name;
    var n = name.split(" : ");
    //var n = s.words(name, " : ");
    data.name = n[n.length - 1];
    alertify.chartAccount(fa('pencil', 'Chart of Account'),
        renderTemplate(updateTpl, data))
      .maximize();

  },
  'click .remove': function(e, t) {

    var id = this._id;

    alertify.confirm("Are you sure to delete [" + id + "]?")
      .set({
        onok: function(closeEvent) {

          Cash.Collection.ChartAccount.remove(id, function(error) {
            if (error) {
              alertify.error(error.message);
            } else {
              alertify.success("Success");
            }
          });
        },
        title: fa("remove", "Chart of Account")
      });

  },
  'click .show': function(e, t) {

    alertify.chartAccount(fa('eye', 'Chart of Account'), renderTemplate(
      showTpl,
      this));

  }

});
/**
 * Insert
 */
insertTpl.helpers({
  accountTypeOpt: function() {
    if (Session.get('accountTypeId') == null) {
      return Cash.Collection.AccountType.find()
        .map(function(obj) {
          return {
            label: obj._id + " | " + obj.name,
            value: obj._id
          };
        });

    } else {
      var obj = Cash.Collection.AccountType.findOne(Session.get(
        'accountTypeId'));
      return [{
        label: obj._id + " | " + obj.name,
        value: obj._id
      }];
      //return Acc.List.accountType();
    }
  },
  accountTypeValue: function() {
    return Session.get('accountTypeId');
  }
});

insertTpl.events({
  'change #parentId': function() {
    //debugger;
    var parent = Cash.Collection.ChartAccount.findOne($('#parentId').val());
    if (parent == null) {
      Session.set('accountTypeId', null);
    } else {
      Session.set('accountTypeId', parent.accountTypeId);
    }

  }
});
/**
 * Update
 */
updateTpl.helpers({
  accountTypeOpt: function() {
      ///debugger;
      if (Session.get('accountTypeId') == null) {
        return Cash.Collection.AccountType.find()
          .map(function(obj) {
            return {
              label: obj._id + " | " + obj.name,
              value: obj._id
            };
          });

      } else {
        var obj = Cash.Collection.AccountType.findOne(Session.get(
          'accountTypeId'));
        return [{
          label: obj._id + " | " + obj.name,
          value: obj._id
        }];
        //return Acc.List.accountType();
      }
    }
    //accountTypeValue: function () {
    //    return Session.get('accountTypeId');
    //}
});

updateTpl.events({
  'change #parentId': function() {
    var parent = Cash.Collection.ChartAccount.findOne($('#parentId').val());
    if (parent == null) {
      Session.set('accountTypeId', null);
    } else {
      Session.set('accountTypeId', parent.accountTypeId);
      $('#accountTypeId').val(parent.accountTypeId);
    }

  }
});
/**
 * Hook
 */
AutoForm.hooks({
  // Customer
  cash_chartAccountInsert: {
    before: {
      insert: function(doc) {
        var checkParent = Cash.Collection.ChartAccount.findOne({
          code: doc.parentId
        });
        if (checkParent != null) {
          //generate add zero
          doc.code = s.pad($("#code").val(), 5, "0");
          doc.name = checkParent.name + " : " + doc.name;
          doc.level = checkParent.level + 1;
        } else {
          doc.code = s.pad($("#code").val(), 5, "0");
          doc.level = 0;
        }
        doc._id = idGenerator.gen(Cash.Collection.ChartAccount, 5);
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    },
    after: {
      insert: function() {
        $('#accountTypeId').val('');
      }
    }
  },
  cash_chartAccountUpdate: {
    before: {
      update: function(doc) {
        debugger;
        var checkParent = Cash.Collection.ChartAccount.findOne({
          code: doc.$set.parentId
        });
        if (checkParent != null) {
          doc.$set.name = checkParent.name + " : " + doc.$set.name;
        }
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      alertify.chartAccount().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});
