/**
 *
 * DeploymentsList
 *
 */

import React from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Tooltip } from "@strapi/design-system/Tooltip";
import { LinkButton } from "@strapi/design-system/LinkButton";
import { Badge } from "@strapi/design-system/Badge";
import { Loader } from "@strapi/design-system/Loader";
import ExternalLink from "@strapi/icons/ExternalLink";
import CancelDeployButton from "../CancelDeployButton";

import SymmetricBox from "../SymmetricBox";
import FormattedMessage from "../FormattedMessage";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

const finalStates = ["error", "ready"];

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import("../../../../types/typedefs").DeploymentState} DeploymentState
 */

const getDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

/**
 * @param {DeploymentState} deploymentState
 * @returns {string} Strapi color
 */
const getStateColor = (deploymentState) => {
  switch (deploymentState) {
    case "error":
      return "danger700";

    case "ready":
      return "success700";

    case "building":
      return "warning700"

    default:
      return "neutral700";
  }
};

/**
 * @param {DeploymentState} deploymentState
 * @returns {string} Strapi color
 */
const getStateBackgroundColor = (deploymentState) => {
  switch (deploymentState) {
    case "error":
      return "danger100";

    case "ready":
      return "success100";

    default:
      return "neutral100";
  }
};

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
const DeploymentsList = ({ deployments, usePolling }) => {
  const ROW_COUNT = deployments.length + 1;
  const COL_COUNT = 5;

  const labelLoader = useFormattedMessage("home-page.deployments.loader");

  const headerFontVariant = "sigma";
  const cellTextColor = "neutral800";

  return (
    <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
      <Thead>
        <Tr>
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
            {usePolling && (
              <SymmetricBox paddingHorizontal={2} paddingVertical={0}>
                <Loader small>{labelLoader}</Loader>
              </SymmetricBox>
            )}
          </Th>
          <Th>
            <FormattedMessage
              variant={headerFontVariant}
              labelId="deployments-list.table-header.creation-date"
            />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {deployments.map((entry) => (
          <Tr key={entry.id}>
            <Td>
              <Typography textColor={cellTextColor}>{truncateTitle(entry.title)}</Typography>
            </Td>
            <Td>
             {entry.error_message && <Tooltip description={entry.error_message}>
                <Badge
                  textColor={getStateColor(entry.state)}
                  backgroundColor={getStateBackgroundColor(entry.state)}
                >
                  {entry.state}
                </Badge>
              </Tooltip>}
              {!entry.error_message && <Badge
                textColor={getStateColor(entry.state)}
                backgroundColor={getStateBackgroundColor(entry.state)}
              >
                {entry.state}
              </Badge>}
            </Td>
            <Td>
              <Typography textColor={cellTextColor}>
                {getDate(entry.created_at)}
              </Typography>
            </Td>
            <Td>
              {entry.state == 'ready' && <Tooltip description={
                <FormattedMessage labelId="deployments-list.table-body.visit-url-text" />
              }>
                <LinkButton
                  href={entry.links.permalink}
                  variant="tertiary"
                  style={{ border: "none" }}
                >
                  <span><ExternalLink /></span>
                </LinkButton>
              </Tooltip>}
              {!finalStates.includes(entry.state) && (<CancelDeployButton deployId={entry.id} />)}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DeploymentsList;
