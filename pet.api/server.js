const express = require("express");
const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(express.static("public"));

let disciplinas = [
  { id: 1, nome: "Tecnologias de Internet", semestre: 4 },
  { id: 2, nome: "Banco de Dados", semestre: 3 }
];
let proximoId = 3;

const perfil = { 
  nome: "Tiago de Castro Menezes", 
  curso: "Ciência da Computação", 
  semestre: 4 
};

app.get("/api/disciplinas", (req, res) => {
  res.json(disciplinas);
});

app.get("/api/perfil", (req, res) => {
  res.json(perfil);
});

app.get("/api/disciplinas/:id", (req, res) => {
  const id = Number(req.params.id);
  const disciplina = disciplinas.find((d) => d.id === id);
  if (!disciplina) {
    return res.status(404).json({ erro: "Disciplina não encontrada" });
  }
  res.json(disciplina);
});

app.post("/api/disciplinas", (req, res) => {
  const { nome, semestre } = req.body || {};
  if (!nome) {
    return res.status(400).json({ erro: "O campo nome é obrigatório" });
  }
  const nova = { id: proximoId++, nome, semestre };
  disciplinas.push(nova);
  res.status(201).json(nova);
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});


const express = require('express');
const app = express();

app.use(express.json());
// Se estiver servindo arquivos estáticos da pasta public:
app.use(express.static('public'));

// Simulação de banco de dados em memória (substitua pelo seu array/banco atual)
let disciplinas = [
  { id: 1, nome: 'Matemática Discreta', periodo: 1 },
  { id: 2, nome: 'Algoritmos e Estruturas de Dados', periodo: 2 }
];

// GET /api/disciplinas (Já existente)
app.get('/api/disciplinas', (req, res) => {
  res.json(disciplinas);
});

// POST /api/disciplinas (Já existente)
app.post('/api/disciplinas', (req, res) => {
  const { nome, periodo } = req.body;
  if (!nome) {
    return res.status(400).json({ erro: "nome é obrigatório" });
  }
  const novoId = disciplinas.length > 0 ? disciplinas[disciplinas.length - 1].id + 1 : 1;
  const novaDisciplina = { id: novoId, nome, periodo };
  disciplinas.push(novaDisciplina);
  res.status(201).json(novaDisciplina);
});

// --- NOVAS ROTAS (Prática 2) ---

// 1. GET /api/disciplinas/:id
app.get('/api/disciplinas/:id', (req, res) => {
  const id = Number(req.params.id);
  const disciplina = disciplinas.find(d => d.id === id);
  
  if (!disciplina) {
    return res.status(404).json({ erro: "disciplina não encontrada" });
  }
  res.json(disciplina);
});

// 2. DELETE /api/disciplinas/:id
app.delete('/api/disciplinas/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = disciplinas.findIndex(d => d.id === id);
  
  if (index === -1) {
    return res.status(404).json({ erro: "disciplina não encontrada" });
  }
  
  disciplinas.splice(index, 1);
  res.status(204).send(); // 204 não tem corpo
});

// 3. PUT /api/disciplinas/:id
app.put('/api/disciplinas/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, periodo } = req.body;
  
  const disciplina = disciplinas.find(d => d.id === id);
  if (!disciplina) {
    return res.status(404).json({ erro: "disciplina não encontrada" });
  }
  
  if (!nome) {
    return res.status(400).json({ erro: "nome é obrigatório" });
  }
  
  disciplina.nome = nome;
  if (periodo !== undefined) disciplina.periodo = periodo;
  
  res.json(disciplina);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

