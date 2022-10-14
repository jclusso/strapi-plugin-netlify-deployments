import axios from "./axiosInstance";
import pluginId from "../pluginId";

/**
 * @typedef {import('../../../types/typedefs').PluginConfig} PluginConfig
 * @typedef {import('../../../types/typedefs').RunDeployResponse} RunDeployResponse
 * @typedef {import('../../../types/typedefs').CancelDeployResponse} CancelDeployResponse
 * @typedef {import('../../../types/typedefs').GetDeploymentsResponse} GetDeploymentsResponse
 */

/**
 * Start a deploy
 * @returns {Promise<RunDeployResponse>}
 */
export const runDeploy = async (id) => {
  try {
    const data = await axios(`/${pluginId}/sites/${id}/deploy/run`, { method: "GET" });
    return data.data;
  } catch (error) {
    console.error("[netlify-deployments] Error while running a deploy -", error);
    throw error;
  }
};

/**
 * Cancel a deploy
 * @returns {Promise<CancelDeployResponse>}
 */
export const cancelDeploy = async (id) => {
  try {
    const data = await axios(`/${pluginId}/deploy/${id}/cancel`, { method: "POST" });
    return data.data;
  } catch (error) {
    console.error("[netlify-deployments] Error while cancelling a deploy -", error);
    throw error;
  }
};

/**
 * Fetch and return plugin config
 * @returns {Promise<PluginConfig>}
 */
export const getConfig = async () => {
  try {
    const response = await axios(`/${pluginId}/config`, { method: "GET" });
    return response.data;
  } catch (error) {
    console.error("[netlify-deployments] Error while fetching configs -", error);
    throw error;
  }
};

/**
 * Fetch and return Deployments info
 * @returns {Promise<GetDeploymentsResponse>}
 */
export const getDeployments = async (siteId) => {
  try {
    const response = await axios(`/${pluginId}/sites/${siteId}/deploy/list`, { method: "GET" });
    return response.data;
  } catch (error) {
    console.error(
      "[netlify-deployments] Error while fetching deployments list -",
      error
    );
    throw error;
  }
};
