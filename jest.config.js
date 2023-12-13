/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePaths: ["./src"],
    modulePathIgnorePatterns: ["./dist/"],
    transform: {
        "^.+\\.(ts|tsx)?$": ["ts-jest", { diagnostics: { ignoreCodes: ["TS151001"] } }],
    },
}
