/*
 *
 * SettingsPage
 *
 */

import React, { memo, useEffect, useState } from "react";

import { Box } from "@strapi/design-system/Box";
import { HeaderLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import { Typography } from '@strapi/design-system/Typography';

import {
  Field,
  FieldLabel,
  FieldInput,
  FieldHint,
} from "@strapi/design-system/Field";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";

import SitesList from "../../components/SitesList";
import { getConfig } from "../../utils/api";
import FormattedMessage from "../../components/FormattedMessage";
import ExternalLink from "../../components/ExternalLink";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('../../../../types/typedefs').PluginConfigMap} PluginConfigMap
 */

const BoxField = ({ fieldName, fieldHint, children }) => {
  const horizontalPadding = 10;
  const verticalPadding = 2;
  return (
    <Box
      paddingLeft={horizontalPadding}
      paddingRight={horizontalPadding}
      paddingTop={verticalPadding}
      paddingBottom={verticalPadding}
    >
      <Field name={fieldName} hint={fieldHint}>
        {children}
      </Field>
    </Box>
  );
};

const SettingsContainer = () => {
  const accessTokenPlaceholder = useFormattedMessage(
    "settings-page.access-token.placeholder"
  );
  const labelLoader = useFormattedMessage(
    "settings-page.settings-container.loader"
  );

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /** @type {PluginConfigMap} */
  const initialConfig = {};
  const [pluginConfig, setPluginConfig] = useState(initialConfig);

  useEffect(() => {
    getConfig()
      .then((response) => {
        setPluginConfig(response.data);
      })
      .catch((error) => {
        console.error(
          "[netlify-deployments] error while retrieving plugin config",
          error
        );
        setPluginConfig({});
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, setPluginConfig]);

  const accessToken = pluginConfig.accessToken || "";
  const sites = pluginConfig.sites || [];

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Loader>{labelLoader}</Loader>
      </Flex>
    );
  }

  if (hasError) {
    return (
      <Box padding={8} background="neutral100">
        <DeploymentsEmptyState type="ERROR_CONFIG" />
      </Box>
    );
  }

  return (
    <>
      <BoxField
        fieldName="netlify-deployments-access-token"
        fieldHint={
          <>
            <FormattedMessage labelId="settings-page.access-token.learn-more-intro" />
            <ExternalLink href="https://app.netlify.com/user/applications#personal-access-tokens">
              <FormattedMessage labelId="settings-page.access-token.learn-more-link-text" />
            </ExternalLink>
          </>
        }
      >
        <Stack>
          <FieldLabel required>
            <FormattedMessage labelId="settings-page.access-token.label" />
          </FieldLabel>
          <FieldInput
            type="text"
            placeholder={accessTokenPlaceholder}
            value={accessToken}
            disabled={true}
          />
          <FieldHint />
        </Stack>
      </BoxField>

      <BoxField fieldHint={
        <FormattedMessage labelId="settings-page.sites.learn-more-text" />
      }>
        <Box paddingBottom={2}>
          <Typography variant="beta">
            <FormattedMessage labelId="settings-page.sites.label" />
          </Typography>
        </Box>
        <SitesList sites={sites} />
        <FieldHint />
      </BoxField>
    </>
  );
};

const SettingsPage = () => {
  const headerTitle = useFormattedMessage("settings-page.header.title");
  const headerSubtitle = useFormattedMessage("settings-page.header.subtitle");

  return (
    <>
      <Box background="neutral100">
        <HeaderLayout title={headerTitle} subtitle={headerSubtitle} as="h2" />
      </Box>
      <SettingsContainer />
    </>
  );
};

export default memo(SettingsPage);
