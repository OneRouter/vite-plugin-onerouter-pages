export const generateRoutesCode = ({
  layoutImport,
  pageImports,
  layoutElement,
  routes,
  staticPageMetaImports,
  pages,
}: any) => `
import { Text } from "react-native"
import { useRouteError } from "@onerouter/core"
${layoutImport}
${staticPageMetaImports}
${pageImports}

function RootErrorBoundary() {
  const error = useRouteError();
  return <Text>{error?.message}</Text>;
}

export const routes = [
  {
    path: '/',
    element: ${layoutElement},
    children: [
      ${routes}
    ]
    errorElement: <RootErrorBoundary />
  }
]

export const pages = [
  ${pages}
]
`;
