Router.configure({
  layoutTemplate: 'applicationLayout',
  loadingTemplate: 'loading'
})
Router.onBeforeAction('loading');
//Router.plugin('loading', {loadingTemplate: 'Loading'});

Router.route('/', function(){
  //this.layout('applicationLayout');
  
  this.render('home');
});

Router.route('/app', function(){
  
  if (Meteor.userId()){
    this.render('userDashboard');
    this.render('userDashboardMenu', {to: 'mainMenuOptions'});
  } else {
    this.render('home');
    this.render(null, {to: 'mainMenuOptions'})
  }
}, {
  waitOn: function () {
    return Meteor.subscribe('dataDashboards');
  }
});

Router.route('/data/:_id', function() {
  
  if (Meteor.userId()){
    
    Session.set('showHeaderClickForm', (this.params._id != 'new'));
    
    this.render('dataDashboard', {
      data: {
        _id: this.params._id
      }
    });
    this.render('dataDashboardMenu', {
      to: 'mainMenuOptions',
      data: {
        _id: this.params._id
      }
    });
  
  } else {
    this.render('home');
    this.render(null, {to: 'mainMenuOptions'})
  }
  
}, {
  waitOn: function () {
    return Meteor.subscribe('dataDashboards');
  }
});

Router.route('/data/:dataDashboardId/:_id', function() {
   
  if (Meteor.userId()){
    
    Session.set('showHeaderClickForm', (this.params._id != 'new'));
    
    this.render('entity', {
      data: {
        _id: this.params._id,
        dataDashboardId: this.params.dataDashboardId
      }
    });
    this.render('entityMenu', {
      to: 'mainMenuOptions',
      data: {
        _id: this.params._id,
        dataDashboardId: this.params.dataDashboardId
      }
    });
  
  } else {
    this.render('home');
    this.render(null, {to: 'mainMenuOptions'})
  }
}, {
  waitOn: function () {
    return [
      Meteor.subscribe('entities'), 
      Meteor.subscribe("properties", {
        entityId: this.params._id
      })
    ];
  }
});
