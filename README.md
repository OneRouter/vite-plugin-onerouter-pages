# vite-plugin-onerouter-pages

A Next.js style file system based routing plugin for vite, forked from [vite-plugin-next-react-router](https://github.com/zoubingwu/vite-plugin-next-react-router) (inspired by [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)). **Requires react-router v6. (or [@onerouter/core](https://npmjs.com/package/@onerouter/core))**

## Usage

1. Install with yarn:

```sh
yarn add @onerouter/vite-plugin-onerouter-pages -D
```

or with pnpm

```sh
pnpm add @onerouter/vite-plugin-onerouter-pages -D
```

1. Add to your `vite.config.js`

```js
import { reactRouterPlugin } from '@onerouter/vite-plugin-onerouter-pages';

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
      output: './src/routes.tsx',
    }),
  ],
});
```

1. This plugin will scan your pages folder then automatically generate a routes objects and write to output so you can import them from there.

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

1. For some meta info you want to add to the pages, you can export a `meta` object in you page component, and read them from `pages` objects like below:

```js
// page component
export default PageA() {
  //...
}

export const meta = {
  title: 'This is Page A',
  sort: 0
}


// Sider component
import { pages } from './routes';

function Sider() {
  const menuItems = pages
    .sort(/* sort it according to meta.sort */)\
    .map(/* map them to Sider menu items */)

  // render it
}

```

It follows Next.js style file system based routing rules and route files named `index` to the root of the pages directory. You can check their docs [here](https://nextjs.org/docs/routing/introduction).
