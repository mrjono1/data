
Session.setDefault("mainContent", "userDashboard");
Session.setDefault("dataContext", {});

Template.mainLayout.helpers({
    mainContent: function () {
      return Template[Session.get("mainContent")];
    },
    dataContext: function(){
      return Session.get("dataContext");
    },
    connected: function() {
      if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
        return Meteor.status().connected;
      } else {
        return true;
      }
    }
});