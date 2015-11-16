/***** Before */
Rice.Collection.Staffs.after.insert(function (userId, doc) {
  Meteor.defer(function () {
    Meteor._sleepForMs(1500);
    Meteor.call('createCashStaff', doc);
  });
});
