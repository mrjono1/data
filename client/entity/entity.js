Template.entity.created = function(){
  this.showEditForm = new ReactiveVar(false);
};

Template.entity.helpers({
  data: function(){
    if (this._id == 'new'){
      return {dataDashboardId : this.dataDashboardId};
    } else {
      return Entities.findOne({_id: this._id});
    }
  },
  properties: function() {
    return Properties.find({entityId: this._id});
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

Template.entity.events({
  'submit .d-entity-edit-form': function(event, template) {
    event.preventDefault();

    template.showEditForm.set(false);
    
    var record = {_id :this._id,
      dataDashboardId: this.dataDashboardId,
      name: event.target.nameInput.value,
      description: event.target.descriptionInput.value};
    
    record = Meteor.call("entitiesInsertUpdate", record);

    if (this._id == 'new') {
      Router.go('/data/' + this.dataDashboardId + '/'+ Session.get('newId'));
    }
  },
  'click .d-entity-header-form': function(event, template){
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
  'focusout .d-entity-edit-form': function (event, template){
    if ($(event.relatedTarget).parents('.d-entity-edit-form').length == 1){
      return;
    }

    template.showEditForm.set(false);
    
    var record = {
      _id: this._id,
      dataDashboardId: this.dataDashboardId,
      name: event.currentTarget.nameInput.value,
      description: event.currentTarget.descriptionInput.value
    };
    
    record = Meteor.call("entitiesInsertUpdate", record);

    if (this._id == 'new') {
      Router.go('/data/' + this.dataDashboardId + '/'+ Session.get('newId'));
    }
  }
});