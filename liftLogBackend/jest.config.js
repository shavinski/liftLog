module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts", // Include files in src directory
    "!**/node_modules/**", // Exclude files in node_modules
    "!**/vendor/**", // Exclude files in vendor
  ],
};
