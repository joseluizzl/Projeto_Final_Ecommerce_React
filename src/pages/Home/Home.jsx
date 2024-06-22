import { useEffect, useState } from "react";
import api from "../../api/api";
import Banner from "../../components/Banner";
import Cabecalho from "../../components/cabecalho/Cabecalho";
import Footer from "../../components/Footer/Footer";
import "./home.css";
import CardProduto from "../../components/CardProduto/CardProduto";
import Buscar from "../../components/buscar/Buscar"

const Home = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [termoDeBusca, setTermoDeBusca] = useState('');

    useEffect(() => {
        getTodosOsProdutos();
    }, []);

    const getTodosOsProdutos = async () => {
        const response = await api.get('/produto');
        setProdutos(response.data);
    };
    
    // filtrar produtos pela busca
    const handleBuscar = (query) => {
        setTermoDeBusca(query);
    };
    
    useEffect(() => {
        const filtrado = produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(termoDeBusca.toLowerCase()) && produto.quantidade > 0
        );
        setProdutosFiltrados(filtrado);
    }, [termoDeBusca, produtos]);

    return (
        <>
            <Cabecalho />
        
            {/* <Buscar onSearch={handleSearch}/> */}

            <div className="teste">
                <div className="banner">
                    <Banner
                        img={'https://tpc.googlesyndication.com/simgad/15464926730141309314?'}
                        descrcao={"descricao do banner"}
                    />
                </div>
                <Buscar onSearch={handleBuscar}/>
                
                <div className="style-produto">
                    {produtosFiltrados
                        .map((produto) => (
                        <CardProduto
                            key={produto.id}
                            id={produto.id}
                            nome={produto.nome}
                            imgUrl={produto.imgUrl}
                            descricao={produto.descricao}
                            preco={produto.preco}
                            likes={produto.likes}
                        />
                    ))}
                </div>

                <div className="banner">
                    <Banner
                        img={'https://tpc.googlesyndication.com/simgad/10894917116371607010?'}
                        descrcao={"descricao do banner"}
                    />
                </div>
            </div> 
            <Footer/>
        </>
    );
};

export default Home;
