"use strict";

const getPluginConfig = require("../helpers/pluginConfig");

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
 */

/**
 * Truncates sensitive strings
 * @param {String} info
 */
const truncateSensitiveString = (string, truncate = true) => {
  if (string.length) {
    const redacted = Array.from(Array(string.length - 6)).map(() => { return "·" }).join('')
    return (truncate ? `${redacted}${string?.slice(-6)}` : string);
  } else {
    return string;
  }
}

/**
 * Build config map object
 * @returns {PluginConfigMap}
 */
const buildConfig = (strapi, hideSensitiveInfo = false) => {
  const pluginConfig = getPluginConfig(strapi);

  return {
    accessToken: truncateSensitiveString(pluginConfig("accessToken"), hideSensitiveInfo),
    sites: pluginConfig("sites"),
  };
};

module.exports = { buildConfig, };
