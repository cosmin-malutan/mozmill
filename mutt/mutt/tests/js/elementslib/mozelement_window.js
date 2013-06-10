/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at http://mozilla.org/MPL/2.0/. */

const BASE_URL = collector.addHttpResource("../_files/");
const TEST_DATA = BASE_URL + "form.html";

// Bug 677364:
// Fix controller keyboard methods to allow a null parameter for the target element

var setupModule = function (aModule) {
  aModule.controller = mozmill.getBrowserController();

  aModule.win = new elementslib.MozMillElement("Elem", controller.window);
}

var testContent = function () {
  controller.open(TEST_DATA);
  controller.waitForPageLoad();

  let textbox = new elementslib.ID(controller.tabs.activeTab, "fname");

  // Focus the textbox
  textbox.click(textbox);

  // A key event sent to the window will be propagated to the
  // currently active element.
  win.keypress("t");
  expect.equal(textbox.getNode().value, "t",
               "keypress added letter to textbox.");
}

var testChrome = function () {
  let urlbar = new findElement.ID(controller.window.document, "urlbar");

  // Focus the location bar
  urlbar.click(urlbar);

  // A key event sent to the window will be propagated to the
  // currently active element.
  win.keypress("t", { });
  expect.equal(urlbar.getNode().value, "t",
               "keypress added letter to location bar.");
}
