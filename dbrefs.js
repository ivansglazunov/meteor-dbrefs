// Expand findOne
// https://github.com/ivansglazunov/meteor-dbrefs/issues/2
var nativeFindOne = Meteor.Collection.prototype.findOne;
Meteor.Collection.prototype.findOne = function(dbref) {
  if (typeof(dbref) == 'object') {
    if (dbref.hasOwnProperty('_bsontype') && dbref._bsontype == 'DBRef') {
      var findArguments = [dbref.oid];
      findArguments.push.apply(findArguments, Array.prototype.slice.call(arguments, 1));
      return nativeFindOne.apply(this, findArguments);
    } else if (dbref.hasOwnProperty('$id')) {
      var findArguments = [dbref.$id];
      findArguments.push.apply(findArguments, Array.prototype.slice.call(arguments, 1));
      return nativeFindOne.apply(this, findArguments);
    }
  }
  return nativeFindOne.apply(this, arguments);
};

// Meteor.Collection.findOne(DBRef)
// https://github.com/ivansglazunov/meteor-dbrefs/issues/3
Mongo.Collection.findOne = Meteor.Collection.findOne = function(dbref) {
  if (dbref.hasOwnProperty('_bsontype') && dbref._bsontype == 'DBRef') {
    var collection = this.get(dbref.namespace);
    return collection.findOne.apply(collection, arguments);
  } else if (dbref.hasOwnProperty('$ref')) {
    var collection = this.get(dbref.$ref);
    return collection.findOne.apply(collection, arguments);
  }
  return undefined;
};

// Get collection by DBRef
// https://github.com/ivansglazunov/meteor-dbrefs/issues/4
var nativeGet = Mongo.Collection.get;
Mongo.Collection.get = function(dbref) {
  if (dbref.hasOwnProperty('_bsontype') && dbref._bsontype == 'DBRef') {
    return nativeGet(dbref.namespace);
  } else if (dbref.hasOwnProperty('$ref')) {
    return nativeGet(dbref.$ref);
  }
  return nativeGet.apply(this, arguments);
}

// Support SimpleSchema
// https://github.com/ivansglazunov/meteor-dbrefs/issues/5
DBRefSchema = new SimpleSchema({
  $ref: {
    type: String,
    optional: true
  },
  $id: {
    type: String,
    optional: true
  },
  $db: {
    type: String,
    optional: true
  },
  namespace: {
    type: String,
    optional: true
  },
  oid: {
    type: String,
    optional: true
  },
  db: {
    type: String,
    optional: true
  }
});
