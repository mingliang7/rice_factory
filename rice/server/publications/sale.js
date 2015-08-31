// Publication
Meteor.publish('rice_saleByCustomer', function (customerId) {
    if (this.userId) {
        return Rice.Collection.Sale.find({customerId: customerId}, {removed: true});
    }
});
