/*
 *
 * CancelDeployButton
 *
 */

import React, { useState } from "react";

import { cancelDeploy } from "../../utils/api";
import { LinkButton } from "@strapi/design-system/LinkButton";
import getTranslation from "../../utils/getTranslation";
import { Tooltip } from "@strapi/design-system/Tooltip";
import Cross from "@strapi/icons/Cross";


/**
 * Display a button to cancel a deploy
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CancelDeployButton = ({
  deployId
}) => {

  const cancelDeployHandler = async (deployId) => {
    try {
      const response = await cancelDeploy(deployId);
    } catch (error) {
      console.error("[netlify-deployments] Error while cancelling deploy", error);
    } finally {
    }
  };

  return (
    <Tooltip
      description={getTranslation('cancel-deploy-button.text')}
    >
      <LinkButton
        onClick={() => cancelDeployHandler(deployId)}
        variant="tertiary"
        style={{ border: "none" }}
      >
        <Cross />
      </LinkButton>
    </Tooltip>
  );
};

export default CancelDeployButton;
