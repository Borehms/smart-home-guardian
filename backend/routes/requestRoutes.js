const express = require('express');
const {
  submitRequest,
  getRequests,
  approveRequest,
  declineRequest
} = require('../controllers/requestController');
const router = express.Router();

router.post('/',           submitRequest);
router.get('/',            getRequests);
router.patch('/:id/approve',  approveRequest);
router.patch('/:id/decline',  declineRequest);

module.exports = router;
