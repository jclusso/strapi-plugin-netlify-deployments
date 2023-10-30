import * as React from 'react'
import { Tooltip, Badge, Loader } from "@strapi/design-system";
import SymmetricBox from "../SymmetricBox";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import("../../../../types/typedefs").DeploymentState} DeploymentState
 */

/**
 * @param {DeploymentState} deploymentState
 * @returns {string} Strapi color
 */
const getStateColor = (deploymentState) => {
  switch (deploymentState.toLowerCase()) {
    case "error":
      return "danger700";

    case "ready":
      return "success700";

    case "building":
    case "enqueued":
    case "preparing":
    case "processing":
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
  switch (deploymentState.toLowerCase()) {
    case "error":
      return "danger100";

    case "ready":
      return "success100";

    case "building":
    case "enqueued":
    case "preparing":
    case "processing":
      return "warning100"

    default:
      return "neutral100";
  }
};

export default function State({entry, state, finalStates}) {
  const labelLoader = useFormattedMessage("home-page.deployments.loader");

  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      {entry.error_message && <Tooltip description={entry.error_message}>
        <Badge
          textColor={getStateColor(state)}
          backgroundColor={getStateBackgroundColor(state)}
        >
          {state}
        </Badge>
      </Tooltip>}
      {!entry.error_message && <Badge
        textColor={getStateColor(state)}
        backgroundColor={getStateBackgroundColor(state)}
      >
        {state}
      </Badge>}
      {!finalStates.includes(entry.state) && (
        <SymmetricBox paddingHorizontal={2} paddingVertical={0}>
          {[<Loader small>{labelLoader}</Loader>]}
        </SymmetricBox>
      )}
    </div>
  )
}
