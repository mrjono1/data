Template.dataDashboard.created = function(){
  this.showEditForm = new ReactiveVar(false);
};

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
  showEditForm: function(){
    return Template.instance().showEditForm.get();
  },
  setFocus: function(){
    Meteor.defer(function () {
      $('#nameInput').focus();
    });
  }
});

Template.dataDashboard.events({
  'submit .d-data-edit-form': function(event, template) {
    event.preventDefault();

    template.showEditForm.set(false);
    
    var record = Meteor.call("dataDashboardsInsertUpdate",
      this._id,
      event.target.nameInput.value,
      event.target.descriptionInput.value);

    if (this._id == 'new') {
      Router.go('/data/' + Session.get('newId'));
    }
  },
  'click .d-data-header-form': function(event, template){
    template.showEditForm.set(true);
  },
  'click .cancel-header-edit-form': function(event, template){
    if (this._id == null || this._id == 'new'){
      window.history.back();
    } else {
    template.showEditForm.set(false);
      //TODO: also need to reload the data helper but not sure how
    }
  },
  'focusout .d-data-edit-form': function (event, template){
    if ($(event.relatedTarget).parents('.d-data-edit-form').length == 1){
      return;
    }
    
    template.showEditForm.set(false);
    
    var record = Meteor.call("dataDashboardsInsertUpdate",
      this._id,
      event.currentTarget.nameInput.value,
      event.currentTarget.descriptionInput.value);

    if (this._id == 'new') {
      Router.go('/data/' + Session.get('newId'));
    }
  }
});