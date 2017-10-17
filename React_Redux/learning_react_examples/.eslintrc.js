module.exports = {
    env: {
        "browser": true,
        "node": true,
    },
    extends: 'airbnb',
    rules: {
      "linebreak-style": 0,
      'import/no-extraneous-dependencies': ['error', {'devDependencies': true}]
    },
};
