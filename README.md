# DBRefs

### Expanded `collection.findOne`

Manual receiving items they DBRefs with standard findOne

Ignores settings: collections and databases. It is understood that the user knows that the link refers to this collection.

```js
test.insert({ _id: 'a' });
test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
test.findOne(test.findOne('b').link)._id == 'a' // true
test.findOne({ $ref: 'test', $id: 'a' })._id == 'a' // true
```

### Added `Collection.findOne`

Automatically search the collection within a database application, and receiving document here.

```js
test.insert({ _id: 'a' });
test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
Meteor.Collection.findOne(test.findOne('b').link)._id == 'a' // true
Meteor.Collection.findOne({ $ref: 'test', $id: 'a' })._id == 'a' // true
```

### Support for syntax:

* `{ $ref, $id, $db }`
* `{ _bsontype: 'DBRef', namespace, oid, db }`
