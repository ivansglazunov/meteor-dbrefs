Package.describe({
  name: 'ivansglazunov:dbrefs',
  version: '0.1.0',
  summary: 'Lovely tools to work with DBRefs in Meteor.',
  git: 'https://github.com/ivansglazunov/meteor-dbrefs',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('mongo');
  api.use('aldeed:simple-schema@1.5.1');
  api.use('aldeed:collection2@2.7.0');
  api.use('dburles:mongo-collection-instances@0.3.4');
  api.use('ecmascript');
  api.addFiles('dbrefs.js');
  api.export('DBRef');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ivansglazunov:dbrefs');
  api.use('random');
  api.use('mongo');
  api.use('aldeed:collection2@2.7.0');
  api.addFiles('tests.js');
});
