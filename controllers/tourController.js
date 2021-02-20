const fs = require('fs');

// Parse the file into an object so we can manipulate the data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  // console.log(req.params); => req.params will return an object containing
  // the id passed into the request.
  // { id: '1' } => note that it is return as a string, convert it to number
  // before filtering the array.
  console.log(`Tour id is: ${val}`);
  const id = Number(req.params.id);
  // console.log(id);
  if (id > tours.length || !tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // returns the object that matches
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.addTour = (req, res) => {
  // console.log(req.body);

  // Since we don't have any data or webserver so far, let's just create the newTour.
  // Bellow we create a new id for it, but on a database this would be handled automatically.
  const newId = tours[tours.length - 1].id + 1;

  // Creates a new object merging the last object and the new id object.
  const newTour = Object.assign({ id: newId }, req.body);

  // Push the newTour into the array of tours
  tours.push(newTour);

  // Persist the data by writting the tours files passing in the updated array.
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,

    // we stringfy the data so we can write it into a file.
    JSON.stringify(tours),
    (err) => {
      // send the object created as the response. Even the request being a POST request
      // because we want it to be displayed right away.
      // .json act as the sender of the data, like the end method.
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

// Mongo DB and Mongoose works better with patch
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Whataever you are updating: Was updated!',
  });
};

exports.deleteTour = (req, res) => {
  // 204 no content for delete methods
  res.status(204).json({
    data: null,
  });
};
