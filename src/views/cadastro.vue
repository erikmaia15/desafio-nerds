<template>
  <section class="cadastro-main">
    <h3>Cadastro de integrantes do nerds</h3>
    <form class="form-cadastro" @submit.prevent="cadastrarUsuario">
      <div class="inputs-cadastro">
        <label for="">Digite seu nome:</label>
        <input type="text" required="true" v-model="nome" />
        <label for="">Digite sua matrícula:</label>
        <input
          type="text"
          v-model="matricula"
          inputmode="numeric"
          pattern="[0-9]*"
          minlength="6"
          maxlength="6"
          @input="apenasNumeros"
          required
        />

        <label for="">Digite seu email:</label>
        <input type="email" required="true" v-model="email" />
      </div>
      <input type="submit" class="btn-cadastro" value="Cadastra-se" />
      <p>{{ resposta }}</p>
    </form>
    <br />

    <h3 style="color: white">Listagem de integrantes cadastrados</h3>
    <p v-if="usuariosFiltrados.length === 0" style="color: white">
      Ainda não há integrantes cadastrados!
    </p>
    <section class="listagem-main" v-if="usuariosArray.length > 0">
      <label>Filtro dos integrantes por nome:</label>
      <input type="text" class="input-pesquisa" placeholder="Digite um nome " v-model="filtro" />
      <div v-for="usuario in usuariosFiltrados">
        <p>Nome: {{ usuario.nome }}</p>
        <p>Email: {{ usuario.email }}</p>
        <p>Matrícula: {{ usuario.matricula }}</p>
      </div>
    </section>
  </section>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import usuarios from "@/service/usuarios";
const nome = ref("");
const email = ref("");
const resposta = ref("");
const matricula = ref("");
const usuariosArray = ref([]);
const filtro = ref("");
const usuariosFiltrados = computed(() =>
  usuariosArray.value.filter((usuario) =>
    usuario.nome?.toLowerCase().includes(filtro.value.toLowerCase())
  )
);

async function cadastrarUsuario() {
  const formData = {
    nome: nome.value,
    email: email.value,
    matricula: matricula.value,
  };
  const response = await usuarios.cadastrarUsuario(formData);
  console.log(response);
  if (response.status === 201) {
    resposta.value = "Usuário cadastrado com sucesso!";
    setTimeout(() => {
      resposta.value = "";
    }, 3000);

    await buscarUsuarios();
  }
}
async function buscarUsuarios() {
  const response = await usuarios.buscarUsuarios();
  if (response.status === 200) {
    usuariosArray.value = response.data;
  }
}
function apenasNumeros() {
  matricula.value = matricula.value.replace(/\D/g, "");
}

onMounted(async () => {
  await buscarUsuarios();
});
</script>
<style scoped>
.cadastro-main {
  min-height: 100vh;
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(135deg, #2a2add, #4f46e5);
  font-family: Arial, Helvetica, sans-serif;
}

.cadastro-main h3 {
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
}

.form-cadastro {
  background: #fff;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.inputs-cadastro {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 15px;
}

.inputs-cadastro label {
  font-size: 14px;
  color: #333;
}

.inputs-cadastro input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  transition: border 0.3s;
}

.inputs-cadastro input:focus {
  border-color: #4f46e5;
}

.input-pesquisa {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  transition: border 0.3s;
}

.input-pesquisa input:focus {
  border-color: #4f46e5;
}

.btn-cadastro {
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  border: none;

  background: #4f46e5;
  color: #fff;
  font-size: 15px;
  font-weight: bold;

  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.btn-cadastro:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.listagem-main {
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  max-height: 500px;
  overflow-y: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  & input {
    margin-bottom: 10px;
  }
}

.listagem-main div {
  background: #4f46e5;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.listagem-main p {
  margin: 0;
  font-size: 14px;
  color: white;
}

@media (max-width: 480px) {
  .form-cadastro {
    padding: 20px;
  }

  .cadastro-main h3 {
    font-size: 18px;
  }
}
</style>
