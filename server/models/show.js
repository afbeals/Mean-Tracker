var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShowSchema = new Schema (
{
  title: String,
  category: String,
  network: String,
  date_added: {type: Date, default: new Date}
});

var Show = mongoose.model('Show', ShowSchema);