const express = require('express');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const router = express.Router();

router.get('/get', getProjects);
router.post('/save', createProject);
router.put('/update/:id', updateProject);
router.delete('/delete/:id', deleteProject);

module.exports = router;
