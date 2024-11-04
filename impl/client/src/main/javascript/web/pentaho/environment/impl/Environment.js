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

define([
  "pentaho/util/url",
  "pentaho/util/domWindow"
], function(url, domWindow) {

  "use strict";

  /* eslint new-cap: 0 */

  /**
   * @alias Environment
   * @memberOf pentaho.environment.impl
   *
   * @class
   * @implements {pentaho.environment.IEnvironment}
   *
   * @classDesc The `Environment` class is an implementation of
   * the [IEnvironment]{@link pentaho.environment.IEnvironment} interface.
   *
   * @constructor
   * @description Creates an environment given its specification.
   *
   * Any absent or `undefined`-valued properties assume the values of the given default specification, if any,
   * or `null`, if none.
   *
   * @param {pentaho.environment.spec.IEnvironment} [spec] The environment specification.
   * @param {pentaho.environment.spec.IEnvironment} [defaultSpec] The environment specification
   * from which unspecified or `undefined` `spec` properties are initialized.
   */
  function pentaho_environment_impl_Environment(spec, defaultSpec) {

    if(!spec) spec = {};

    this.application = readVar(spec, "application", defaultSpec);
    this.theme  = readVar(spec, "theme", defaultSpec);

    /* From http://www.ietf.org/rfc/bcp/bcp47.txt

     2.1.1.  Formatting of Language Tags

     At all times, language tags and their subtags, including private use
     and extensions, are to be treated as case insensitive: there exist
     conventions for the capitalization of some of the subtags, but these
     MUST NOT be taken to carry meaning.

     Thus, the tag "mn-Cyrl-MN" is not distinct from "MN-cYRL-mn" or "mN-
     cYrL-Mn" (or any other combination), and each of these variations.
    */
    var locale = readVar(spec, "locale", defaultSpec);
    if(locale) {
      // Java sends these non BCP-47 conforming separators.
      locale = locale.replace(/[_/]/, "-");

      // Validate that it is a valid locale; discard, otherwise.
      // TODO: The current testing environment, PhantomJS, does not support `Intl`.
      // TODO: IE11 also does not support `Intl.Locale`...
      if((typeof Intl !== "undefined") && Intl.Locale) {
        try {
          // eslint-disable-next-line no-new
          new Intl.Locale(locale);
        } catch(error) {
          locale = null;
        }
      }
    }

    this.locale = locale && locale.toLowerCase();

    var propSpec = readVar(spec, "user");
    var propSpecDef = readVar(defaultSpec, "user");
    this.user = Object.freeze({
      id:   readVar(propSpec, "id", propSpecDef),
      home: readVar(propSpec, "home", propSpecDef)
    });

    // URL missing on IE11 and on PhantomJS 2.0
    propSpec = readVar(spec, "server");
    propSpecDef = readVar(defaultSpec, "server");
    this.server = Object.freeze({
      // href
      // protocol
      // pathname
      root: url.create(readVar(propSpec, "root", propSpecDef)),
      packages: url.create(readVar(propSpec, "packages", propSpecDef)),
      services: url.create(readVar(propSpec, "services", propSpecDef))
    });

    this.reservedChars = readVar(spec, "reservedChars", defaultSpec);

    // Not very friendly for subclasses, but this class is not designed to be subclassed by others.
    Object.freeze(this);
  }

  var proto = pentaho_environment_impl_Environment.prototype = /** @lends pentaho.environment.impl.Environment# */{
    createChild: function(childSpec) {
      return new pentaho_environment_impl_Environment(childSpec, this.toSpec());
    },

    toSpec: function() {
      return {
        application: this.application,
        theme: this.theme,
        locale: this.locale,
        user: {
          id: this.user.id,
          home: this.user.home
        },
        server: {
          root: this.server.root && this.server.root.href,
          packages: this.server.packages && this.server.packages.href,
          services: this.server.services && this.server.services.href
        },
        reservedChars: this.reservedChars
      };
    }
  };

  proto.toJSON = proto.toSpec;

  return pentaho_environment_impl_Environment;

  function readVar(spec, name, defaultSpec) {
    return (spec && spec[name]) || (defaultSpec && defaultSpec[name]) || null;
  }

});
