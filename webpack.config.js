const Dotenv = require('dotenv-webpack');

const path = require('path');

module.exports = {
	entry: path.join(__dirname, 'client_side', 'app.jsx'),
	output: {
		path: path.join(__dirname, '/public/javascripts/'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/, 
				//test: /\.(jpe?g|gif|png|svg)$/i,
				//test: /\.jsx?$\.(jpe?g|gif|png|svg)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-react']
				}
			}
		]
	},
	mode: process.env.NODE_ENV || 'development',
	plugins: [
		new Dotenv()
	]
}