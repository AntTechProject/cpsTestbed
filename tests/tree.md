
/your-project-root
│
├── /node_modules
│
├── /src
│   ├── /setupTests.ts        # Optional setup file for Vitest
│   ├── /lib
│   │   ├── /components
│   │   │   ├── /ui
│   │   │   │   ├── Button.svelte
│   │   │   ├── Output.svelte
│   │   │   ├── Range.svelte
│   │   ├── /assets
│   │   │   ├── /images
│   │   │   │   ├── beprc_logo.jpg
│   │   │   │   ├── pgcb_logo.png
│   │   ├── /tests
│   │       ├── example.spec.ts # Playwright test files
│   │       ├── simulation.spec.ts
│   │
│   ├── /components           # Additional components
│   ├── /stores               # Svelte stores if used
│   ├── /pages                # Svelte pages
│
├── /tests
│   ├── example.test.ts       # Vitest test files
│   ├── simulation.test.ts
│
├── /public                   # Static files
│   ├── /images
│   └── /other-assets
│
├── /dist                     # Output directory for build
│
├── /playwright-results       # Playwright test results (optional)
│
├── .gitignore                # Git ignore file
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Dependency lock file
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── vitest.config.ts          # Vitest configuration
└── playwright.config.ts      # Playwright configuration