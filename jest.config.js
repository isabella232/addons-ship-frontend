module.exports = {
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '@/(.*)$': '<rootDir>/$1'
  },
  testPathIgnorePatterns: ['/node_modules/', '.next'],
  setupFilesAfterEnv: ['<rootDir>/setupEnzyme.js']
};
