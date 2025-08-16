/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Stub all route files and root
    "^@/routes/(.*)$": "<rootDir>/src/test/__mocks__/routeMock.ts",
    "^.*/__root\\.tsx?$": "<rootDir>/src/test/__mocks__/rootMock.tsx",
    "^@/routeTree\\.gen$": "<rootDir>/src/test/__mocks__/routeTreeMock.ts",
    // Stub TanStack Router
    "^@tanstack/react-router$":
      "<rootDir>/src/test/__mocks__/tanstackRouterMock.ts",
    // Stub hooks
    "^@/hooks/(.*)$": "<rootDir>/src/test/__mocks__/hooksMock.ts",
    // Stub services
    "^@/services/(.*)$": "<rootDir>/src/test/__mocks__/servicesMock.ts",
    // Stub stores
    "^@/stores/(.*)$": "<rootDir>/src/test/__mocks__/storesMock.ts",
    // Stub layout
    "^@/layout/(.*)$": "<rootDir>/src/test/__mocks__/layoutMock.tsx",
  },
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          module: "es2022",
          target: "es2022",
          moduleResolution: "node",
          baseUrl: ".",
          paths: {
            "@/*": ["src/*"],
          },
          types: ["jest", "@testing-library/jest-dom", "node", "vite/client"],
          // Lax TypeScript settings for testing
          noImplicitAny: false,
          strict: false,
          noUnusedLocals: false,
          noUnusedParameters: false,
          skipLibCheck: true,
          suppressImplicitAnyIndexErrors: true,
        },
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)",
    "<rootDir>/src/**/*.(test|spec).(ts|tsx|js)",
    "<rootDir>/src/__tests__/**/*.(ts|tsx|js)",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/src/routes/"],
  transformIgnorePatterns: [
    "node_modules/(?!(@tanstack|jotai)/)",
    "<rootDir>/src/routes/",
  ],
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)",
    "!src/**/*.d.ts",
    "!src/test/**/*",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
    "!src/routeTree.gen.ts",
    "!src/**/*.stories.*",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html", "json"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
