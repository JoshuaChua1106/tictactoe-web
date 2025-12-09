module.exports = {
  // Use ts-jest to process TypeScript files
  preset: 'ts-jest',
  
  // The test environment
  testEnvironment: 'node',
  
  // Where to look for test files
  testMatch: ["**/tests/**/*.test.ts"],
  
  // Root directory of your source code
  rootDir: "./",
};