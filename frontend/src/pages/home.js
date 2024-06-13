import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ teamname: '', title: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projects/get');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        // Logging to check the data being sent
        console.log('Updating project:', projects[editIndex]._id, newProject);
        await axios.put(`http://localhost:5000/projects/update/${projects[editIndex]._id}`, newProject);
        const updatedProjects = [...projects];
        updatedProjects[editIndex] = { ...projects[editIndex], ...newProject };
        setProjects(updatedProjects);
        setEditIndex(null);
      } else {
        const response = await axios.post('http://localhost:5000/projects/save', newProject);
        setProjects([...projects, response.data]);
      }
      setNewProject({ teamname: '', title: '', description: '' });
    } catch (error) {
      console.error('Error adding/editing project:', error);
    }
  };

  const handleEdit = (index) => {
    const project = projects[index];
    setNewProject({ teamname: project.teamname, title: project.title, description: project.description });
    setEditIndex(index);
  };

  const handleDelete = (id, index) => {
    axios.delete(`http://localhost:5000/projects/delete/${id}`)
      .then(() => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
      })
      .catch(error => console.error('Error deleting project:', error));
  };

  return (
    <div className='container'>
      <h1>Team Collaboration Platform</h1>
      <div>
        <h2>{editIndex !== null ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamname"
            placeholder="Team Name"
            value={newProject.teamname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newProject.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProject.description}
            onChange={handleInputChange}
          />
          <button type="submit">{editIndex !== null ? 'Update Project' : 'Add Project'}</button>
        </form>
      </div>
      <div className='one'>
        <p>Total Teams: {projects.length}</p>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <h2>{project.teamname}</h2>
              <strong>{project.title}</strong>
              <br /><br/>
              <strong>{project.description}</strong>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(project._id, index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
