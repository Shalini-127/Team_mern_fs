const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { teamname, title, description } = req.body;
    const savedProject = await Project.create({teamname,title,description})
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { teamname, title, description } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, { teamname, title, description }, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};
