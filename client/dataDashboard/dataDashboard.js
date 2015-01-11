Template.dataDashboard.helpers({
  data: function() {
    if (this._id == null || this._id == 'new'){
      return {
        _id: this._id,
        name: 'My New System Dashboard',
        description: 'A description of what this system is'
      };
      this.ready();
    } else {
      return DataDashboards.findOne({
        _id: this._id
      });
    }
  },
  entities: function() {
    return Entities.find({
      dataDashboardId: this._id
    });
  },
  showHeaderClickForm: function(){
    return (Session.get('showHeaderClickForm') ? '' : 'hide');
  },
  showHeaderEditForm: function(){
    return (Session.get('showHeaderClickForm') ? 'hide' : '');
  }
});

Template.dataDashboard.events({
  'submit .headerEditForm': function(event, template) {
    event.preventDefault();

    Session.set('showHeaderClickForm', true);
    
    var record = Meteor.call("dataDashboardsInsertUpdate",
      this._id,
      event.target.nameInput.value,
      event.target.descriptionInput.value);

    if (this._id == 'new') {
      Router.go('/data/' + Session.get('newId'));
    }
  },
  'click .headerClickForm': function(event, template){
    Session.set('showHeaderClickForm', false);
  },
  'click .cancel-header-edit-form': function(event, template){
    if (this._id == null || this._id == 'new'){
      window.history.back();
    } else {
      Session.set('showHeaderClickForm', true);
      //TODO: also need to reload the data helper but not sure how
    }
  }
});