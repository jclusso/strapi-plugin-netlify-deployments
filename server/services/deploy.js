"use strict";

const axios = require("axios").default;
const { buildConfig } = require("./utils");

// axios.interceptors.request.use((request) => {
//   console.log("Starting Request", JSON.stringify(request, null, 2));
//   return request;
// });

/**
 * @typedef {import('../../types/typedefs').RunDeployResponse} RunDeployResponse
 * @typedef {import('../../types/typedefs').CancelDeployResponse} CancelDeployResponse
 * @typedef {import('../../types/typedefs').GetDeploymentsResponse} GetDeploymentsResponse
 */

module.exports = ({ strapi }) => ({
  /**
   * Trigger a deploy
   * @returns {RunDeployResponse}
   */
  async runDeploy(id) {
    try {
      const config = buildConfig(strapi);
      if (!config || !config.sites) {
        throw "missing configuration: sites";
      }
      const buildHook = config.sites.find(site => site.id == id).buildHook;
      console.log(buildHook);
      const response = await axios.post(buildHook);

      if (response?.status != 200) {
        throw new Error(
          `Deployment error. Response: ${JSON.stringify(response)}`
        );
      }

      return true;
    } catch (error) {
      console.error("[netlify-deployments] Error while deploying -", error);
      return {
        error: "An error occurred",
      };
    }
  },

  /**
   * Cancel a deploy
   * @returns {CancelDeployResponse}
   */
  async cancelDeploy(id) {
    try {
      const config = buildConfig(strapi);
      if (!config || !config.accessToken) {
        throw "missing configuration: accessToken";
      }

      const response = await axios.post(
        `https://api.netlify.com/api/v1/deploys/${id}/cancel?access_token=${config.accessToken}`
      );

      if (response?.status != 200) {
        throw new Error(
          `Deployment error. Response: ${JSON.stringify(response)}`
        );
      }

      return true;
    } catch (error) {
      console.error("[netlify-deployments] Error while cancelling deploy -", error);
      return {
        error: "An error occurred",
      };
    }
  },

  /**
   * Fetch the list of deployments from Netlify
   * @returns {GetDeploymentsResponse}
   */
  async getDeployments(id) {
    try {
      const config = buildConfig(strapi);
      if (!config || !config.accessToken) {
        throw "missing configuration: accessToken";
      }

      const params = {  access_token: config.accessToken };

      const response = await axios.get(
        `https://api.netlify.com/api/v1/sites/${id}/deploys`,
        { params, }
      );

      return response.data;
    } catch (error) {
      console.error(
        "[netlify-deployments] Error while fetching deployments -",
        error
      );
      return {
        error: "An error occurred",
      };
    }
  },
});
