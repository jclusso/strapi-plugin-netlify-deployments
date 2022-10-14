/*
 *
 * DeployButton
 *
 */

import React, { useState } from "react";

import { Button } from "@strapi/design-system/Button";
import { Loader } from "@strapi/design-system/Loader";
import Plus from "@strapi/icons/Plus";
import Check from "@strapi/icons/Check";

import SymmetricBox from "../../components/SymmetricBox";
import DeployErrorMessage from "../../components/DeployErrorMessage";
import { runDeploy } from "../../utils/api";
import FormattedMessage from "../FormattedMessage";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Stack } from '@strapi/design-system/Stack';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from "@strapi/design-system/Typography";

import getTranslation from "../../utils/getTranslation";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import('../../components/DeployErrorMessage/typedefs').ErrorStateType} DeployErrorStateType
 */

/**
 * Display a button to deploy together with an error message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeployButton = ({
  site,
  onDeployed,
}) => {
  const labelLoader = useFormattedMessage("deploy-button.loader");

  const [isLoading, setIsLoading] = useState(false);
  const [hasDeployError, setHasDeployError] = useState(false);

  const runDeployHandler = async () => {
    setIsVisible(false)
    try {
      setHasDeployError(false);
      setIsLoading(true);
      const response = await runDeploy(site.id);
      if (onDeployed) onDeployed(false);
    } catch (error) {
      console.error("[netlify-deployments] Error while running deploy", error);
      if (onDeployed) onDeployed(true);
      setHasDeployError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isLoading && (
        <SymmetricBox paddingHorizontal={4}>
          <Loader small>{labelLoader}</Loader>
        </SymmetricBox>
      )}
      {hasDeployError && (
        <SymmetricBox paddingHorizontal={1}>
          <DeployErrorMessage type={"ERROR_DEPLOY"} />
        </SymmetricBox>
      )}
      <SymmetricBox paddingHorizontal={4}>
        <Button onClick={() => setIsVisible(true)} disabled={isLoading}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Plus />
            <span style={{ width: "8px" }} />
            <FormattedMessage labelId="deploy-button.label" />
          </div>
        </Button>
          <Dialog onClose={() => setIsVisible(false)} title={getTranslation('generic.confirmation')} isOpen={isVisible}>
            <DialogBody>
              <Stack spacing={2}>
                <Flex justifyContent="center">
                  <Typography id="confirm-description">
                    <FormattedMessage labelId="deploy-button.confirm-text" />
                    &nbsp;{site.name}
                  </Typography>
                </Flex>
              </Stack>
            </DialogBody>
            <DialogFooter startAction={<Button onClick={() => setIsVisible(false)} variant="tertiary">
                  <FormattedMessage labelId="generic.cancel" />
                </Button>} endAction={<Button onClick={runDeployHandler} variant="default" startIcon={<Check />}>
                  <FormattedMessage labelId="deploy-button.label" />
                </Button>} />
          </Dialog>
      </SymmetricBox>
    </div>
  );
};

export default DeployButton;
