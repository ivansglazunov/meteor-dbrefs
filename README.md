# DBRefs

### `collection.findOne` support

Manual receiving items they DBRefs with standard findOne

Ignores settings: collections and databases. It is understood that the user knows that the link refers to this collection.

```js
test.insert({ _id: 'a' });
test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
test.findOne(test.findOne('b').link)._id == 'a' // true
test.findOne({ $ref: 'test', $id: 'a' })._id == 'a' // true
```

### `Collection.findOne` support

Automatically search the collection within a database application, and receiving document here.

```js
test.insert({ _id: 'a' });
test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
Meteor.Collection.findOne(test.findOne('b').link)._id == 'a' // true
Meteor.Collection.findOne({ $ref: 'test', $id: 'a' })._id == 'a' // true
```

### `Collection.get` support

Automatically search the collection within a database application, and receiving document here.

```js
test.insert({ _id: 'a' });
test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
Meteor.Collection.get(test.findOne('b').link) == test // true
Meteor.Collection.get({ $ref: 'test', $id: 'a' }) == test // true
Meteor.Collection.get(test.findOne('b').link)._name == 'test' // true
```

### `SimpleSchema support` support

Use `DBRefSchema` in your schemes!

```js
test.attachSchema({
  link: {
    type: DBRefSchema,
    optional: true
  }
});

test.insert({ _id: 'a' });
test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
Meteor.Collection.get(test.findOne('b').link) == test // true
Meteor.Collection.get({ $ref: 'test', $id: 'a' }) == test // true
Meteor.Collection.get(test.findOne('b').link)._name == 'test' // true
```

### Support for syntax:

* `{ $ref, $id, $db }`
* `{ _bsontype: 'DBRef', namespace, oid, db }`
