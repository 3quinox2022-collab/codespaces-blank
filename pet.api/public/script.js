async function carregarPerfil() {
  const resposta = await fetch("/api/perfil");
  const perfil = await resposta.json();
  
  document.getElementById("nome-perfil").textContent = perfil.nome;
  document.getElementById("curso-perfil").textContent = `${perfil.curso} (${perfil.semestre}º Semestre)`;
}

async function carregarDisciplinas() {
  const resposta = await fetch("/api/disciplinas");
  const disciplinas = await resposta.json();
  
  const lista = document.getElementById("lista");
  lista.innerHTML = ""; 
  
  disciplinas.forEach((d) => {
    const li = document.createElement("li");
    li.textContent = `${d.nome} (${d.semestre}º semestre)`;
    lista.appendChild(li);
  });
}

carregarPerfil();
carregarDisciplinas();