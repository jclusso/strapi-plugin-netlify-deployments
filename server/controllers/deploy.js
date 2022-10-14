"use strict";

module.exports = {
  async runDeploy(ctx) {
    const { id } = ctx.params;
    const response = await strapi
      .plugin("netlify-deployments")
      .service("deploy")
      .runDeploy(id);

    if (response.error) {
      return ctx.internalServerError(`Server error: ${response.error}`);
    }

    ctx.body = response;
  },
  async cancelDeploy(ctx) {
    const { id } = ctx.params;
    const response = await strapi
      .plugin("netlify-deployments")
      .service("deploy")
      .cancelDeploy(id);

    if (response.error) {
      return ctx.internalServerError(`Server error: ${response.error}`);
    }

    ctx.body = response;
  },
  async getDeployments(ctx) {
    const { id } = ctx.params;
    const response = await strapi
      .plugin("netlify-deployments")
      .service("deploy")
      .getDeployments(id);

    if (response.error) {
      return ctx.internalServerError(`Server error: ${response.error}`);
    }

    ctx.body = response;
  },
};
