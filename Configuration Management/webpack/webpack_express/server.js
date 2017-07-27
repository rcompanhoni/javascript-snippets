const express = require('express');
const path = require('path');

const app = express();

// server routes should be declared first (most specific)

// only uses webpack when NOT in production
if (process.env.NODE_ENV !== "production") {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');

    app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
    // makes 'dist' available for external requests
    app.use(express.static('dist'));
    
    // for any request always return index.html (it's a SPA)
    app.get('*', (req, res) => { 
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));