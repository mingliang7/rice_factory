  ReportInfo = {
    customerName: function(id) {
      if (id == 'All' || id == '') {
        return 'All';
      } else {
        var customer = Rice.Collection.Customer.findOne(id);
        return customer._id + ' | ' + customer.name;
      }
    },
    branchName: function(id) {
      var branch = Cpanel.Collection.Branch.findOne(id);
      return branch;
    },
    readbleExchange: function(id) {
      var exchange = Cpanel.Collection.Exchange.findOne(id);
      return 'KHR: ' + exchange.rates.KHR + ', USD: ' + exchange.rates.USD +
        ', THB: ' + exchange.rates.THB;
    }

  };
