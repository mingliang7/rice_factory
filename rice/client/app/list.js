// List
Rice.ListState = new ReactiveObj();
Rice.List = {
    gender: function() {
        var list = [];
        list.push({
            label: "(Select One)",
            value: ""
        });
        list.push({
            label: 'Male',
            value: 'M'
        });
        list.push({
            label: 'Female',
            value: 'F'
        });
        return list;
    },
    customer: function() {
        var list = [];
        list.push({
            label: "(Select One)",
            value: ""
        });
        Rice.Collection.Customer.find({status: 'enabled'}).forEach(function(obj) {
            list.push({
                label: obj._id + ' : ' + obj.name,
                value: obj._id
            });
        });
        return list;
    },
    status: function() {
        var list = [];
        list.push({
            label: "(Select One)",
            value: ""
        });
        list.push({
            label: 'Enabled' ,
            value: 'enabled'
        });
        list.push({
            label: 'Disabled',
            value: 'disabled'
        });
        return list;
    },
    position: function(selectOne) {
        var list;
        list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({
                label: "(Select One)",
                value: ""
            });
        }
        list.push({
            label: 'Seller',
            value: 'seller'
        });
        list.push({
            label: 'Cashier',
            value: 'cashier'
        });
        list.push({
            label: 'Accountant',
            value: 'accountant'
        });
        list.push({
            label: 'Admin',
            value: 'admin'
        });
        list.push({
            label: 'Manager',
            value: 'manager'
        });
        return list;
    }
};