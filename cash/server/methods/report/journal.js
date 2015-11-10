Meteor.methods({
  acc_journalReport: function(params) {
    var data = {
      title: {},
      header: {},
      content: [{
        index: 'No Result'
      }],
      footer: {}
    };

    var date = s.words(params.date, ' To ');
    var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
    var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();

    /****** Title *****/
    data.title = Cpanel.Collection.Company.findOne();

    /****** Header *****/
    data.header = params;

    /****** Content *****/
    var content = [];
    var selector = {};



    var self = params;
    var date = self.date.split(" To ");
    /* if (!_.isEmpty(self.date)) {
     selector.journalDate = {$gte:new Date(date[0]),$lte: new Date(date[1])};
     }*/
    if (!_.isEmpty(self.date)) {
      selector.journalDate = {
        $gte: moment(date[0]).format('YYYY-MM-DD'),
        $lte: moment(date[1]).format('YYYY-MM-DD')
      };
    }


    if (self.currencyId != "All") {
      selector.currencyId = self.currencyId;
    }
    if (self.branchId != "All") {
      selector.branchId = self.branchId;
    }
    var i = 1;
    var journal = Cash.Collection.Journal.find(selector, {
      sort: {
        journalDate: 1
      }
    }).fetch();
    var grandTotal = 0;
    journal.forEach(function(j) {
      grandTotal += j.total;
      // j.parent = journal;
      j.order = i;
      i++;
      content.push(j);
    });
    data.grandTotal = grandTotal;
    if (content.length > 0) {
      data.content = content;
    }
    return data;
  }
});
