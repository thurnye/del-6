const mongoose = require('mongoose')
const { Schema } = mongoose;


const ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F][1-9]\d?/
    },
    price: {
        type: Number
    },
    flight: {
        type: Schema.Types.ObjectId, 
        ref: 'Flight',
        required: true
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);
