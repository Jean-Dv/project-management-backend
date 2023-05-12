import { JestConfigWithTsJest } from 'ts-jest/dist/types'

const config: JestConfigWithTsJest = {
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest'
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@root/(.*)$': '<rootDir>/$1',
        '^@config(.*)$': '<rootDir>/config/$1',
        '^@app(.*)$': '<rootDir>/app/$1',
        '^@bin(.*)$': '<rootDir>/bin/$1',
    }
}

export default config