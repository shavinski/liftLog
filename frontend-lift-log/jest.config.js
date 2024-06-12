export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    // if your using tsconfig.paths thers is no harm in telling jest
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "@/(.*)$": "<rootDir>/src/$1",

    // mocking assests and styling
    // "^/images/(.*)$": "<rootDir>/public/images/$1",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/tests/mocks/fileMock.ts",

    "^.+\\.(css|less|scss|sass)$": "<rootDir>/src/tests/mocks/styleMock.ts",
    /* mock models and services folder */
    "(assets|models|services)": "<rootDir>/src/tests/mocks/fileMock.ts",
  },
  // moduleNameMapper: {
  //   "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/tests/mocks/fileMock.ts",
  //   "\\.(css|less|scss)$": "<rootDir>/src/tests/mocks/styleMock.ts",
  //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
  //   "<rootDir>/src/tests/mocks/fileMock.ts",
  // },
};
