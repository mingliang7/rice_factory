Meteor.publish 'rice_categories', -> 
	if @userId
		@unblock()
		Rice.Collection.Category.find()