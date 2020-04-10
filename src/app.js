const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository)
  return res.status(201).json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({ error: "Invalid repository id" });
  }

  const repository = repositories[repoIndex];
  repository.title = title;
  repository.url = url;
  repository.techs = techs;
  repositories[repoIndex] = repository;
  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({ error: "Invalid repository id" });
  }

  repositories.splice(repoIndex, 1);
  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return res.status(400).json({ error: "Invalid repository id" });
  }

  repositories[repoIndex].likes += 1;
  return res.json(repositories[repoIndex]);
});

module.exports = app;
