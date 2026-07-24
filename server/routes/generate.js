const express = require('express');
const { generateStudyMaterial } = require('../controllers/generateController');

const router = express.Router();

// POST /api/generate
router.post('/', generateStudyMaterial);

module.exports = router;
