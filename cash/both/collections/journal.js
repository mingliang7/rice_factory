Cash.Collection.Journal = new Mongo.Collection('cash_journal');
/*
 Schema
 */
Cash.Schema.Journal = new SimpleSchema({

  journalDate: {
    type: String,
    label: "Date",
    defaultValue: function () {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD').format('YYYY-MM-DD');
      return currentDate;
    }
  },
  voucherId: {
    type: String,
    label: "Voucher"
      /*    unique: true,*/
      /*   custom: function () {

       if (this.isInsert) {
       var data = Cash.Collection.Journal.find({
       voucherId: this.value
       });
       if (data.count() > 0) {
       return "uniqueVoucher";
       }
       }

       }*/

  },
  staff: {
    type: String,
    label: "Staff",
    autoform: {
      type: "select2",
      options: function () {
        return Cash.List.staff(false);
      }
    }
  },
  currencyId: {
    type: String,
    label: "Currency",
    autoform: {
      type: "select2",
      options: function () {
        return Cash.List.currency(false);
      }
    }
  },

  branchId: {
    type: String,
    label: "Branch"
  },
  memo: {
    type: String,
    label: "Description",
    optional: true,
    autoform: {
      type: "textarea"
    }
  },
  transaction: {
    type: Array,
    minCount: 1
  },
  'transaction.$': {
    type: Object
  },
  'transaction.$.account': {
    type: String,
    max: 200,
    label: "Account",
    autoform: {
      type: 'selectize',
      options: function () {
        return Cash.List.chartAccountId();

      }
    }
  },

  'transaction.$.amount': {
    type: Number,
    decimal: true,
    optional: true
  },
  total: {
    type: Number,
    decimal: true,
    optional: true
  }

});
Cash.Collection.Journal.attachSchema(Cash.Schema.Journal);
SimpleSchema.messages({
  "uniqueVoucher": "Voucher must be unique."
});
