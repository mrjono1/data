Template.applicationLayout.helpers({
    connected: function() {
      if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
        return Meteor.status().connected;
      } else {
        return true;
      }
    }
});