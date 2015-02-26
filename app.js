//===================== Version 1.1.0 =========================

/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'InnovaMobi',

    requires: [
        'Ext.MessageBox'
    ],

    views: [
        
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var tokenID = '0';

        var listOfMenus = Ext.create('Ext.List', {
            width: '100%',
            height: '100%',
            cls: 'menu_list',
            itemTpl: '<span class="status {menu_or_invObject}"></span>{Item}',
            items: {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Menus'
            },

            listeners: {
                itemtap: function (listView, index, target, record) {

                    Ext.Ajax.request({
                        url: 'http://localhost/InnovaMVC/menus/list/',
                        method: 'GET',
                        disableCaching: true,

                        params: {
                            token: tokenID,
                            appName: record.data.AppName
                        },

                        callback: function (options, success, response) {
                            if (success == true) {

                                var tmp = Ext.JSON.decode(response.responseText);

                                console.log(tmp);
                                /*listOfApps.setStore({ data: tmp });

                                Ext.Viewport.add(listOfApps);
                                listOfApps.show();*/

                            }
                            else {
                                console.log(response.responseText);
                            }
                        }
                    });
                }
            }
        });

        var listOfApps = Ext.create('Ext.List',{
            width: '100%',
            height: '100%',
            itemTpl: '<span>{AppName}</span>',
            items: {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Available Applications'
            },
            
            listeners: {
                itemtap: function (listView, index, target, record) {
                    
                    Ext.Ajax.request({
                        url: 'http://localhost/InnovaMVC/menus/list/',
                        method: 'GET',
                        disableCaching: true,

                        params: {
                            token: tokenID,
                            appName: record.data.AppName
                        },

                        callback: function (options, success, response) {
                            if (success == true) {

                                var tmp = Ext.JSON.decode(response.responseText);

                                listOfMenus.setStore({ data: tmp });

                                Ext.Viewport.add(listOfMenus);
                                listOfMenus.show();

                            }
                            else {
                                console.log(response.responseText);
                            }
                        }
                    });
                }
            }
        });

        var sheetToolbar = {
            xtype : 'toolbar',
            docked : 'top',
            title : 'Log In Info',
            items : [
                {
                    ui : 'default',
                    text : 'Cancel',
                    handler : function (btn) {
                        btn.up('sheet').hide();
                    }
                },
                {
                    xtype : 'spacer'
                },
                {
                    ui: 'confirm',
                    text: 'Log In',
                    handler: function (btn) {
                        var form = sheet.down('formpanel');

                        form.submit({
                            method:'Get',
                            url: 'http://localhost/InnovaMVC/authentication/authenticate/',
                            success: function (form, response) {
                                if (response['Token'] == "0") {
                                    Ext.Msg.alert('Log In Failed', 'Username or Password are not correct.');
                                    return;
                                }

                                //the user is authenticated.
                                tokenID = response['Token'];

                                Ext.Ajax.request({
                                    url: 'http://localhost/InnovaMVC/applications/list/',
                                    method: 'GET',
                                    disableCaching: true,

                                    params: {
                                        token: tokenID
                                    },

                                    callback: function (options, success, response) {
                                        if (success == true) {
                                            var tmp = Ext.JSON.decode(response.responseText);

                                            listOfApps.setStore({ data: tmp });
                                            
                                            Ext.Viewport.add(listOfApps);
                                            listOfApps.show();

                                        }
                                        else {
                                            console.log(response.responseText);
                                        }
                                    }
                                });

                                btn.up('sheet').hide();
                                
                            },
                            failure: function (form, response) {
                                Ext.Msg.alert('Failure', 'Some error is occurred when log in - ' + response.msg);
                                
                            }
                        });
                    }
                }
            ]
        };

        var sheetForm = {
            xtype: 'formpanel',
            defaults: { labelWidth: 120 },
            items: [
                {
                    xtype: 'textfield',
                    label: 'UserName',
                    name: 'userLoginName'
                },
                {
                    xtype: 'passwordfield',
                    label: 'Password',
                    name: 'pwd'
                }
            ]
        };

        var sheet = Ext.create('Ext.Sheet', {
            layout: 'fit',
            modal: true,
            hideOnMaskTap: false,
            height: 170,
            width: 310,
            items: [
                sheetToolbar,
                sheetForm
            ]
        });

        var mainContainer = Ext.create('Ext.Container', {
            fullscreen: 'true',
            items:[
                
            ]


        });

        mainContainer.items.add(sheet);

        // Initialize the main view
        Ext.Viewport.add(mainContainer);

        sheet.show();

    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
