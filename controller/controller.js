
const Flight = require('../model/model');



exports.getIndex = (req, res, next) => {
  Flight.find()
  .then(flight => {
    res.render('index', {
      pageTitle: 'Flights',
      flights: flight
    })
  })
  .catch( err => console.log(err))
}

exports.getForm = (req, res, next) => {
  res.render('newFlight', { 
      title: 'New Flight' 
  });
}

exports.postForm = (req, res, next) => {
  const airline = req.body.airline;
  const airport = req.body.airport;
  const flightNo = req.body.flightNo;
  const depart = req.body.depart;

  const flight = new Flight({
    airline : airline,
    airport : airport,
    flightNo : flightNo,
    depart: depart 
  })
 flight.save()
 .then(flight => {
  //  console.log(flight)
   res.redirect('/')
 })
 .catch(err=> {
   console.log(err)
 })
}

//get a single flight
exports.getEditFlight = (req, res) => {
  let id =  req.params.id
  Flight.findById(id)
  .then(flight => {
    // console.log(flight)
    let departDate = flight.departs.toISOString().slice(0, 16) 
  res.render('editSingleFlight',{
    pageTitle: 'Flight Details',
    flight: flight,
    editing: true,
    depart: departDate
  })
  })
  .catch(err => console.log(err))
}

exports.postEditUpdate = (req, res) => {
  const flightId = req.body.flightId
  const updatedAirline = req.body.airline;
  const updatedAirport = req.body.airport;
  const updatedFlightNo = req.body.flightNo;
  const updatedDepart = req.body.depart;
  Flight.findById(flightId)
  .then(flight => {
    // console.log(flight._id)
    if(flight._id.toString() !== flightId.toString()){
      return res.redirect('/');
    }
      flight.airport = updatedAirport;
      flight.airport = updatedAirport;
      flight.flightNo = updatedFlightNo;
      flight.departs = updatedDepart
    
    return flight.save()
  })
  .then(result => {
    console.log('updated')
    res.redirect('/')
  })
}