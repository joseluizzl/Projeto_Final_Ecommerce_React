import { Link } from "react-router-dom";
import "./cabecalho.css";
import { TiShoppingCart } from "react-icons/ti";
import { getItem } from "../../services/LocalStorageFuncs";

const Cabecalho = () => {
  const carrinho = getItem("carrinho");

  return (
    <header>
      <div className="container">
        <div className="logo">
          <a href="/">LGeez</a>
        </div>
        <div className="categorias">
          <ul>
            <li>
              <Link to={"/categoria/eletronico"}>Eletronicos</Link>
            </li>
            <li>
              <Link to={"/categoria/mochila"}>Mochilas</Link>
            </li>
            <li>
              <Link to={"/categoria/mochila"}>Ofertas</Link>
            </li>
          </ul>
        </div>
        
        <div className="loginCadastro">
          <ul>
            <li>
              <Link to="/Login"> Login </Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastro </Link>
            </li>
            <li>
              <div className="cart">
                <Link to={"/carrinho"}>
                  <TiShoppingCart />
                </Link>
                <p>{!carrinho ? 0 : carrinho.length}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
