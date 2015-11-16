var indexTpl = Template.cash_journal;
var insertTpl = Template.cash_journalInsert;
var updateTpl = Template.cash_journalUpdate;
var transactionTpl = Template.transaction;
var showTpl = Template.cash_journalShow;

var staffAddonTpl = Template.cash_staffInsert;

var customArray = Template.afArrayField_customArray;
indexTpl.onCreated(function () {
    SEO.set({
        title: 'journal',
        description: 'journal'
    });
    createNewAlertify(['journal', 'staffAddon', 'addressAddon','journalShow']);

});

showTpl.helpers({
    formatMoney: function (val) {
        return numeral(val).format('0,0.00');
    },
    getChartAccount: function (val) {
        return Cash.Collection.ChartAccount.findOne({
            _id: val
        }).name;
    }
});

insertTpl.onRendered(function () {
    $('input[name="voucherId"]').attr('maxlength', '6');
    datePicker();
    disableDate();
});
updateTpl.onRendered(function () {
    $('input[name="voucherId"]').attr('maxlength', '6');
    datePicker();
    disableDate();
});


var disableDate = function () {

    var getLastClosing = Cash.Collection.OpeningClosingBalance.findOne({}, {
        sort: {
            date: -1
        }
    });
    var dateVal = moment(getLastClosing.date).add(1, "days").toDate();
    $("#journalDate").data('DateTimePicker').minDate(dateVal);
}


insertTpl.events({
    'keypress #voucherId,.transaction-amount': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 ||
        charCode > 57));
    }
    ,
    'click .insertMethod': function (evt) {
        var data = {};
        var transaction = [];

        data.voucherId = "1";
        data.staff = "001-002";
        data.currencyId = "USD";
        data.memo = "Test";
        data.total = 49;

        transaction.push({
            account: "00001",
            amount: 45
        });
        transaction.push({
            account: "00002",
            amount: 405,
        });


        var branchId = "001";
        debugger;
        Meteor.call('journalEntry', data,transaction, branchId);
    }
});
updateTpl.events({
    'keypress #voucherId,.transaction-amount': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 ||
        charCode > 57));
    }, 'click .save-journal': function (evt) {
        evt.preventDefault();
    }
})

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.journal(fa("plus", "Transaction"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Cash.Collection.Journal.findOne({
            _id: this._id
        });
        data.voucherId = data.voucherId.slice(8);
        var openingBalance = Cash.Collection.OpeningClosingBalance.findOne({}, {
            sort: {
                date: -1
            }
        });

        if (data.journalDate > openingBalance.date) {

            alertify.journal(fa("pencil", "Transaction"), renderTemplate(
                updateTpl, data))
                .maximize();
        } else {
            alertify.warning("Can not Update! You already closing balance!!!")
        }
    },
    'click .remove': function (e, t) {
        var self = this;
        var data = Cash.Collection.Journal.findOne({
            _id: this._id
        });

        var openingBalance = Cash.Collection.OpeningClosingBalance.findOne({}, {
            sort: {
                date: -1
            }
        });
        if (data.journalDate > openingBalance.date) {

            alertify.confirm(
                fa("remove", "Transaction"),
                "Are you sure to delete [" + self._id + "]?",
                function (e, t) {
                    Cash.Collection.Journal.remove(self._id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    })
                }, null
            )
        } else {
            alertify.warning("Can not Remove! You already closing balance!!!")
        }
    },
    'click .show': function (e, t) {
        var data = Cash.Collection.Journal.findOne({
            _id: this._id
        });
        /*alertify.alert(renderTemplate(showTpl, data))
            .set({
                title: fa("eye", "Transaction")
            })*/

            alertify.journalShow(fa('eye', 'Journal'), renderTemplate(
                showTpl,
                data));
    }
});


insertTpl.events({
    'click .staffAddon': function (e, t) {
        alertify.staffAddon(fa("plus", "Staff"), renderTemplate(staffAddonTpl))
    }
});

updateTpl.events({
    'click .staffAddon': function (e, t) {
        alertify.staffAddon(fa("plus", "Staff"), renderTemplate(staffAddonTpl));
    }
});


// Config date picker
var datePicker = function () {
    var dob = $('[name="journalDate"]');
    DateTimePicker.date(dob);
};


AutoForm.hooks({
    cash_journalInsert: {
        before: {
            insert: function (doc) {

                var currentBranch = Session.get("currentBranch");
                var date = moment(journalDate).format("YYMM");
                var prefix = currentBranch + "-" + date;
                doc._id = idGenerator.genWithPrefix(Cash.Collection.Journal,
                    prefix, 6);
                doc.branchId = Session.get("currentBranch");

                var year = moment(journalDate).format("YYYY");

                doc.voucherId = currentBranch + "-" + year + s.pad($(
                        '[name="voucherId"]').val(), 6, "0");
                doc.total = $('#total-amount').val();
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    cash_journalUpdate: {
        before: {
            update: function (doc) {
                if ($('#total-amount').val() != "") {
                    doc.$set.total = $('#total-amount').val();
                }
                var currentBranch = Session.get("currentBranch");
                var year = moment(journalDate).format("YYYY");
                doc.$set.voucherId = currentBranch + "-" + year + s.pad($(
                        '[name="voucherId"]').val(), 6, "0");
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.journal().close();
            alertify.success("Success");
        },
        onError: function (formTupe, error) {
            alertify.error(error.message);
        }
    }
});
transactionTpl.events({
    'keyup .transaction-amount': function (e, t) {
        calculateAmount();
    }
});


function calculateAmount() {
    var amounts = 0;
    $('#transaction-list tr').each(function (e) {
        var amount = $(this).find('.transaction-amount').val() == "" ? 0 :
            parseFloat($(this).find('.transaction-amount').val());
        amounts += amount;

    });

    $('#total-amount').val(amounts);

}
customArray.events({
    'click .del': function () {
        setTimeout(function () {
            calculateAmount();
        }, 300)
    }
});
