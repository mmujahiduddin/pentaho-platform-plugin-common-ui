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
  "../lang/Base",
  "../util/arg"
], function(Base, arg) {

  return Base.extend("pentaho.data._OfAttribute", {
    constructor: function(keyArgs) {
      this._attr = arg.required(keyArgs, "attribute");
    },

    // region IOfAttribute implementation
    get attribute() { return this._attr; }
    // endregion
  });
});
