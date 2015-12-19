Package.describe({
  name: 'ivansglazunov:dbrefs',
  version: '0.0.1',
  summary: 'Lovely tools to work with DBRefs in Meteor.',
  git: 'https://github.com/ivansglazunov/meteor-dbrefs',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('mongo');
  api.use('dburles:mongo-collection-instances');
  api.use('ecmascript');
  api.addFiles('dbrefs.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ivansglazunov:dbrefs');
  api.use('random');
  api.use('mongo');
  api.addFiles('tests.js');
});
