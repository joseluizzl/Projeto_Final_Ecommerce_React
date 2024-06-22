import { LiaShippingFastSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import "./CardProduto.css";

const CardProduto = ({ id, nome, imgUrl, descricao, preco, likes }) => {
  return (
    <span className='container-card'>
      <a href={`/produto/${id}`} className="card"> 
        <div className="imagemCard">
          <img src={imgUrl} alt={descricao} />
        </div>
        <div className="infCard">
          <span>
            <h2>{nome}</h2>
            <h4>R${preco}</h4>
            <p>No pix ou 12x no cartão</p>
            <h5>
              Frete Grátis <LiaShippingFastSolid />
            </h5>
            <h6>
              <CiHeart /> Curtidas ({likes})
            </h6>
          </span>
        </div>
      </a>
    </span>
  );
};

export default CardProduto;