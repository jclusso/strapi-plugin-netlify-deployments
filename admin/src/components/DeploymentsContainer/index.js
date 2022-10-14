/**
 *
 * DeploymentsContainer
 *
 */

import React, { useState } from 'react';
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";
import { Box } from "@strapi/design-system/Box";

import { useDeployments } from "../../hooks/useDeployments";
import DeploymentsEmptyState from "../DeploymentsEmptyState";
import DeploymentsList from "../DeploymentsList";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";
import { Typography } from "@strapi/design-system/Typography";

/**
 * @typedef {import('./typedefs').Deployment} Deployment
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays the of deployments
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsContainer = ({ sites, site, isPolling, setPolling }) => {
  const labelLoader = useFormattedMessage("deployments-container.loader");
  const [currentSite, setCurrentSite] = useState({});

  const [isLoadingDeployments, deployments, hasDeploymentsError, clearDeployments] =
    useDeployments(isPolling, site.id, setPolling);

  if (currentSite.id !== site.id) {
    clearDeployments(currentSite);
    setCurrentSite(site);
  }

  const hasEmptyDeployments = !deployments || deployments?.length <= 0;

  if (isLoadingDeployments && hasEmptyDeployments) {
    return (
      <Flex justifyContent="center">
        <Loader>{labelLoader}</Loader>
      </Flex>
    );
  }

  if (hasDeploymentsError) {
    return <DeploymentsEmptyState type="ERROR_DEPLOYMENTS" />;
  }

  if (hasEmptyDeployments) {
    return <DeploymentsEmptyState type="MISSING_DEPLOYMENTS" />;
  }

  return <>
    {sites.length > 1 ? (<Box paddingBottom={4}>
      <Typography variant="beta">{site.name}</Typography>
    </Box>) : null}
    <DeploymentsList deployments={deployments} isPolling={isPolling} />
  </>;
};

export default DeploymentsContainer;
