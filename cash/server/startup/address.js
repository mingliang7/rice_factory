// Address
Meteor.startup(function() {
  if (Cash.Collection.Address.find().count() == 0) {
    Cash.Collection.Address.insert({
      _id: '001',
      name: 'Battambang'
    });
    Cash.Collection.Address.insert({
      _id: '002',
      name: 'Siem Reap'
    });
  }
});
