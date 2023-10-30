import * as React from "react";
import { useIntl } from "react-intl";
import {
  Box,
  Divider,
  Flex,
  LinkButton,
  Loader,
  Tooltip,
  Typography,
} from "@strapi/design-system";
import { ExternalLink } from "@strapi/icons";
import { useCMEditViewDataManager, useFetchClient } from "@strapi/helper-plugin";
import { useDeployments } from "../../hooks/useDeployments";
import { useUrlAliasContentTypes } from "../../utils/info";
import CancelDeployButton from "../CancelDeployButton";
import DeployButton from "../DeployButton";
import getDefaultSite from "../../utils/getDefaultSite";
import getSites from "../../utils/getSites";
import getTrad from "../../utils/getTrad";
import getTranslation from "../../utils/getTranslation";
import State from "../State";

// type Props = {
//   /**
//    * The slug of the entity being edited.
//    */
//   slug: string;
// };

const getState = (entry) => {
  if (entry?.error_message?.indexOf('Canceled build') >= 0) {
    return 'canceled'
  } else if (entry?.error_message?.indexOf('Skipped') >= 0) {
    return 'skipped'
  } else {
    return entry.state;
  }
}

const EditView = ({ slug }) => {
  const { formatMessage } = useIntl();
  const { modifiedData, onChange } = useCMEditViewDataManager();

  const [sites, setSites] = React.useState([]);
  const [selectedSite, setSelectedSite] = React.useState({});
  React.useEffect(() => {
    getSites().then(setSites);
    getDefaultSite().then((selected) => {
      if (selectedSite.id != selected.id) setSelectedSite(selected);
    });
  }, []);
  const [polling, setPolling] = React.useState(false);
  const onDeployed = (hasError) => {
    if (hasError) return;
    setPolling(true);
  }
  const [isLoadingDeployments, deployments, hasDeploymentsError, clearDeployments] =
    useDeployments(polling, selectedSite.id, setPolling);
  const entry = deployments[0];
  const state = entry && getState(entry);
  const finalStates = ["ready", "error"];

  return (
    <Box
      as="aside"
      aria-labelledby="url-alias-sidebar-title"
      background="neutral0"
      borderColor="neutral150"
      hasRadius
      padding={4}
      paddingTop={6}
      shadow="tableShadow"
    >
      <>
        <Typography
          textColor="neutral600"
          variant="sigma"
          id="url-alias-sidebar-title"
        >
          {formatMessage({
            id: getTrad("plugin.name"),
            defaultMessage: "Netlify Deployments",
          })}
        </Typography>
        <Box paddingTop={2} paddingBottom={4}>
          <Divider />
        </Box>
        <Flex size={2} gap={2} direction="column" alignItems="start">
          {isLoadingDeployments ? (
            <Loader>
              {formatMessage({
                id: "url-alias.settings.loading",
                defaultMessage: "Loading content...",
              })}
            </Loader>
          ) : (
            <>
              <DeployButton site={selectedSite} onDeployed={onDeployed} />
              {entry && (
                <Flex justifyContent='space-between' width='100%'>
                  <State {...{state, finalStates, entry}} />
                  {state == 'ready' && (
                    <Tooltip description={
                      getTranslation('deployments-list.table-body.visit-url-text')
                    } >
                      <LinkButton
                        href={`${entry.links.permalink}/${slug.split('.').at(-1)}/${modifiedData.id}`}
                        variant="tertiary"
                        style={{ border: "none" }}
                      >
                        <ExternalLink />
                      </LinkButton>
                    </Tooltip>
                  )}
                  {!finalStates.includes(entry.state) && (<CancelDeployButton deployId={entry.id} />)}
                </Flex>
              )}
            </>
          )}
        </Flex>
      </>
    </Box>
  );
};

export default EditView;
