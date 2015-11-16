/**
 * List
 */
Cash.ListForReport = {
    branch: function () {
        var list = [];
        list.push({label: "(Select All)", value: "All"});
        Cpanel.Collection.Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    exchange: function () {
        var list = [];
       var  baseCurrency = Cpanel.Collection.Setting.findOne().baseCurrency;
        list.push({label: "(Select One)", value: ""});
        Cpanel.Collection.Exchange.find({base: baseCurrency},{sort: {_id: -1}})
            .forEach(function (obj) {
                list.push({label: moment(obj.exDate).format("DD-MM-YYYY")+ ' | ' + JSON.stringify(obj.rates), value: obj._id});
            });

        return list;
    }
};
