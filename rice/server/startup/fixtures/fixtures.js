Meteor.startup(function() {
  if (Rice.Collection.Customer.find().count() == 0) {
    console.log('Fixtures is running...');

    // Address
    for (var i = 1; i <= 100; i++) {
      var addressId = idGenerator.gen(Rice.Collection.Address, 4);
      Rice.Collection.Address.insert({
        _id: addressId,
        name: faker.address.city()
      });

      // Customer
      for (var j = 1; j <= 10; j++) {
        var customerId = idGenerator.genWithPrefix(Rice.Collection.Customer,
          '001-', 4);

        var data = {
          _id: customerId,
          name: faker.name.findName(),
          type: 'local',
          gender: Fake.fromArray(['M', 'F']),
          addressId: addressId,
          telephone: faker.phone.phoneNumber(),
          status: 'enabled',
          email: faker.internet.email(),
          photo: '',
          branchId: '001'
        };
        Rice.Collection.Customer.insert(data);
      }
    }

    console.log('Fixtures is ready');

  }
  if (Rice.Collection.Supplier.find().count() == 0) {
    console.log('Fixtures is running...');

    // Address
    for (var i = 1; i <= 100; i++) {
      var addressId = idGenerator.gen(Rice.Collection.Address, 4);
      Rice.Collection.Address.insert({
        _id: addressId,
        name: faker.address.city()
      });

      // Customer
      for (var j = 1; j <= 10; j++) {
        var supplierId = idGenerator.genWithPrefix(Rice.Collection.Supplier,
          '001-', 4);

        var supplierData = {
          _id: supplierId,
          name: faker.name.findName(),
          gender: Fake.fromArray(['M', 'F']),
          addressId: addressId,
          telephone: faker.phone.phoneNumber(),
          status: 'enabled',
          email: faker.internet.email(),
          photo: '',
          branchId: '001'
        };

        Rice.Collection.Supplier.insert(supplierData);
      }
    }

    console.log('Fixtures is ready');
  }

});
