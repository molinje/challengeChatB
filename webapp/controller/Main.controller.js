sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, DateFormat) {
        "use strict";

        return Controller.extend("molinje.basfchat.controller.Main", {
            onInit: function () {

            },
            onListPress: function (oEvent) {
                //Every time we select a contact, we take the contact details and photo
                var phoneSelect = oEvent.getParameters("listItem").listItem.getProperty("description");
                var imageContact = oEvent.getParameters("listItem").listItem.getProperty("icon");
                var nameContact = oEvent.getParameters("listItem").listItem.getProperty("title");
                //We read sent and received messages
                var sendMessg = this.getView().getModel("sendMsg").getData();
                var receiMessg = this.getView().getModel("receiMsg").getData();
                var ListMessageFilt = [];
                var ModelMessg = new JSONModel({}, true);
                // Read messg send to  select contact
                if (sendMessg !== undefined && sendMessg.length > 0 && phoneSelect !== undefined && phoneSelect !== "") {

                    for (var i = 0; i < sendMessg.length; i++) {

                        if (phoneSelect == sendMessg[i].phone) {


                            //we take the date string
                            var  strDate = sendMessg[i].date;
                            // separate the date from the time
                            var [dateComponents, timeComponents] = strDate.split('T');
                           
                            //we take each of the parts of the date and time
                            var [day, month, year] = dateComponents.split('/');
                            var [hours, minutes] = timeComponents.split(':');
                            const seconds = "00";
                            //We build variable with date and time
                            const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
                            
                            var messageitem = {
                                //"date": sendMessg[i].date,
                                "date": date,
                                "delivered": sendMessg[i].delivered,
                                "id": sendMessg[i].id,
                                "me": "Me",
                                "phone": sendMessg[i].phone,
                                "read": sendMessg[i].read,
                                "sent": sendMessg[i].sent,
                                "text": sendMessg[i].text,
                                "imageContact": "",
                                "type": "s"
                            };

                            ListMessageFilt.push(messageitem);



                        }

                    }
                }
                // Read messg received from  select contact
                if (receiMessg !== undefined && receiMessg.length > 0 && phoneSelect !== undefined && phoneSelect !== "") {

                    for (var j = 0; j < receiMessg.length; j++) {

                        if (phoneSelect == receiMessg[j].phone) {

                            const str = receiMessg[j].date;

                            const [dateComponents, timeComponents] = str.split('T');
                            console.log(dateComponents); // 👉️ "22/04/2022"
                            console.log(timeComponents); // 👉️ "07:30:16"

                            const [day, month, year] = dateComponents.split('/');
                            const [hours, minutes] = timeComponents.split(':');
                            const seconds = "00";

                            const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
                            console.log(date); // 👉️ Fri Apr 22 2022 07:30:16

                            var messageitem = {
                                //"date": receiMessg[j].date,
                                "date": date,
                                "delivered": "",
                                "id": receiMessg[j].id,
                                "me": "",
                                "phone": receiMessg[j].phone,
                                "read": "",
                                "sent": "",
                                "text": receiMessg[j].text,
                                "imageContact": imageContact,
                                "type": "r"
                            };

                            ListMessageFilt.push(messageitem);
                        }

                    }
                }


                //we update the list of messages of the selected contact
                ModelMessg.setData(ListMessageFilt);
                this.getView().setModel(ModelMessg, "ModelMessg");
                this.getView().getModel("ModelMessg").refresh(true);
                this.getView().byId("inputMessg").setVisible(true);


            },
            onPostMessg: function(OEvent){
                var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
                var oDate = new Date();
                var sDate = oFormat.format(oDate);
                // create new entry
                var sValue = OEvent.getParameter("value");
                var ListMessageFilt = this.getView().getModel("ModelMessg").getData();
                var ModelMessg = new JSONModel({}, true);

                var messageitem = {
                    //"date": sendMessg[i].date,
                    "date": oDate,
                    "delivered": "",
                    "id": sDate,
                    "me": "Me",
                    "phone": "",
                    "read": "",
                    "sent": "",
                    "text": sValue,
                    "imageContact": "",
                    "type": "s"
                };

                ListMessageFilt.push(messageitem);
                ModelMessg.setData(ListMessageFilt);
                this.getView().setModel(ModelMessg, "ModelMessg");
                this.getView().getModel("ModelMessg").refresh(true);
            }
        });
    });
