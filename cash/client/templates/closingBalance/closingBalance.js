/**
 * Index
 */

var indexTpl = Template.cash_closingBalance,
    insertTpl = Template.cash_closingBalanceInsert,
    updateTpl = Template.cash_closingBalanceUpdate,
    showTpl = Template.cash_closingBalanceShow;


//Render
insertTpl.onRendered(function () {
    /*setTimeout(function(){*/
    datePicker();
    disableDate();
    closingValue(moment().format("YYYY-MM-DD"));
    /*  },500);*/


});
updateTpl.onRendered(function () {
    datePicker();
    disableDate();
    closingValue(moment().format("YYYY-MM-DD"));
});
indexTpl.onRendered(function () {
    /* Create new alertify */
    SEO.set({
        title: 'closingBalance',
        description: 'closingBalance'
    });
    createNewAlertify("closingBalance");
    closingValue(moment().toDate());
});

//Helper
/*indexTpl.helpers({
 selector: function () {
 return {status: "Closing"};
 }
 });*/


//Event
insertTpl.events({

    'blur #dateClosing': function (e, t) {
        closingValue($(e.currentTarget).val());
    }
    /*  ,'change #currencyId': function (e, t) {
     disableDate($(e.currentTarget).val());
     var value = content($("#dateClosing").val(), $("#currencyId").val());
     $('#valueClosing').val(value);
     }*/
});
updateTpl.events({

    'blur #dateClosing': function (e, t) {
        closingValue($(e.currentTarget).val());
    }
    /*  ,
     'change #currencyId': function (e, t) {
     disableDate($(e.currentTarget).val());
     var value = content($("#dateClosing").val(), $("#currencyId").val());
     $('#valueClosing').val(value);
     }*/
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.closingBalance(fa("plus", "Closing Balance"), renderTemplate(
            insertTpl));
    },
    'click .update': function (e, t) {
        var data = Cash.Collection.OpeningClosingBalance.findOne(this._id);
        var openingBalance = Cash.Collection.OpeningClosingBalance.findOne({}, {
            sort: {
                date: -1
            }
        });
        if (openingBalance.status != "Closing" || (data.status == "Closing" &&
            data.date >= openingBalance.date)) {
            alertify.closingBalance(fa("pencil", "Closing Balance"),
                renderTemplate(updateTpl, data));
            if (openingBalance.status == "Opening") {
                $('input[name="value.KHR"]').attr('readonly', false);
                $('input[name="value.USD"]').attr('readonly', false);
                $('input[name="value.THB"]').attr('readonly', false);
            }
        } else {
            alertify.warning("Can not Update! You already closing balance!!!")
        }


    },
    'click .remove': function (e, t) {

        var id = this._id;
        var data = Cash.Collection.OpeningClosingBalance.findOne(this._id);
        var openingBalance = Cash.Collection.OpeningClosingBalance.findOne({}, {
            sort: {
                date: -1
            }
        });
        if (data.status == "Closing" && data.date >= openingBalance.date) {
            alertify.confirm("Are you sure to delete [" + id + "]?")
                .set({
                    onok: function (closeEvent) {
                        Cash.Collection.OpeningClosingBalance.remove(id, function (error) {
                            if (error) {
                                alertify.error(error.message);
                            } else {
                                alertify.success("Success");
                            }
                        });
                    },
                    title: fa("remove", "Closing Balance")
                });
        } else {
            alertify.warning("Can not Remove! This is Opening balance!!!")
        }

    },
    'click .show': function (e, t) {

        alertify.closingBalance(fa("eye", "Closing Balance"), renderTemplate(
            showTpl, this));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    cash_closingBalanceInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                doc.status = "Closing";
                doc._id = idGenerator.genWithPrefix(Cash.Collection.OpeningClosingBalance,
                    prefix, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.closingBalance().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    cash_closingBalanceUpdate: {
        onSuccess: function (formType, result) {
            alertify.closingBalance().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});


// Function
var temp = "",
    disableDate = function () {
        var getLastClosing = Cash.Collection.OpeningClosingBalance.findOne({}, {
            sort: {
                date: -1
            }
        })
        var dateVal = moment(getLastClosing.date).add(1, "days").toDate();
        $("#dateClosing").data('DateTimePicker').minDate(dateVal);
    },
    datePicker = function () {
        var dob = $('[name="date"]');
        DateTimePicker.date(dob);
    },
    closingValue = function (dateClosing) {
        /*var valueKHR = content(dateClosing, "KHR");
         var valueUSD = content(dateClosing, "USD");
         var valueTHB = content(dateClosing, "THB");*/

        Meteor.call('content', dateClosing, "KHR", function (e, r) {
            $('input[name="value.KHR"]').val(r);
        })
        Meteor.call('content', dateClosing, "USD", function (e, r) {
            $('input[name="value.USD"]').val(r);
        })
        Meteor.call('content', dateClosing, "THB", function (e, r) {
            $('input[name="value.THB"]').val(r);
        })
    };