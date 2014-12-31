Template.dataDashboard.helpers({
    
});

Template.dataDashboard.events({
    'submit': function(event, template) {
        event.preventDefault();
        
        var record = {
            name: template.$('#nameInput').val(),
            description: template.$('#descriptionInput').val()
        };
        
        if(this._id == null){
            record._id = DataDashboards.insert(record);
            Session.set("dataContext", record);
            Session.set("mainContent", "dataDashboard");
        }else {
            DataDashboards.update(this._id, {$set: record});
        }
    }
});