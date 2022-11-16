/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"molinje/basf_chat/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
