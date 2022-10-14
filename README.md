# Netlify Deployments

[![npm version](https://badge.fury.io/js/strapi-plugin-netlify-deployments.svg)](https://badge.fury.io/js/strapi-plugin-netlify-deployments)
[![strapi market link](https://img.shields.io/badge/strapi-v4-blueviolet)](https://market.strapi.io/plugins/strapi-plugin-netlify-deployments)

Strapi v4 plugin to trigger, monitor, and cancel deployments on one or more
Netlify sites.

## Plugin Preview

Home Page:

![Plugin Home Page](https://github.com/jclusso/strapi-plugin-netlify-deployments/raw/master/assets/strapi-netlify-deployments-home.png "Plugin Home Page")

Settings Page:

![Plugin Settings Page](https://github.com/jclusso/strapi-plugin-netlify-deployments/raw/master/assets/strapi-netlify-deployments-settings.png "Plugin Settings Page")

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

You should see the **Netlify Deployments** menu in the left panel.

**Note:** You _may_ need to run `yarn build` in order to see the new menu entries.

Then you can proceed with the plugin configuration.

## Plugin Configuration

### Config properties

Example:

```js
module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: "<netlify-access-token>",
      sites: [
        {
          name: 'Site 1',
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          buildHook: "https://api.netlify.com/build_hooks/<hook_id>",
          branch: 'master' // optional
        }
      ]
    },
  },
});
```

The plugin is reading the following configuration variables to work:

- `accessToken`: Access token of your Netlify account used to fetch the list of deployments

  - Access tokens can be created and managed on your [user settings](https://app.netlify.com/user/applications#personal-access-tokens)

- `sites`: An array of Netlify sites to view and manage deploys.

  - The array must have objects with a `name`, `id`, and `buildHook`. Optionally, you can include a `branch` to override the default value of `master`. The id can be found under Site settings > General and you can follow [this](https://docs.netlify.com/configure-builds/build-hooks/) guide to create a build hook.

### Environment Configuration

You shouldn't disclose your Access Token for security reasons. Therefore, you shouldn't add this value to versioning in a public git repository. A suggested solution is to use an environment variable. Example:

```js
module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: process.env.NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN
    },
  },
});
```

#### Local development

For local development, you can add the config properties in your `.env` file:

```shell
NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN="<netlify-access-token>"
```

#### Server

You can save these values as process env variable on your server (e.g. [this](https://devcenter.heroku.com/articles/config-vars) guide is for Heroku).

## Credits

Thanks to [gianlucaparadise](https://github.com/gianlucaparadise) for making [strapi-plugin-vercel-deploy](https://github.com/gianlucaparadise/strapi-plugin-vercel-deploy) which this was based on.
