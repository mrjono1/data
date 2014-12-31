Meteor.publish('dataDashboards', function() {
  return DataDashboards.find({});
});