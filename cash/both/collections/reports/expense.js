/**
 * Schema
 */
Cash.Schema.ExpenseReport = new SimpleSchema({
  branchId: {
    type: String,
    label: "Branch",
    max: 100,
    defaultValue: "All",
    autoform: {
      type: "select2",
      options: function() {
        return Cash.ListForReport.branch();
      }
    }
  },
  currencyId: {
    type: String,
    label: "Currency",
    autoform: {
      type: "select2",
      defaultValue: "All",
      options: function() {
        return Cash.List.currency();
      }
    }
  },
  date: {
    type: String,
    label: "Date",
    defaultValue: function() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var currentDate = year + '-' + month + '-' + 01 + " To " + year +
        '-' + month + '-' + 28;
      return currentDate;
    }
  },
  exchangeDate: {
    type: String,
    label: "Exchange Date",
    autoform: {
      type: "select2",
      options: function() {
        return Cash.ListForReport.exchange();
      }
    }

  },
  chartAccount: {
    type: String,
    label: "Chart Account",
    autoform: {
      type: "select2",
      defaultValue: "All",
      options: function() {
        var list = [];
        list.push({
          label: "(Select All)",
          value: "All"
        });
        var doc = Cash.Collection.ChartAccount.find({
          accountTypeId: "50"
        });
        doc.forEach(function(obj) {
          list.push({
            label: obj.code + " | " + obj.name,
            value: obj._id
          })
        });
        return list;
      }
    }
  }
});
