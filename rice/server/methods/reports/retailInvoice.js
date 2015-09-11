Meteor.methods({
	retailInvoice: function(id) {
		var getOrder = Rice.Collection.Sale.findOne(id);
		var convertDate = moment(getOrder.saleDate).format('YYYY-MM-DD HH:mm:ss');
		var splitDate = convertDate.split(' ');
		var date = splitDate[0];
		var time = splitDate[1];
		var data = {
			title: {},
			header: {},
			content: [],
			footer: [],
		};

		/********* Title *********/
		var company = Cpanel.Collection.Company.findOne();
		data.title = {
			company: company.khName,
			address: company.khAddress,
			telephone: company.telephone
		};

		/********* Header ********/

		// var getGroup = Ice.Collection.OrderGroup.findOne({_id: getOrder.groupId, iceCustomerId: getOrder.customerId, startDate: {$lt: getOrder.endDate}, endDate:{$gt: getOrder.startDate}});
		// dueDate = '' + getGroup.startDate + '-' + getGroup.endDate;

		var exchange = Cpanel.Collection.Exchange.findOne(getOrder.exchange);
		fx.base = exchange.base;
		fx.rates = exchange.rates;
		data.header = {
			id: getOrder._id,
			staffName: getOrder._staff.name,
			customerName: getOrder._customer.name,
			date: date,
			time: time,
			exchange: '1R = ' + exchange.rates.USD +
				'$ = ' + exchange.rates.THB + 'B'
		};

		/********* Content & Footer *********/
		var content = [];
		var itemsDetail = getOrder.saleItems;
		itemsDetail.forEach(function(item) {
			item.price = formatKH(item.price);
			item.amount = formatDollar(item.amount);
			item.discount = item.discount === undefined || item.discount === 0 ? '' :
				item.discount + '%';
			content.push(item);
		});
		content.push(itemsDetail);
		if (content.length > 0) {
			data.content = content;
			data.footer = {
				subTotal: formatKH(getOrder.subTotal),
				subDiscount: getOrder.subDiscount === undefined ? '' : getOrder.subDiscount,
				total: formatKH(getOrder.total),
				totalInDollar: formatDollar(
					fx.convert(getOrder.total, {
						from: 'KHR',
						to: 'USD'
					})
				),
				totalInBath: formatKH(
					fx.convert(getOrder.total, {
						from: 'KHR',
						to: 'THB'
					})
				),
				paidAmount: formatKH(getOrder.paidAmount),
				outstandingAmount: formatKH(getOrder.outstandingAmount)
			};
			console.log(data);
			return [data];
		} else {
			data.content.push({
				index: 'no results'
			});
			return data;
		}
	}
});
var formatDollar = function(value) {
	return numeral(value).format('0,0.00');
};
var formatKH = function(value) {
	return numeral(value).format('0,0');
};
