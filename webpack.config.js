const nodeExternals = require('webpack-node-externals')

module.exports = {
 entry: './src/index.ts',
 output: {
   filename: 'server.js',
   path: './'
 },
 target: 'node',
 externals: [nodeExternals({
     whitelist: ['netflux', 'mute-structs', 'mute-core']
 })],
 module: {
   rules: [
     {
       test: /\.ts/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     },
   ]
 },
 resolve: {
   extensions: ['.tsx', '.ts', '.js']
 }
}