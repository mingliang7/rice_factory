/**
 * Create new custom  alertify
 */
Template.rice_userStaff.onRendered(function () {
    createNewAlertify("userStaff");
});

/**
 * Index
 */
Template.rice_userStaff.events({
    'click .insert': function (e, t) {

        alertify.userStaff(renderTemplate(Template.rice_userStaffInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New UserStaff"
            });

    },
    'click .update': function (e, t) {

        var data = Rice.Collection.UserStaffs.findOne(this._id);

        alertify.userStaff(renderTemplate(Template.rice_userStaffUpdate, data))
            .set({
                title: '<i class="fa fa-pencil"></i> Update Existing UserStaff'
            });

    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    Rice.Collection.UserStaffs.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete UserStaff'
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.rice_userStaffShow, this))
            .set({
                title: '<i class="fa fa-eye"></i> UserStaff Detail'
            });

    }
});

/**
 * Insert
 */


/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    rice_userStaffInsert: {
        before: {
            insert: function (doc) {
                var branchId = Session.get('currentBranch');
                var prefix = branchId + "-";
                doc._id = idGenerator.genWithPrefix(Rice.Collection.UserStaffs, prefix, 3);
                doc.branchId = branchId;
                return doc;
            }
        },
        onSuccess: function (formType, result) {

            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    rice_userStaffUpdate: {
        onSuccess: function (formType, result) {
            alertify.userStaff().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

/**
 * Config date picker
 */
var datePicker = function () {
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);
};
