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

define([
  "pentaho/module!_",
  "./BarAbstract",
  "./_trends"
], function(module, BaseView) {

  "use strict";

  // "pentaho/visual/models/Bar",

  return BaseView.extend(module.id, {
    _supportsTrends: true
  })
  .implement(module.config);
});
