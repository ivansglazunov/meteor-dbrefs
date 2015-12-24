Tinytest.add('ivansglazunov:dbrefs DBRef', function (assert) {
  var test = Random.id();
  var Test = new Mongo.Collection(test);

  if (Meteor.isServer) {
    Test.allow({
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

  var id1 = Random.id();
  var id2 = Random.id();
  Test.insert({ _id: id1 });
  Test.insert({ _id: id2, link: { $ref: test, $id: id1 } });

  assert.equal(Test.findOne(id1), DBRef(Test.findOne(id2).link));
  assert.equal(Test.findOne(id1), DBRef({ $ref: test, $id: id1 }));
});

Tinytest.add('ivansglazunov:dbrefs Collection.get', function (assert) {
  var test = Random.id();
  var Test = new Mongo.Collection(test);

  if (Meteor.isServer) {
    Test.allow({
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

  var id1 = Random.id();
  var id2 = Random.id();
  Test.insert({ _id: id1 });
  Test.insert({ _id: id2, link: { $ref: test, $id: id1 } });

  assert.equal(Test, Mongo.Collection.get(Test.findOne(id2).link));
  assert.equal(Test, Mongo.Collection.get({ $ref: test, $id: id1 }));
});

Tinytest.add('ivansglazunov:dbrefs DBRef.Schema', function (assert) {
  var test = Random.id();
  var Test = new Mongo.Collection(test);

  Test.attachSchema({
    link: {
      type: DBRef.Schema,
      optional: true
    }
  });

  if (Meteor.isServer) {
    Test.allow({
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

  var id1 = Random.id();
  var id2 = Random.id();
  Test.insert({ _id: id1 });
  Test.insert({ _id: id2, link: { $ref: test, $id: id1 } });

  assert.equal(Test, Mongo.Collection.get(Test.findOne(id2).link));
  assert.equal(Test, Mongo.Collection.get({ $ref: test, $id: id1 }));
});


Tinytest.add('ivansglazunov:dbrefs .attachDBRef', function (assert) {
  var test = Random.id();
  var Test = new Mongo.Collection(test);

  Test.attachDBRef();

  if (Meteor.isServer) {
    Test.allow({
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

  var id1 = Random.id();
  Test.insert({ _id: id1 });

  assert.equal(DBRef.new(test, id1), Test.findOne(id1).DBRef());
});
