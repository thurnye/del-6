const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/flight',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


