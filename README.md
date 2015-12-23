# DBRefs

```
meteor add ivansglazunov:dbrefs
```

### Find by DBRef

Automatically search the collection within a database application, and receiving document here.

```js
test.insert({ _id: 'a' });
test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
DBRef(test.findOne('b').link)._id == 'a' // true
DBRef({ $ref: 'test', $id: 'a' })._id == 'a' // true
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

Use `DBRef.Schema` in your schemes!

```js
test.attachSchema({
  link: {
    type: DBRef.Schema,
    optional: true
  }
});

test.insert({ _id: 'a' });
test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
Meteor.Collection.get(test.findOne('b').link) == test // true
Meteor.Collection.get({ $ref: 'test', $id: 'a' }) == test // true
Meteor.Collection.get(test.findOne('b').link)._name == 'test' // true
```

### Generate DBRefs

```js
DBRef.new('col','abc','db'); // { $ref: 'col', $id: 'abc', $db: 'db' }
DBRef.bson('col','abc','db'); // { namespace: 'col', oid: 'abc', db: 'db' }
```

### Support for syntax:

* `{ $ref, $id, $db }`
* `{ _bsontype: 'DBRef', namespace, oid, db }`
