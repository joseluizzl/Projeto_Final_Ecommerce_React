import { Link } from "react-router-dom";
import Cabecalho from "../../components/cabecalho/Cabecalho";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import "./CompraRealizada.css";
import Footer from "../../components/Footer/Footer";

const CompraRealizada = () => {
  const [pedidos, setPedidos] = useState([]);

  const usuarioLogadoString = JSON.stringify(getItem("usuarioLogado"));
  console.log("Usuário logado como string:", usuarioLogadoString);

  const TodosOsPedidos = async () => {

    const userId = usuarioLogadoString.split('"id":"')[1].split('"')[0];
    console.log("ID do usuário:", userId); // so pra confirmar e ver no console

    try {
      const response = await api.get("/pedido");
      const todosPedidos = response.data;

      const pedidosDoUsuario = todosPedidos.filter(
        (pedido) => pedido.userId === userId
      );
      setPedidos(pedidosDoUsuario);
      console.log("Pedidos do usuário:", pedidosDoUsuario);
    } catch (error) {
      console.error("Erro ao recuperar pedidos do usuário:", error);
    }
  };

  useEffect(() => {
    const carrinho = getItem('carrinho')
    const carrinhoZerado = []
    setItem('carrinho', carrinhoZerado)

    TodosOsPedidos();

  }, []);

  const nomeUsuario = usuarioLogadoString.split('"nome":"')[1].split('"')[0];

  return (
    <>
      <Cabecalho />
      <div className="compra-realizada-container">
        <main>
          <div className="RealPed">
            <div className="compra-realizada-header">
              <h2 className="compra-realizada-title">
                Pedido realizado com sucesso!
              </h2>
              <p className="compra-realizada-txt">
                Obrigado por fazer uma compra conosco.
              </p>
              <p className="compra-realizada-txt">Seu pedido foi processado.</p>
            </div>
            <div className="compra-realizada-actions">
              <Link to="/" className="compra-realizada-btn">
                Voltar para a página inicial
              </Link>
            </div>
          </div>


          <div className="CodPed">
          <h2 className="compra-realizada-title">
              {nomeUsuario}, esses são todos os seus pedidos no site:
              </h2>
            <div className="compra-realizada-pedidos">
              {pedidos.length > 0 ? (
                <ul className="pedido-list">
                  {pedidos.map((pedido) => (
                    <li key={pedido.id} className="pedido-item">
                      <hr />
                      <b>- CÓDIGO PEDIDO: {pedido.id} -</b>  <br />
                      <br /> 
                      <ol>
                        {pedido.itens.map((item) => (
                          <li key={item.idProduto} className="pedido-item-info">
                            Código produto: {item.idProduto} <br />
                            Quantidade: {item.quantidade}
                            <br/>
                          </li>
                        ))}
                        <b>TOTAL: R$ {pedido.valorTotal}</b>
                        <br /><br /><br />
                      </ol>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum pedido encontrado.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default CompraRealizada;
