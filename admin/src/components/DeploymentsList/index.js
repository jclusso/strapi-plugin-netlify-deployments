/**
 *
 * DeploymentsList
 *
 */

import React from "react";
import { Table, Thead, Tbody, Tr, Td, Th, Typography, Tooltip, LinkButton, Badge } from "@strapi/design-system";
import { ExternalLink, Layer } from "@strapi/icons";
import CancelDeployButton from "../CancelDeployButton";
import FormattedMessage from "../FormattedMessage";
import getTranslation from "../../utils/getTranslation";
import State from "../State";

const finalStates = ["error", "ready"];

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import("../../../../types/typedefs").DeploymentState} DeploymentState
 */

const getDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const getState = (entry) => {
  if (entry?.error_message?.indexOf('Canceled build') >= 0) {
    return 'canceled'
  } else if (entry?.error_message?.indexOf('Skipped') >= 0) {
    return 'skipped'
  } else {
    return entry.state;
  }
}

/**
 * @param {DeploymentBranch} deploymentBranch
 * @returns {string} Strapi color
 */
const getBranchColor = (deploymentBranch) => {
  switch (deploymentBranch) {
    case "main":
    case "master":
      return "danger700";

    default:
      return "neutral700";
  }
};

/**
 * @param {DeploymentBranch} deploymentBranch
 * @returns {string} Strapi color
 */
const getBranchBackgroundColor = (deploymentBranch) => {
  switch (deploymentBranch) {
    case "main":
    case "master":
      return "danger100";

    default:
      return "neutral100";
  }
};

const formatDeployTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`
}

const truncateTitle = (title) => {
  if (title == undefined) return title;
  if (title.length > 50) {
    return `${title.substring(0, 50)}...`
  } else {
    return title;
  };
}

/**
 * Displays the table with the deployments
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsList = ({ deployments }) => {
  const ROW_COUNT = deployments.length + 1;
  const COL_COUNT = 5;

  const headerFontVariant = "sigma";
  const cellTextColor = "neutral800";

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
      <Thead>
        <Tr>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.branch"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.title"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.state"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.duration"
            />
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.time"
            />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {deployments.map((entry) => {
          const state = getState(entry);

          return(
            <Tr key={entry.id}>
              <Td>
                <Badge
                  textColor={getBranchColor(entry.branch)}
                  backgroundColor={getBranchBackgroundColor(entry.branch)}
                >
                  {entry.branch}
                </Badge>
              </Td>
              <Td>
                <Typography textColor={cellTextColor}>{truncateTitle(entry.title)}</Typography>
              </Td>
              <Td>
                <State {...{entry, finalStates, state}} />
              </Td>
              <Td>
                <Typography textColor={cellTextColor}>
                  {entry.deploy_time ? formatDeployTime(entry.deploy_time) : "–"}
                </Typography>
              </Td>
              <Td>
                <Typography textColor={cellTextColor}>
                  {getDate(entry.created_at)}
                </Typography>
              </Td>
              <Td>
                <Tooltip description={getTranslation('deployments-list.table-body.deploy-log-url-text')}>
                  <LinkButton
                    href={`${entry.admin_url}/deploys/${entry.id}`}
                    variant="tertiary"
                    style={{ border: "none" }}
                  >
                    <Layer />
                  </LinkButton>
                </Tooltip>
                {state == 'ready' && <Tooltip description={
                  getTranslation('deployments-list.table-body.visit-url-text')
                }>
                  <LinkButton
                    href={entry.links.permalink}
                    variant="tertiary"
                    style={{ border: "none" }}
                  >
                    <ExternalLink />
                  </LinkButton>
                </Tooltip>}
                {!finalStates.includes(entry.state) && (<CancelDeployButton deployId={entry.id} />)}
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  );
};

export default DeploymentsList;
