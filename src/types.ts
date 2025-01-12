export interface ResolvedRoute {
  path: string;
  componentPath: string; // absolute path to component
  componentName: string;
  index?: boolean;
}

export interface Options {
  /**
   * Indicates how to load the component. Default is true, which means that components should be loaded by React.lazy.
   * @default true
   */
  async: boolean;

  /**
   * Path to the directory to search for page components.
   * @default 'screens'
   */
  pageDir: string;

  /**
   * Valid file extensions for page components.
   * @default ['js', 'jsx', 'ts', 'tsx']
   */
  extensions: string[];

  /**
   * Generated routes code output
   * @default './src/routes.tsx
   */
  output?: string;
}

export type UserOptions = Partial<Options>;

export interface ResolvedOptions extends Options {
  /**
   * Resolves to the `root` value from Vite config.
   */
  root: string;

  output: string;
}

type PageRoute = string;
type FilePath = string;

export type ResolvedPages = Map<PageRoute, FilePath>;
