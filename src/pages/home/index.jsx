import { useEffect, useState, useRef } from "react";
import "./style.css";
import api from "../../services/api.js";
import Lixeira from "../../assets/Lixeira.svg";

function Home() {

//  Define o estado "users" como um array vazio inicialmente.
// "setUsers" é a função usada para atualizar o estado.
  const [users, setUsers] = useState([]);

  const inputName = useRef() // Guarda o valor do "Nome" na variável "inputName".
  const inputAge = useRef() // Guarda o valor da "Idade" na variável "inputAge".
  const inputEmail = useRef() // Guarda o valor do "E-mail" na variável "inputEmail".

  // Função assíncrona para buscar os usuários da API.
  async function getUsers() {
    // Faz uma requisição GET para a API na rota "/usuarios".
    const response = await api.get("/usuarios");

    setUsers(response.data); // Atualiza o estado com os dados da API.
    console.log(response.data);// Mostra apenas o data no console.
  }
  async function creatUsers(){
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers()
  }

  useEffect(() => {
    getUsers(); // Chama a função ao montar o componente
  }, []);

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro</h1>
        <input placeholder="Nome:" type="text" name="Nome" ref={inputName}/>
        <input placeholder="Idade:" type="number" name="Idade" ref={inputAge}/>
        <input placeholder="E-mail:" type="email" name="E-mail" ref={inputEmail}/>
        <button type="button" onClick={creatUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              E-mail: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Lixeira} alt="Deletar" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;