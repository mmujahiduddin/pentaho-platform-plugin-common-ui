/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2024 by Hitachi Vantara, LLC : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2029-07-20
 ******************************************************************************/


/**
 * Runs the project's unit tests using karma.
 *
 * Unit tests are AMD JS modules whose name ends with `"Spec"`.
 * Also, they're assumed to be located under the special project folder: `"test-js/unit"`.
 * The content of this folder is made accessible under the `"tests"` AMD id.
 * You don't strictly need to use this id, as you can use relative module ids to refer
 * to other utility test modules.
 *
 * This function configures AMD using the global variable `requireCfg`, if defined.
 *
 * @see http://karma-runner.github.io/0.10/plus/requirejs.html
 */
(function() {
  "use strict";

  /* globals require, requireCfg, KARMA_DEBUG, __karma__, console, DEV_SPEC_FILTER */

  /* eslint dot-notation: 0 */

  // Karma serves files from '/base'

  // Javascript Tests source files
  requireCfg.paths["tests"] = baseTest;

  // ----------------

  if(KARMA_DEBUG) console.log("requireCfg: " + JSON.stringify(requireCfg));

  require.config(requireCfg);

  // Ask Require.js to load all spec modules and then start test run.
  require(getSpecModuleIds(), __karma__.start);

  /**
   * Filters `*.spec.js` files from `__karma__.files` and
   * loads these as AMD modules, under the `tests` root amd id.
   *
   * If files were loaded by AMD as js files (and not AMD modules),
   * it would not be possible to use relative module ids for referring to
   * sibling test utility modules.
   *
   * If the configuration variable `DEV_SPEC_FILTER` is defined,
   * its used to filter detected specification files further.
   *
   * If the configuration variable `KARMA_DEBUG` is set to `true`,
   * information about detected spec files is written to the console.
   *
   * @return {string[]} An array of test spec module ids.
   */
  function getSpecModuleIds() {
    var reSpec = new RegExp("^" + baseTest + "/(.+?)\\.spec\\.js$");
    var specs = [];
    var m;

    for(var file in __karma__.files)
      if((m = reSpec.exec(file)) && (!DEV_SPEC_FILTER || DEV_SPEC_FILTER.test(m[1])))
        specs.push("tests/" + m[1] + ".spec"); // prefix with the "tests" module id.

    if(KARMA_DEBUG) console.log("all detected spec module ids: ", specs);

    return specs;
  }

})();
