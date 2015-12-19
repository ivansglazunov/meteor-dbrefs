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
