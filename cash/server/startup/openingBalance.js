Meteor.startup(function() {
  if (Cash.Collection.OpeningClosingBalance.find({
      status: "Opening"
    }).count() == 0) {

    Cash.Collection.OpeningClosingBalance.insert({
      _id: "001",
      date: moment().format('YYYY-MM-DD'),
      value: {
        KHR: 0,
        USD: 0,
        THB: 0
      },
      status: "Opening"
    });
  }
});
