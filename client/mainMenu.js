Template.mainMenu.events({
    'click .addDS': function () {
        Session.set("dataContext", {});
        Session.set("mainContent", "dataDashboard");
    },
    'click .userDashboard': function () {
        Session.set("mainContent", "userDashboard");
    }
});