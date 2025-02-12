module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleDirectories: ["node_modules", "src"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
		"^.+\\.scss$": "jest-transform-stub",
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
