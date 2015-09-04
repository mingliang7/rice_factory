Meteor.startup(function () {
    if (Rice.Collection.Customer.find().count() == 0) {
        console.log('Fixtures is running...');

        // Address
        for (var i = 1; i <= 500; i++) {
            var addressId = idGenerator.gen(Rice.Collection.Address, 4);
            Rice.Collection.Address.insert({
                _id: addressId,
                name: faker.address.city()
            });

            // Customer
            for (var j = 1; j <= 10; j++) {
                var customerId = idGenerator.genWithPrefix(Rice.Collection.Customer, '001-', 6);

                var data = {
                    _id: customerId,
                    name: faker.name.findName(),
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
});
