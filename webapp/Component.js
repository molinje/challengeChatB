/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "molinje/basfchat/model/models",
    'sap/ui/model/json/JSONModel'
],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("molinje.basfchat.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                var oContactsModel;
                var oSendMsgModel;
                var oReceibMsgModel;
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                // set models contact and messages
                oContactsModel = new JSONModel(sap.ui.require.toUrl('molinje/basfchat/mockdata/chatsSet.json'));
                oContactsModel.setSizeLimit(1000);
                this.setModel(oContactsModel, 'contacts');

                oSendMsgModel = new JSONModel(sap.ui.require.toUrl('molinje/basfchat/mockdata/SentMessagesSet.json'));
                oSendMsgModel.setSizeLimit(1000);
                this.setModel(oSendMsgModel, 'sendMsg');

                oReceibMsgModel = new JSONModel(sap.ui.require.toUrl('molinje/basfchat/mockdata/ReceivedMessagesSet.json'));
                oReceibMsgModel.setSizeLimit(1000);
                this.setModel(oReceibMsgModel, 'receiMsg');

            }
        });
    }
);