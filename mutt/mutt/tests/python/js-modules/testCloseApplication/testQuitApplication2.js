/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at http://mozilla.org/MPL/2.0/. */

function setupTest(aModule) {
  aModule.controller = mozmill.getBrowserController();
}

var testTwo = function () {
  assert.equal(persisted.state.previous, "testOne",
               "First test passed before test two.");

  persisted.state.finished.push("testTwo");
  persisted.state.previous = "testTwo";
  persisted.state.next = "testThree";

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

  controller.restartApplication("testThree");
}

var testThree = function () {
  assert.equal(persisted.state.previous, "testTwo",
               "Test two ran before test three.");

  persisted.state.finished.push("testThree");
  persisted.state.previous = "testThree";
  persisted.state.next = "testFour";
  controller.restartApplication("testFour");
}

var testFour = function () {
  assert.equal(persisted.state.previous, "testThree",
               "Test three ran before test four.");
  assert.equal(persisted.state.next, "testFour",
               "Test that must be ran now is 'testFour'");

  persisted.state.finished.push("testFour");
  persisted.state.previous = "testFour";
  controller.stopApplication(true);
}
