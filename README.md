# Netlify Deployments

[![npm version](https://badge.fury.io/js/strapi-plugin-netlify-deployments.svg)](https://badge.fury.io/js/strapi-plugin-netlify-deployments)
[![strapi market link](https://img.shields.io/badge/strapi-v4-blueviolet)](https://market.strapi.io/plugins/strapi-plugin-netlify-deployments)

Strapi v4 plugin to trigger and monitor and cancel a deployment on Netlify.

## Plugin Preview

Home Page:

![Plugin Home Page](https://github.com/jclusso/strapi-plugin-netlify-deployments/raw/main/assets/strapi-netlify-deployments-home.png "Plugin Home Page")

Settings Page:

![Plugin Settings Page](https://github.com/jclusso/strapi-plugin-netlify-deployments/raw/main/assets/strapi-netlify-deployments-settings.png "Plugin Settings Page")

## Installation

### Install dependency

Run the following command in your Strapi project to install netlify-deployments:

```shell
yarn add strapi-plugin-netlify-deployments
# or
npm i -S strapi-plugin-netlify-deployments
```

### Enable plugin configuration

Open `config/plugins.js` file and add the netlify-deployments entry:

```js
module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
  },
});
```

### Run

You can now run Strapi:

```
yarn develop
```

You should see the **Netlify** menu in the left panel.

**N.B.** You _may_ need to run `yarn build` in order to see the new menu entries.

Then you can proceed with the plugin configuration.

## Plugin Configuration

### Config properties

Example:

```js
module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      buildHook: "https://api.netlify.com/build_hooks/<hook_id>",
      accessToken: "<netlify-access-token>",
      siteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    },
  },
});
```

The plugin is reading the following configuration variables to work:

- `buildHook`: Url of the build hook in Netlify.

  - You can follow [this](https://docs.netlify.com/configure-builds/build-hooks/) guide to create a build hook on Netlify

- `accessToken`: Access token of your Netlify account used to fetch the list of deployments

  - Access tokens can be created and managed inside your [user settings](https://app.netlify.com/user/applications#personal-access-tokens)

- `siteId`: Site ID of your Netlify site used to filter the list of deployments

  - Set the Site ID of your [Netlify Site](https://app.netlify.com) to see only the deployments you need. This can be found at Site settings > General.

### Environment Configuration

You shouldn't disclose the api token and the deploy hook url for security reasons. Therefore, you shouldn't add these values to versioning in a public git repository. A suggested solution is to use environment variables. Example:

```js
module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      buildHook: process.env.NETLIFY_DEPLOYMENTS_PLUGIN_BUILD_HOOK,
      accessToken: process.env.NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN,
      siteId: process.env.NETLIFY_DEPLOYMENTS_PLUGIN_SITE_ID
    },
  },
});
```

#### Local development

For local development, you can add the config properties in your `.env` file:

```shell
NETLIFY_DEPLOYMENTS_PLUGIN_BUILD_HOOK="https://api.netlify.com/build_hooks/xxxxxxxxxxxxxxxxxxxxxxxx"
NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN="<netlify-access-token>"
NETLIFY_DEPLOYMENTS_PLUGIN_SITE_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

#### Server

You can save these values as process env variable on your server (e.g. [this](https://devcenter.heroku.com/articles/config-vars) guide is for Heroku).

## Credits

Thanks to [gianlucaparadise](https://github.com/gianlucaparadise) for making [strapi-plugin-vercel-deploy](https://github.com/gianlucaparadise/strapi-plugin-vercel-deploy) which this heavily built from.
