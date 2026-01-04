export const hierarchy = [
  {
    name: "Public",
    isFolder: true,
    children: [
      {
        name: "index.html",
        isFolder: false,
      },
    ],
  },
  {
    name: "src",
    isFolder: true,
    children: [
       {
        name: "components",
        isFolder: true,
        children: [
            {
                name: "SubComponent.js",
                isFolder: false
            }
        ]
      }, 
      {
        name: "App.js",
        isFolder: false
      },
      {
        name: "index.js",
        isFolder: false
      },
      {
        name: "styles.css",
        isFolder: false
      }
    ]
  },
  {
    name: "package.json",
    isFolder: false,
  }
];
