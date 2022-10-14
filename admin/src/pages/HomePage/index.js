/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Link } from "@strapi/design-system/Link";
import ArrowLeft from "@strapi/icons/ArrowLeft";
import getSites from "../../utils/getSites";
import getDefaultSite from "../../utils/getDefaultSite";

import SymmetricBox from "../../components/SymmetricBox";
import DeployButton from "../../components/DeployButton";
import SitePicker from "../../components/SitePicker";

import DeploymentsContainer from "../../components/DeploymentsContainer";
import { useFormattedMessage } from "../../hooks/useFormattedMessage";

/**
 * @typedef {import('../../../../types/typedefs').DeploymentsFetched} DeploymentsFetched
 */

const HomePage = () => {
  const headerTitle = useFormattedMessage("home-page.header.title");
  const headerSubtitle = useFormattedMessage("home-page.header.subtitle");

  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState({});
  useEffect(() => {
    getSites().then((sites) => setSites(sites));
    getDefaultSite().then((selected) => {
      if (selectedSite.id != selected.id) setSelectedSite(selected);
    });
  }, []);

  const [polling, setPolling] = useState(false);

  if (!selectedSite.id) return <LoadingIndicatorPage />;

  const onDeployed = (hasError) => {
    if (hasError) return;
    setPolling(true);
  };

  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          navigationAction={
            <Link startIcon={<ArrowLeft />} to="/">Go back</Link>
          }
          primaryAction={
            <DeployButton site={selectedSite} onDeployed={onDeployed} />
          }
          secondaryAction={<SitePicker handleSiteSelect={setSelectedSite} />}
          title={headerTitle}
          subtitle={headerSubtitle}
          as="h2"
        />
      </Box>
      <SymmetricBox paddingHorizontal={10} paddingVertical={2}>
        <DeploymentsContainer sites={sites} site={selectedSite} isPolling={polling} setPolling={setPolling} />
      </SymmetricBox>
    </>
  );
};

export default memo(HomePage);
