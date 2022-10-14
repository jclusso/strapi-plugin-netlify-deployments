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
    if (config.accessToken && typeof config.accessToken !== "string") {
      throw new Error("Config property `accessToken` has to be a string");
    }
    if (config.sites && typeof config.sites !== "object") {
      throw new Error("Config property `sites` has to be an object")
    }
  },
};
