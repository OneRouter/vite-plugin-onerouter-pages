export const generateRoutesCode = ({
  layoutImport,
  pageImports,
  layoutElement,
  routes,
  staticPageMetaImports,
  pages,
}: any) => `
${layoutImport}
${staticPageMetaImports}
${pageImports}

export const routes = [
  {
    path: '/',
    element: ${layoutElement},
    children: [
      ${routes}
    ]
  }
]

export const pages = [
  ${pages}
]
`;
