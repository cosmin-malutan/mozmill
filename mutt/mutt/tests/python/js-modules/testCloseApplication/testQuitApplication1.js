/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at http://mozilla.org/MPL/2.0/. */

Cu.import("resource://gre/modules/Services.jsm");

var frame = {};   Cu.import('resource://mozmill/modules/frame.js', frame);

function setupModule() {
  persisted.state = {
    finished: [],
    previous: "",
    next: ""
  };
}

function setupTest(aModule) {
  aModule.controller = mozmill.getBrowserController();
}

var testOne = function () {
  persisted.state.finished.push("testOne");
  persisted.state.previous = "testOne";
  persisted.state.next = "testTwo";

  // Add event listener to wait until the view has been loaded
  var self = { loaded: false };
  function onViewLoaded() { self.loaded = true; }

  controller.window.document.addEventListener("ViewChanged",
                                              onViewLoaded, false);

  try {
    controller.mainMenu.click("#menu_openAddons");
    assert.waitFor(function () {
      return self.loaded;
    }, "Selected category has been loaded.", 30000);
  }
  finally {
    controller.window.document.removeEventListener("ViewChanged",
                                                   onViewLoaded, false);
  }
  controller.tabs.activeTab.defaultView.close();
}

