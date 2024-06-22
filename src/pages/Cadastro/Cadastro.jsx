import { useState } from "react";
import api from "../../api/api";
import { useHistory } from "react-router-dom";
import "./cadastro.css"

const Cadastro = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users", {
        nome: name,
        email: email,
        senha: password,
      });
      console.log("Usuário cadastrado com sucesso:", response.data);

      setName("");
      setEmail("");
      setPassword("");
      alert('Usuário cadastrado com sucesso!')
      if (response.status === 201) {
        history.push("/Login");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className="container-cadastro">
      <div className="wrap-cadastro">
        <form onSubmit={handleSubmit}>
          <h2 className="cadastro-form-title">Cadastro</h2>
          <div className="wrap-input">
            <input
            required
              id="name"
              type="text"
              name="nome"
              onChange={(e)=>setName(e.target.value)}
              className="input"
              value={name}
            />
            <span className="focus-input" data-placeholder="Nome"></span>
          </div>
          <div className="wrap-input">
            <input
            required
              id="email"
              type="email"
              name="email"
              onChange={(e)=> setEmail(e.target.value)}
              className="input"
              value={email}
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>
          <div className="wrap-input">
            <input
            required
              id="password"
              type="password"
              name="senha"
              onChange={(e)=>setPassword(e.target.value)}
              className="input"
              value={password}
            />
            <span className="focus-input" data-placeholder="Senha"></span>
          </div>
          <div className="container-cadastro-form-btn">
            <button type="submit" className="cadastro-form-btn">
              Cadastrar
            </button>
          </div>
          <div className="container-cadastro-form-btn">
            <button type="submit" className="cadastro-form-btn" onClick={()=> history.push("/Login")}>
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;