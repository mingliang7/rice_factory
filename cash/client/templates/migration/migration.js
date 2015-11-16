Template.cash_navbar.events({
    'click .migration': function (e, t) {
        Meteor.call("migrate", function (error) {
            if (error) {
                alertify.error(error.message);
            } else {
                alertify.success("Success");
            }

        });

    }
});