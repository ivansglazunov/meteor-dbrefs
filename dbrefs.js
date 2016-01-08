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

DBRef.isDBRef = function(dbref) {
  return DBRef.isQuery(dbref) || DBRef.isBSON(dbref);
};

DBRef.isQuery = function(dbref) {
  return (typeof(dbref) == 'object' && !!dbref.$id && !!dbref.$ref);
};

DBRef.isBSON = function(dbref) {
  return (typeof(dbref) == 'object' && !!dbref.oid && !!dbref.namespace);
};

// Create new DBRef
DBRef.new = function(ref, id, db) {
  if (typeof(ref) == 'object') {
    if (DBRef.isQuery(ref)) return ref;
    else if (DBRef.isBSON(ref)) return DBRef.new(ref.namespace, ref.oid, ref.db);
    else throw new Meteor.Error('Invalid dbref object.');
  } else {
    var result = {};
    if (ref) result.$ref = ref;
    if (id) result.$id = id;
    if (db) result.$db = db;
  }
  return result;
};

// Create query for DBRef in bson
DBRef.bson = function(ref, id, db) {
  if (typeof(ref) == 'object') {
    if (DBRef.isBSON(ref)) return ref;
    else if (DBRef.isQuery(ref)) return DBRef.bson(ref.$ref, ref.$id, ref.$db);
    else throw new Meteor.Error('Invalid dbref object.');
  } else {
    var result = {};
    if (ref) result.namespace = ref;
    if (id) result.oid = id;
    if (db) result.db = db;
  }
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

// DBRef helper
Meteor.Collection.prototype.attachDBRef = function() {
  var collection = this;
  this.helpers({
    DBRef: function() { return DBRef.new(collection._name, this._id); },
  });
};
