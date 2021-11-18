module.exports = {
  src: './src',
  schema: './src/schema.graphql',
  artifactDirectory: 'src/__generated__',
  exclude: [
    '**/node_modules/**',
    '**/__mocks__/**',
    '**/__generated__/**',
    '**/dist/**',
    '**/test/**',
    '**/public/**',
  ],
}
