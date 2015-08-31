// Publication
Meteor.publish('rice_customer', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Rice.Collection.Customer.find(selector, {removed: true});
    }
});

Meteor.publish('rice_customerById', function (id) {
    if (this.userId) {
        return Rice.Collection.Customer.find(id, {removed: true});
    }
});
