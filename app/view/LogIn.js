Ext.define('InnovaMobi.view.LogIn', {
    extend: 'Ext.Container',
    xtype: 'login',
    requires: [
        'Ext.Toolbar'
    ],
    fullscreen: true,
    config: {
        items: [
            {
                xtype: 'panel',
                width: '100%',
                height: '100%',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'panel',
                        height: 170,
                        width: '100%',
                        draggable: false,
                        floating: false,
                        style: 'border: 1px solid black;',
                        
                        items: [
                            {
                                xtype: 'toolbar',
                                docked: 'top',
                                title: 'Log In'
                            },
                            {
                                xtype: 'textfield',
                                label: 'User Name',
                                style: 'font-size: 70%;'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Password',
                                style: 'font-size: 70%;'
                            },
                            {
                                xtype: 'toolbar',
                                docked: 'bottom',
                                items:[
                                    {
                                        xtype: 'button',
                                        text: 'Submit',
                                        //to-do: add on click handler.
                                    },
                                    {
                                        xtype: 'spacer'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Cancel'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        
        ]
    }
});
