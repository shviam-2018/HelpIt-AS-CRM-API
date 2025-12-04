const express = require('express');
const { fetchAllCases, getSingleCase, createCase, updateCase, deleteCase } = require('../Controllers/caseController');

const router = express.Router();

router.get('/', fetchAllCases);
router.get('/:id', getSingleCase);
router.post('/', createCase);
router.put('/:id', updateCase);
router.delete('/:id', deleteCase);

module.exports = router;