Tinytest.add('ivansglazunov:dbrefs findOne', function (test) {
  var Col = new Mongo.Collection(test.test_case.name);

  if (Meteor.isServer) {
    Col.allow({
      insert: function () {
        return true;
      },
      update: function () {
        return true;
      },
      remove: function () {
        return true;
      }
    });
  }

  Col.remove('a');
  Col.remove('b');
  Col.insert({ _id: 'a' });
  Col.insert({ _id: 'b', link: { $ref: test.test_case.name, $id: 'a' } });

  test.equal(Col.findOne('a'), Col.findOne(Col.findOne('b').link));
  test.equal(Col.findOne('a'), Col.findOne({ $ref: test.test_case.name, $id: 'a' }));
});

Tinytest.add('ivansglazunov:dbrefs Collection.findOne', function (test) {
  var Col = new Mongo.Collection(test.test_case.name);

  if (Meteor.isServer) {
    Col.allow({
      insert: function () {
        return true;
      },
      update: function () {
        return true;
      },
      remove: function () {
        return true;
      }
    });
  }

  Col.remove('a');
  Col.remove('b');
  Col.insert({ _id: 'a' });
  Col.insert({ _id: 'b', link: { $ref: test.test_case.name, $id: 'a' } });

  test.equal(Col.findOne('a'), Mongo.Collection.findOne(Col.findOne('b').link));
  test.equal(Col.findOne('a'), Mongo.Collection.findOne({ $ref: test.test_case.name, $id: 'a' }));
});

Tinytest.add('ivansglazunov:dbrefs Collection.get', function (test) {
  var Col = new Mongo.Collection(test.test_case.name);

  if (Meteor.isServer) {
    Col.allow({
      insert: function () {
        return true;
      },
      update: function () {
        return true;
      },
      remove: function () {
        return true;
      }
    });
  }

  Col.remove('a');
  Col.remove('b');
  Col.insert({ _id: 'a' });
  Col.insert({ _id: 'b', link: { $ref: test.test_case.name, $id: 'a' } });

  test.equal(Col, Mongo.Collection.get(Col.findOne('b').link));
  test.equal(Col, Mongo.Collection.get({ $ref: test.test_case.name, $id: 'a' }));
});

Tinytest.add('ivansglazunov:dbrefs DBRefSchema', function (test) {
  var Col = new Mongo.Collection(test.test_case.name);

  Col.attachSchema({
    link: {
      type: DBRefSchema,
      optional: true
    }
  });

  if (Meteor.isServer) {
    Col.allow({
      insert: function () {
        return true;
      },
      update: function () {
        return true;
      },
      remove: function () {
        return true;
      }
    });
  }

  Col.remove('a');
  Col.remove('b');
  Col.insert({ _id: 'a' });
  Col.insert({ _id: 'b', link: { $ref: test.test_case.name, $id: 'a' } });

  test.equal(Col, Mongo.Collection.get(Col.findOne('b').link));
  test.equal(Col, Mongo.Collection.get({ $ref: test.test_case.name, $id: 'a' }));
});
