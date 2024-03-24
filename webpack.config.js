const path = require("path");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: "./src/index.ts",
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'Code.gs'
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new GasPlugin()
    ],

}