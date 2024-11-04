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
  "pentaho/type/SpecificationScope"
], function(SpecificationScope) {

  "use strict";

  /* global it:false, expect:false, JSON:false */

  return {
    fillSpec: fillSpec,
    itFillSpecAttribute: itFillSpecAttribute,
    itFillSpecMethodAttribute: itFillSpecMethodAttribute
  };

  function fillSpec(BaseInstCtor, spec, typeSpec, keyArgs) {
    var derivedType = BaseInstCtor.extend({$type: typeSpec}).type;

    var scope = new SpecificationScope();

    var result = derivedType._fillSpecInContext(spec, keyArgs || {});

    scope.dispose();

    return result;
  }

  function stringify(value) {
    if(value && value.toTestString) return value.toTestString();
    if(typeof value === "function") return String(value);
    return JSON.stringify(value);
  }

  function getPath(o, steps) {
    var i = -1;
    var L = steps.length;
    while(++i < L) if(!(o = o[steps[i]])) break;
    return o;
  }

  function hasPath(o, steps) {
    var i = -1;
    var L = steps.length;
    while(++i < L) {
      if(!o || !(steps[i] in o)) return false;
      o = o[steps[i]];
    }

    return true;
  }

  function setPath(o, steps, v) {
    var i = -1;
    var j = steps.length - 1;
    while(++i < j) {
      var u = o[steps[i]];
      o = u || (o[steps[i]] = {});
    }

    o[steps[j]] = v;
  }

  function itFillSpecAttribute(getBaseInstCtor, name, valueIn, result, valueOut) {
    var msg;
    if(result) {
      if(arguments.length < 5) valueOut = valueIn;

      msg = "should serialize as " + stringify(valueOut) + " when value is " + stringify(valueIn);
    } else {
      msg = "should not serialize when value is " + stringify(valueIn);
    }

    var steps = name.split(".");

    it(msg, function() {
      var typeSpec = {};

      if(!valueIn || !valueIn.omitDeclaration) {
        setPath(typeSpec, steps, valueIn);
      }

      var spec = {};
      var actualResult = fillSpec(getBaseInstCtor(), spec, typeSpec);

      // console.log(JSON.stringify(spec));

      expect(actualResult).toBe(result);

      if(result) {
        expect(hasPath(spec, steps)).toBe(true);
        expect(getPath(spec, steps)).toBe(valueOut);
      } else {
        expect(hasPath(spec, steps)).toBe(false);
      }
    });
  }

  function itFillSpecMethodAttribute(getBaseInstCtor, name) {

    var valueNoBase = function() {};
    valueNoBase.toTestString = function() { return "'method that does not call base'"; };

    itFillSpecAttribute(getBaseInstCtor, name, valueNoBase, true);

    // ---

    var valueCallsBase = function() { return this.base.apply(this, arguments); };

    valueCallsBase.toTestString = function() { return "'method that calls base'"; };

    itFillSpecAttribute(getBaseInstCtor, name, valueCallsBase, true);

    // ---

    var valueInherited = {
      omitDeclaration: true,
      toTestString: function() { return "'method inherited'"; }
    };

    itFillSpecAttribute(getBaseInstCtor, name, valueInherited, false);
  }

});

