const mongoose = require('mongoose')
const { Schema } = mongoose;

const flightSchema = new Schema({
  airline:  {
      type: String,
      enum: ['America', 'Southwest', 'United']
  }, 
  airport: {
   type: String,
   enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
   default: 'DEN'
},
  flightNo:   {
   type: Number,
   min: 10,
   max: 9999,
   require: true
},
  departs:  {
      type: Date,
      default: new Date().setFullYear(new Date().getFullYear() -1 )
}
});


module.exports= mongoose.model('Flight', flightSchema);
