"use strict";

module.exports = {
  getConfig(ctx) {
    ctx.body = strapi.plugin("netlify-deployments").service("config").getConfig();
  },
};
