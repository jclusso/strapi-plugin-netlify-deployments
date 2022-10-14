/**
 * @namespace typedefs
 */

/**
 * Info about an error
 * @typedef {Object} ErrorResponseData
 */

/**
 * Plugin config
 * @typedef {Object} PluginConfig
 * @property {PluginConfigMap} data Plugin config root property
 */

/**
 * Plugin config map
 * @typedef {Object} PluginConfigMap
 * @property {?string} accessToken Access token for the Netlify user. Plugin config: `accessToken`
 * @property {?string} sites Array of Sites to manage with Netlify deployments. Plugin config: `sites`
 */

/**
 * Run deploy response
 * @typedef {Object} RunDeployResponse
 * @property {RunDeployData} data
 * @property {ErrorResponseData} error Object containing the error, if any
 */

/**
 * Info about the run deploy action
 * @typedef {Object} RunDeployData
 * @property {string} deployJobId
 */

/**
 * @typedef {Object} GetDeploymentsResponse
 * @property {Deployment[]} deployments
 * @property {ErrorResponseData} error Object containing the error, if any
 */

/**
 * @typedef {Object} Deployment
 * @property {string} uid The unique identifier of the deployment.
 * @property {string} name The name of the deployment.
 * @property {string} url The URL of the deployment.
 * @property {number} created Timestamp of when the deployment got created.
 * @property {DeploymentState} state In which state is the deployment.
 * @property {string} inspectorUrl Netlify URL to inspect the deployment.
 */

/**
 * This list is taken from https://open-api.netlify.com/#tag/deploy
 * @typedef {"BUILDING"|"ERROR"|"INITIALIZING"|"QUEUED"|"READY"|"CANCELED"} DeploymentState
 */

/**
 * Callback to notify that the list of deployments has been fetched
 * @callback DeploymentsFetched
 * @param {boolean} hasNonFinalState This is true when at least one of the deployments is not in final a state
 * @returns {void}
 */

exports.unused = {};
