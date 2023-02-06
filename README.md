# @onerouter/vite-plugin-screens

A Next.js style file system based routing plugin for vite, forked from [vite-plugin-next-react-router](https://github.com/zoubingwu/vite-plugin-next-react-router) (inspired by [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)). 

**Requires [@onerouter/core](https://npmjs.com/package/@onerouter/core)**

## Usage

1. Install dependencies and devDependencies:

```sh
# dependencies
yarn add @onerouter/core react-router-dom react-router-native
```

The easiest way to get React Native Web working with Vite is with @tamagui/vite-plugin (whether you actually use Tamagui or not), so it's in this example:

```sh
# devDependencies
yarn add @onerouter/vite-plugin-screens vite @vitejs/plugin-react @tamagui/vite-plugin -D
```

2. Add to your `vite.config.js` (this example tested working with react-native-web, Reanimated v2.12, Moti v0.19):

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouterPlugin } from '@onerouter/vite-plugin-screens';
import { tamaguiPlugin } from "@tamagui/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: "window",
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
    __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
  },
  plugins: [
    reactRouterPlugin(),
    react({
      babel: {
        plugins: [
          "@babel/plugin-proposal-export-namespace-from",
          "react-native-reanimated/plugin",
        ],
      },
    }),
    tamaguiPlugin({
      components: [], // this needs to be present, even if empty to avoid errors
    })
  ],
});
```

Pass config options like this:

```js
export default defineConfig({
  plugins: [
    //...

    // this is also the default config
    reactRouterPlugin({
      async: true,
      pageDir: 'screens',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      output: './routes.tsx',
    }),
  ],
});
```

3. This plugin will scan your screens folder then automatically generate a routes array of route objects (compatible with @onerouter/core's `useRoutes` hook (for use with the `<Router />` component) and `createRouter` method (for use with `<RouterProvider />`, enabling react-router 6.63+ loaders, actions, errorElements, and many new components/hooks) and write to output (a `routes.[j|t]sx` file, not a Vite virtual module like other solutions) so you can import them from there.

`<Router />` + `useRoutes()` example:

```js
import { Outlet, Router, useRoutes } from '@onerouter/core';
import { routes } from './routes'; // or use Vite's alias to simplify import path for nested components

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default function OldSchoolRouter() {
  return(
    <Router>
      <Routes>
        <Outlet />
      </Routes>
    </Router>,
  )
};
```

`<RouterProvider />` + `createRouter()` example:

```js
import { createRouterProvider, Outlet, RouterProvider }
import { routes } from './routes';

const router = createRouter(routes);

export default function NewHotnessRouter() {
  return(
    <RouterProvider router="router">
      <Outlet />
    </RouterProvider>
  )
};
```

4. For meta info you want to add to the screens, you can export a `meta` object in you screen component, and read them from `screens` objects like below:

```js
// screen component
export default ScreenA() {
  //...
}

export const meta = {
  title: 'This is Screen A',
  sort: 0
}


// Menu component
import { screens } from './routes';

function Menu() {
  const menuItems = screens
    .sort(/* sort it according to meta.sort */)\
    .map(/* map them to Sider menu items */)

  // render it
}

```

It follows Next.js style file system based routing rules and route files named `index` to the root of the screens directory. You can check their docs [here](https://nextjs.org/docs/routing/introduction).
