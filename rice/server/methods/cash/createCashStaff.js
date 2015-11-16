Meteor.methods({
  createCashStaff: function (doc) {
    Cash.Collection.Staff.insert(doc);
  }
});
