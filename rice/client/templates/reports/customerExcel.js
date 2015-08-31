/**
 * Declare template
 */
var formTpl = Template.rice_customerExcelReport;

/**
 * Form
 */
formTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

/**
 * Hook
 */
AutoForm.hooks({
    rice_customerExcelReport: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {

            console.log(insertDoc);

            Meteor.call('rice_customerExcel', insertDoc, function (err, fileUrl) {

                console.log(fileUrl);

                var link = document.createElement("a");
                link.download = 'Customer.xlsx';
                link.href = fileUrl;
                link.click();
            });

            return false;

        }
    }
});
