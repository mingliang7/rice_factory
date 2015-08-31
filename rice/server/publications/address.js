// Publication
Meteor.publish('rice_address', function () {
    if (this.userId) {
        this.unblock();
        return Rice.Collection.Address.find({}, {removed: true});
    }
});
