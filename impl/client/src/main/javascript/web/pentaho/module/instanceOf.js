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
  "./impl/ServicePlugin"
], function(ServicePlugin) {

  "use strict";

  /**
   * The `pentaho/module/instanceOf!` module is an AMD/RequireJS loader plugin
   * that allows loading a module which provides an instance of a specified type.
   *
   * **AMD Plugin Usage**: `"pentaho/module/instanceOf!{typeId}"`
   *
   * 1. `{typeId}` — The identifier or alias of the type of the desired instance.
   *
   * **Example**
   *
   * The following AMD/RequireJS configuration registers two instances,
   * `mine/homeScreen` and `yours/proHomeScreen`,
   * of the abstract type `IHomeScreen`:
   *
   * ```js
   * require.config({
   *   config: {
   *     "pentaho/modules": {
   *       "IHomeScreen":         {base: null, isVirtual: true},
   *       "mine/homeScreen":     {type: "IHomeScreen"},
   *       "yours/proHomeScreen": {type: "IHomeScreen", ranking: 2}
   *     }
   *   }
   * });
   * ```
   *
   * Later, some other component can request for a registered instance of the type `IHomeScreen`:
   *
   * ```js
   * define(["pentaho/module/instanceOf!IHomeScreen"], function(homeScreen) {
   *
   * });
   * ```
   *
   * The highest ranking instance is chosen.
   *
   * @name instanceOf
   * @memberOf pentaho.module
   * @type {IAmdLoaderPlugin}
   * @amd pentaho/module/instanceOf
   *
   * @see pentaho.module.service
   * @see pentaho.module.IService#getInstanceOfAsync
   */

  return new ServicePlugin(function(moduleService, moduleId) {
    return moduleService.getInstanceOfAsync(moduleId);
  });
});
