Template.mainMenu.events({});

Template.mainMenu.helpers({});

Meteor.autorun(function () {
  
  // This will autorun when the value of Meteor.userId() changes
  if (Meteor.userId()) {
    // Login
    var current = Router.current();
    
    if (current == null || current.originalUrl == '/' || current.originalUrl == ''){
      //Router.go('/app');
    } else {
      // Loged out
      //Router.go('/');
    }
  } else {
    // Loged out
    //Router.go('/');
  }
});