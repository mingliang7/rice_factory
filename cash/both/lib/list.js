/**
 * List
 */
Cash.List = {
    gender: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }

        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    address: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }

        Cash.Collection.Address.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },


    parent: function (selector) {
        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [{label: "(Select One)", value: ""}];
        Cash.Collection.ChartAccount.find(selector)
            .forEach(function (obj) {
                var accountType = Cash.Collection.AccountType.findOne(obj.accountTypeId).name;
                list.push({label: obj.code + " | " + obj.name + " | " + accountType, value: obj.code})
            });
        return list;
    },
    accountType: function (selector) {
         var selector = _.isUndefined(selector) ? {} : selector;
        var list = [{label: "(Select One)", value: ""}];
        Cash.Collection.AccountType.find(selector)
            .forEach(function (obj) {
                list.push({label: obj._id + " | " + obj.name, value: obj._id})
            });
        return list;
        //}
    },

    staff: function (selectAll) {
        var list=[];
        if(!_.isEqual(selectAll,false)){
            list.push({label: "Select All", value: "All"});
        }
        if(_.isEqual(selectAll,false)){
            list.push({label: "(Select One)", value: ""});
        }
        Cash.Collection.Staff.find()
            .forEach(function (obj) {
                list.push({label: obj._id + " | " + obj.name, value: obj._id})
            });
        return list;
    },
    chartAccountId: function (selector) {
        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [{label: "(Select One)", value: ""}];
        Cash.Collection.ChartAccount.find(selector)
            .forEach(function (obj) {
                var accountType = Cash.Collection.AccountType.findOne(obj.accountTypeId).name;
                list.push({
                    label: obj.code + " | " + obj.name + " | " + accountType, value: obj._id
                })
            });
        return list;
    },
    currency: function(selectAll){
        var list=[];
        if(!_.isEqual(selectAll,false)){
            list.push({label: "Select All",value: "All"});
        }

        if(_.isEqual(selectAll,false)){
            list.push({label: "(Select One)",value: ""});
        }

        Cash.Collection.Currency.find()
            .forEach(function(obj){
                list.push({label: obj._id,value: obj._id});
            });
        return list;
    }

};
