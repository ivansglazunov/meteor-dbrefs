// Find by DBRef
// https://github.com/ivansglazunov/meteor-dbrefs/issues/6
DBRef = function(dbref) {
  var dbref = arguments[0];
  if (dbref.hasOwnProperty('_bsontype') && dbref._bsontype == 'DBRef') {
    var collection = Meteor.Collection.get(dbref.namespace);
    return collection.findOne(dbref.oid);
  } else if (dbref.hasOwnProperty('$ref')) {
    var collection = Meteor.Collection.get(dbref.$ref);
    return collection.findOne(dbref.$id);
  }
  return undefined;
};

// Create new DBRef
DBRef.new = function(ref, id, db) {
  var result = {};
  if (ref) result.$ref = ref;
  if (id) result.$id = id;
  if (db) result.$db = db;
  return result;
};

// Create query for DBRef in bson
DBRef.bson = function(ref, id, db) {
  var result = {};
  if (ref) result.namespace = ref;
  if (id) result.oid = id;
  if (db) result.db = db;
  return result;
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
DBRef.Schema = new SimpleSchema({
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
