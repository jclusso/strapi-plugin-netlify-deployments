module.exports = [
  {
    method: "GET",
    path: "/sites/:id/deploy/run",
    handler: "deploy.runDeploy",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/deploy/:id/cancel",
    handler: "deploy.cancelDeploy",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/config",
    handler: "config.getConfig",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/sites/:id/deploy/list",
    handler: "deploy.getDeployments",
    config: {
      policies: [],
    },
  },
];
