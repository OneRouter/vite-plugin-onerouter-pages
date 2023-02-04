# @onerouter/vite-plugin-screens

A Next.js style file system based routing plugin for vite, forked from [vite-plugin-next-react-router](https://github.com/zoubingwu/vite-plugin-next-react-router) (inspired by [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)). ** Requires [@onerouter/core](https://npmjs.com/package/@onerouter/core))**

## Usage

1. Install with yarn:

```sh
yarn add @onerouter/vite-plugin-screens -D
```

or with pnpm

```sh
pnpm add @onerouter/vite-plugin-screens -D
```

1. Add to your `vite.config.js`

```js
import { reactRouterPlugin } from '@onerouter/vite-plugin-screens';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //...
    reactRouterPlugin(),
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

1. This plugin will scan your screens folder then automatically generate a routes objects and write to output so you can import them from there.

```js
import { Router, useRoutes } from '@onerouter/core';
import { routes } from './routes'; // or use Vite's alias to simplify import path for nested components

function App() {
  const element = useRoutes(routes);
  return element;
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

1. For some meta info you want to add to the screens, you can export a `meta` object in you screen component, and read them from `screens` objects like below:

```js
// screen component
export default ScreenA() {
  //...
}

export const meta = {
  title: 'This is Screen A',
  sort: 0
}


// Sider component
import { screens } from './routes';

function Sider() {
  const menuItems = screens
    .sort(/* sort it according to meta.sort */)\
    .map(/* map them to Sider menu items */)

  // render it
}

```

It follows Next.js style file system based routing rules and route files named `index` to the root of the screens directory. You can check their docs [here](https://nextjs.org/docs/routing/introduction).
