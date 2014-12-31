Meteor.subscribe('dataDashboards');

Template.userDashboard.helpers({
  dataDashboards: function() {
    return DataDashboards.find({});
  }
});