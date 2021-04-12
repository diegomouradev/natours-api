const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.route(
  '/top-5-cheap',
  tourController.aliasTopCheap,
  tourController.getAllTours
);

router.route('/').get(tourController.getAllTours).post(tourController.addTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
