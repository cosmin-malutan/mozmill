# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, you can obtain one at http://mozilla.org/MPL/2.0/.

import os
import unittest

import manifestparser
import mozmill


class TestQuitApplication(unittest.TestCase):

    def do_test(self, manifest_path=None,
                passes=0, fails=0, skips=0):

        abspath = os.path.dirname(os.path.abspath(__file__))
        manifestpath = os.path.join(abspath, manifest_path)
        manifest = manifestparser.TestManifest(manifests=[manifestpath], strict=False)
        tests = manifest.active_tests()

        m = mozmill.MozMill.create()
        m.run(tests)
        results = m.finish(())

        self.assertEqual(len(results.passes), passes, "Passes should match")
        self.assertEqual(len(results.fails), fails, "Fails should match")
        self.assertEqual(len(results.skipped), skips, "Skips should match")

        return (results, m.persisted)

    def test_quit_application(self):
        testpath = os.path.join("js-modules", "testCloseApplication", "manifest.ini")
        results, persisted = self.do_test(manifest_path=testpath, passes=4)
        self.check_persisted(persisted=persisted)

    def check_persisted(self, persisted=None):
        """check that everything had been ran correctly"""
        expected_test = ["testOne", "testTwo", "testThree", "testFour"]

        self.assertEqual(persisted["state"]["finished"], expected_test,
                         "All tests have been ran")

        self.assertEqual(persisted["state"]["previous"], "testFour",
                         "The last test that have been ran is 'testFour")

if __name__ == '__main__':
    unittest.main()
