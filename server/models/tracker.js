var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TrackerSchema = new Schema(
{
  _user: {type: Schema.Types.ObjectId, ref: 'user'},
  created_at: {type: Date, default: new Date},
  show: [
          {
            title: String,
            last_watched: {type: Number, default: 0}
          }

        ]
});

var Tracker = mongoose.model('Tracker', TrackerSchema);