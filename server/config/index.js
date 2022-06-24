"use strict";

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
 */

module.exports = {
  default: {},
  /**
   *
   * @param {PluginConfigMap} config
   */
  validator(config) {
    if (config.buildHook && typeof config.buildHook !== "string") {
      throw new Error("Config property `buildHook` has to be a string");
    }
    if (config.accessToken && typeof config.accessToken !== "string") {
      throw new Error("Config property `accessToken` has to be a string");
    }
    if (config.siteId && typeof config.siteId !== "string") {
      throw new Error("Config property `siteId` has to be a string");
    }
  },
};
