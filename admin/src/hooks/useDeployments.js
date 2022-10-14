import { useEffect, useState } from "react";

import { useInterval } from "./useInterval";
import { getDeployments } from "../utils/api";

/**
 * @typedef {import('../../../types/typedefs').Deployment} Deployment
 * @typedef {import('../../../types/typedefs').DeploymentState} DeploymentState
 * @typedef {import('../../../types/typedefs').DeploymentsFetched} DeploymentsFetched
 */

const INTERVAL_DELAY = 1000;

/** @type {DeploymentState[]} */
const finalStates = ["error", "ready"];

/**
 * @param {Deployment[]} deployments
 * @returns {boolean}
 */
const containsNonFinalState = (deployments) => {
  const nonFinalStateIndex = deployments.findIndex(
    (d) => !finalStates.includes(d.state)
  );
  return nonFinalStateIndex >= 0;
};

/**
 * Fetch and return the list of deployments
 * @param {boolean} isPolling
 * @returns {[Boolean, Deployment[], Boolean]} [isLoading, deployments, hasError]
 */
export function useDeployments(isPolling, siteId, setPolling) {
  /** @type {Deployment[]} */
  const initialDeployments = [];
  const [deployments, setDeployments] = useState(initialDeployments);
  const [hasError, setHasError] = useState(false);
  const [isLoadingDeployments, setIsLoadingDeployments] = useState(true);

  /** @param {Deployment[]} deployments */
  const triggerCallback = (deployments) => {
    setPolling(containsNonFinalState(deployments));
  };

  const clearDeployments = () => {
    setDeployments([]);
    setIsLoadingDeployments(true);
    setPolling(false);
  }

  const fetchDeployments = () => {
    getDeployments(siteId)
      .then((response) => {
        setDeployments(response);
        triggerCallback(response);
      })
      .catch((error) => {
        console.error(
          "[netlify-deployments] error while retrieving deployments",
          error
        );
        setHasError(true);
        setDeployments([]);
        triggerCallback([]);
      })
      .finally(() => {
        setIsLoadingDeployments(false);
      });
  };

  useEffect(() => {
    if (!isPolling && deployments.length === 0) fetchDeployments();
  }, [isPolling, deployments]);

  const delay = isPolling ? INTERVAL_DELAY : null;
  useInterval(() => { fetchDeployments(); }, delay);

  return [isLoadingDeployments, deployments, hasError, clearDeployments];
}
