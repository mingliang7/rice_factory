Meteor.methods({
  createCashStaff: function (doc) {
    Cash.Collection.Staff.insert(doc);
  },
  updateCashStaff: function (doc) {
    var id = doc._id;
    delete doc._id;
    console.log(doc);
    Cash.Collection.Staff.update(id, {
      $set: doc
    });
  },
  removeCashStaff: function (id) {
    Cash.Collection.remove(id);
  }
});
