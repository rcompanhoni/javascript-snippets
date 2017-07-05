module.exports = {

    'facebookAuth' : {
        'clientID'      : 'YOUR_CLIENT_ID',                       
        'clientSecret'  : 'YOUR_CLIENT_SECRET',       
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'YOUR_CONSUMER_KEY',
        'consumerSecret'    : 'YOUR_CONSUMER_SECRET',
        'callbackURL'       : 'http://127.0.0.1:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'YOUR_CLIENT_ID',
        'clientSecret'  : 'YOUR_CLIENT_SECRET',
        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
    }

};