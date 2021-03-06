/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at http://mozilla.org/MPL/2.0/. */

const BASE_URL = collector.addHttpResource("../_files/");
const TEST_DATA = BASE_URL + "link.html";

var setupModule = function () {
  controller = mozmill.getBrowserController();

  urlbar = new elementslib.ID(controller.window.document, "urlbar");
}

var test = function () {
  controller.open(TEST_DATA);
  controller.waitForPageLoad();

  let link = new elementslib.ID(controller.tabs.activeTab, "link");
  controller.waitForElement(link);
  link.dragToElement(urlbar);
  controller.waitForPageLoad();

  let div = new elementslib.ID(controller.tabs.activeTab, "test-div");
  controller.assertNode(div);
}
