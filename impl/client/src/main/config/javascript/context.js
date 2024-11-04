/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2024 by Hitachi Vantara, LLC : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2028-08-13
 ******************************************************************************/


var requireCfg = {
  paths: {},
  shim: {},
  map: {
    "*": {}
  },
  bundles: {},
  config: {
    "pentaho/modules": {}
  },
  packages: []
};

// Override common-ui configuration to avoid default basePath
var ENVIRONMENT_CONFIG = {
  paths: {
    "common-ui": "."
  }
};
