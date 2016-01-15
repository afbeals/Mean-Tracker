var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
{
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
  created_at: {type: Date, default: new Date},
  friends: [{type: Schema.Types.ObjectId, ref: 'user'}],
  _tracker: {type: Schema.Types.ObjectId, ref: 'tracker'}

});

var User = mongoose.model('User', UserSchema);