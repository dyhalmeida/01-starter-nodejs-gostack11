const express = require('express');
const { uuid } = require('uuidv4');
const app = express();
const projects = [];

app.use(express.json());

app.get('/index', (request, response) => {
  return response.status(200).json({ message: '🚀 Backend started' });
});

app.get('/projects', (request, response) => {
  const { title } = request.query;
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;
  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  const project = {
    id: uuid(),
    title,
    owner,
  };
  projects.push(project);
  return response.status(201).json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex < 0) {
    return response.status(400).json(['Project not found']);
  }
  projects.splice(projectIndex, 1);
  return response.status(204).json();
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex < 0) {
    return response.status(400).json(['Project not found']);
  }
  const project = { id, title, owner };
  projects[projectIndex] = project;
  return response.json(project);
});

app.listen(3333, () => {
  console.log('🚀 Backend started');
});
