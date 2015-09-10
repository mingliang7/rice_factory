Rice.TabularTable.UserStaffs = new Tabular.Table({
    name: "riceUserStaffList",
    collection: Rice.Collection.UserStaffs,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.rice_userStaffAction
        },
        {data: "_id", title: "ID"},
        {
            data: "userId",
            title: "User",
            render: function(val) {
                return findUser(val);
            }
        },
        {
            data: "staffIds", title: "Staffs",
            render: function (val, type, doc) {
                return JSON.stringify(findStaffName(val));
            }
        },
        {data: "branchId", title: "Branch"},

    ],
    order: [['0', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    pagingType: "full_numbers",
    autoWidth: false
});

findUser = function(id) {
    user = Meteor.users.findOne(id);
    return user.username;
};

findStaffName = function(ids){
    var arr = [];
    for(var i = 0; i < ids.length; i++){
        arr.push(Rice.Collection.Staffs.findOne(ids[i]).name);
    }
    return arr;
};
