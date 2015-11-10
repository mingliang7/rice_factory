Meteor.methods({
  migrate: function() {
    var journal = Cash.Collection.Journal.find().fetch();

    journal.forEach(function(obj) {
      Cash.Collection.Journal.remove(obj._id);

      obj.journalDate = moment(obj.journalDate).format('YYYY-MM-DD');
      Cash.Collection.Journal.insert(obj);
    });



    return true;
  }
});
