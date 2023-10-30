import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import * as yup from 'yup';
import getTrad from "./utils/getTrad";
import CheckboxConfirmation from "./components/CheckboxConfirmation";
import EditView from "./components/EditView/EditView";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Netlify Deployments",
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "[request]" */ "./pages/App"
        );

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });

    const settingsBaseName = `${pluginId}-settings`;
    app.createSettingSection(
      {
        id: settingsBaseName,
        intlLabel: {
          id: `${settingsBaseName}.links-header`,
          defaultMessage: "Netlify Deployments",
        },
      },
      [
        // links
        {
          intlLabel: {
            id: `${settingsBaseName}.link-configuration-label`,
            defaultMessage: "Configuration",
          },
          id: `${settingsBaseName}-link-configuration`,
          to: `/settings/${pluginId}`,
          Component: async () => {
            const component = await import(
              /* webpackChunkName: "[request]" */ "./pages/SettingsApp"
            );

            return component;
          },
          permissions: [],
        },
      ]
    );

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'url-alias-edit-view',
      Component: EditView,
    });

    // const ctbPlugin = app.getPlugin('content-type-builder');

    // if (ctbPlugin) {
    //   const ctbFormsAPI = ctbPlugin.apis.forms;
    //   // ctbFormsAPI.addContentTypeSchemaMutation(mutateCTBContentTypeSchema);
    //   ctbFormsAPI.components.add({ id: 'url-alias.checkboxConfirmation', component: CheckboxConfirmation });

    //   ctbFormsAPI.extendContentType({
    //     validator: () => ({
    //       'url-alias': yup.object().shape({
    //         enabled: yup.bool().default(true),
    //       }),
    //     }),
    //     form: {
    //       advanced() {
    //         return [
    //           {
    //             name: 'pluginOptions.url-alias.enabled',
    //             description: {
    //               id: getTrad('url-alias.enabled.description-content-type'),
    //               defaultMessage: 'Enable URL alias - allows urls to be created for this content type',
    //             },
    //             type: 'url-alias.checkboxConfirmation',
    //             intlLabel: {
    //               id: getTrad('url-alias.enabled.label-content-type'),
    //               defaultMessage: 'Url alias',
    //             },
    //           },
    //         ];
    //       },
    //     },
    //   });
    // }
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
