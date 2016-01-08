# DBRefs

```
meteor add ivansglazunov:dbrefs
```

I recommend using with the package `ivansglazunov:trees`.

### Find by DBRef

Automatically search the collection within a database application, and receiving document here.

```js
Test.insert({ _id: 'a' });
Test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
DBRef(Test.findOne('b').link)._id == 'a' // true
DBRef({ $ref: 'test', $id: 'a' })._id == 'a' // true
```

### `Collection.get` support

Automatically search the collection within a database application, and receiving document here.

```js
Test.insert({ _id: 'a' });
Test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
Meteor.Collection.get(Test.findOne('b').link) == Test // true
Meteor.Collection.get({ $ref: 'test', $id: 'a' }) == Test // true
Meteor.Collection.get(Test.findOne('b').link)._name == 'Test' // true
```

### `SimpleSchema` support

Use `DBRef.Schema` in your schemes!

```js
Test.attachSchema({
  link: {
    type: DBRef.Schema,
    optional: true
  }
});

Test.insert({ _id: 'a' });
Test.insert({ _id: 'b', link: { $ref: 'test', $id: 'a' } });
Meteor.Collection.get(Test.findOne('b').link) == Test // true
Meteor.Collection.get({ $ref: 'test', $id: 'a' }) == Test // true
Meteor.Collection.get(Test.findOne('b').link)._name == 'Test' // true
```

### Generate DBRefs

```js
DBRef.new('test','id','db'); // { $ref: 'test', $id: 'id', $db: 'db' }
DBRef.bson('test','id','db'); // { namespace: 'test', oid: 'id', db: 'db' }
```

### Convert DBRefs

```js
DBRef.new(DBRef.bson('test','id','db')); // { $ref: 'test', $id: 'id', $db: 'db' }
DBRef.bson(DBRef.new('test','id','db')); // { namespace: 'test', oid: 'id', db: 'db' }
```

### Get DBRef from document

```js
Test = new Meteor.Collection('test');
Test.attachDBRef();
Test.insert({ _id: 'a' });
var dbref = Test.findOne('a').DBRef() // { $ref: 'test', $id: 'a' }
var document = DBRef(dbref); // { _id: 'a' }
```

### Validators

```js
DBRef.isDBRef(undefined); // false
DBRef.isDBRef('a'); // false
DBRef.isDBRef({ _id: 123 }); // false
DBRef.isDBRef({ $ref: 'test', $id: 'a' }); // true
DBRef.isDBRef({ namespace: 'test', oid: 'a' }); // true
DBRef.isQuery({ $ref: 'test', $id: 'a' }); // true
DBRef.isQuery({ namespace: 'test', oid: 'a' }); // false
DBRef.isBSON({ $ref: 'test', $id: 'a' }); // false
DBRef.isBSON({ namespace: 'test', oid: 'a' }); // true
```

### Support for syntax:

* `{ $ref, $id, $db }` query syntax
* `{ _bsontype: 'DBRef', namespace, oid, db }` bson response syntax

## Versions

#### 0.1.4

* Added validators
* Fix readme