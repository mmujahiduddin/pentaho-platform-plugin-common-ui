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
  "pentaho/type/String",
  "pentaho/type/mixins/Enum",
  "pentaho/i18n!../i18n/model"
], function (module, PentahoString, EnumMixin, bundle) {

  "use strict";

  return PentahoString.extend({
    $type: {
      id: module.id,
      mixins: [EnumMixin],
      domain: ["up", "down"]
    }
  })
  .localize({$type: bundle.structured.WaterDirection})
  .configure();
});
