/***** Before */
Rice.Collection.Staffs.after.insert(function (userId, doc) {
  Meteor.defer(function () {
    Meteor._sleepForMs(1500);
    Meteor.call('createCashStaff', doc);
  });
});

Rice.Collection.Staffs.after.update(function (userId, doc) {
  Meteor.defer(function () {
    Meteor._sleepForMs(1500);
    Meteor.call('updateCashStaff', doc);
  });
});


Rice.Collection.Staffs.after.remove(function (userId, doc) {
  Meteor.defer(function () {
    Meteor._sleepForMs(1500);
    Meteor.call('removeCashStaff', doc._id);
  });
});
