
const Flight = require('../model/model');



exports.getIndex = (req, res, next) => {
  Flight.find().sort({departs: 'asc'})
  .then(flight => {
    res.render('index', {
      pageTitle: 'Flights',
      flights: flight
    })
  })
  .catch( err => console.log(err))
}

exports.getForm = (req, res, next) => {
  let d = new Date()
  d.setFullYear(new Date().getFullYear() -1)
  console.log(d.toISOString().slice(0, 16))
  res.render('editSingleFlight', { 
      title: 'New Flight',
      defaultDepart: d.toISOString().slice(0, 16),
      editing: false 
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
    departs: depart 
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

exports.getOneFlight = (req, res) => {
  let id = req.params.id
  // console.log(id)
  Flight.findById(id)
  .then(flight => {
    // console.log(flight)
    let d = flight.departs
    let date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
    let time = `${d.getHours()}Hrs ${d.getMinutes()}m`
  res.render('singleFlight',{
    pageTitle: "Single Flight",
    flight: flight,
    depart: date,
    time: time
  })
  })
  
}


//Edit a single flight
exports.getEditFlight = (req, res) => {
  let id =  req.params.id
  Flight.findById(id)
  .then(flight => {
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

// add arrival
exports.postArrival = (req, res) => {
  const id =  req.params.id;
  const arrivalAirport = req.body.arrivalAirport;
  const arrivalDate = req.body.arrivalDate

console.log(arrivalDate, arrivalAirport)

  Flight.findById(id)
  .then(result => {
    result.destinations.push({
      airport:arrivalAirport,
      date: arrivalDate
    })
    result.save()
    console.log(result._id)
    res.redirect(`/single-flight/${result._id}`)
    // console.log(result)
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
    console.log(flight._id)
    if(flight._id.toString() !== flightId.toString()){
      return res.redirect('/');
    }
      flight.airport = updatedAirport;
      flight.airline = updatedAirline;
      flight.flightNo = updatedFlightNo;
      flight.departs = updatedDepart
    
    return flight.save()
  })
  .then(result => {
    console.log('updated')
    res.redirect('/')
  })
}

//Delete one

exports.deleteFlight = (req, res) => {
  const id = req.body.flightId
  console.log(id)
  Flight.findByIdAndDelete(id)
  .then(result => {
    console.log('Destroyed')
    res.redirect('/')
  })
  .catch(err =>  console.log(err))
}
