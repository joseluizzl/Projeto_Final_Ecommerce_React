import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Cabecalho from "../../components/cabecalho/Cabecalho";
import api from "../../api/api";
import CardProduto from "../../components/CardProduto/CardProduto";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner";
import './categoria.css'

const Categoria = () => {
    const { nomeCategoria } = useParams()
    const [produtos, setProdutos] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProdutos()
    }, [])

    const fetchProdutos = async () => {
        try {
            const response = await api.get('/produto') 
            console.log('Dados API:', response.data); // so pra ver se no console se ta vindo certo
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os produtos:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    // filtra os produtos pela categoria que vem dos parametros da URL
    const produtosDaCategoria = produtos.filter((produto) => produto.categoria === nomeCategoria);
    console.log('Produtos da categoria:', produtosDaCategoria); 

    return (
        <>
            <Cabecalho />
            <h2 className="nome-categoria">Categoria {nomeCategoria}</h2>

            <div className="style-produto">
                {produtosDaCategoria
                    .filter(produto => produto.quantidade > 0)
                    .map((produto) =>
                    <CardProduto
                        key={produto.id}
                        id={produto.id}
                        nome={produto.nome}
                        imgUrl={produto.imgUrl}
                        descricao={produto.descricao}
                        preco={produto.preco}
                        likes={produto.likes}
                    />
                )}
            </div>

            <div className="banner">
                <Banner
                    img={'https://tpc.googlesyndication.com/simgad/10894917116371607010?'}
                    descrcao={"descricao do banner"}
                />
            </div>

            <Footer />
        </>
    )
}

export default Categoria