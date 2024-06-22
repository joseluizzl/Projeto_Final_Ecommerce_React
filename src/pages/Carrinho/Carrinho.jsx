import { useEffect, useState } from "react"
import { getItem, setItem } from "../../services/LocalStorageFuncs"
import { CartArea, DivFinal } from "../../css/CartArea"
import Cabecalho from "../../components/cabecalho/Cabecalho";
import Rodape from '../../components/Footer/Footer';
import { useHistory } from "react-router-dom"
import api from "../../api/api"
import './carrinho.css'

const Carrinho = () => {
    const history = useHistory();
    const [data, setData] = useState(() => {
        const initialData = getItem('carrinho') || [];
        return (
            initialData.map(e => ({ ...e, qtdItens: e.qtdItens || 1 }))
        )
            
    });

    useEffect(() => {
        setItem('carrinho', data);
        // console.log(data)
    }, [data]);


    const removeItem = (obj) => {
        const arrFilter = data.filter((e) => e.id !== obj.id)
        setData(arrFilter)
        setItem('carrinho', arrFilter)
    }
    
    const aumentar = (obj) => {
        const id = obj.id
        const estoqueProduto = obj.quantidade
        setData(data.map(e => {
            if (e.id === id) {
                if (e.qtdItens < estoqueProduto) {
                    const novaQtdItens = e.qtdItens + 1
                    const subTotalItem = novaQtdItens * e.preco

                    return { ...e, qtdItens: novaQtdItens, subTotalItem: subTotalItem }
                } else {
                    alert('Estoque máximo atingido!');
                }
            }
            return e;
        }))
    }

    const diminuir = (id) => {
        setData(data.map(e => {
            if (e.id === id) {
                const novaQtdItens = Math.max(e.qtdItens - 1, 1)
                const subTotalItem = novaQtdItens * e.preco
                return { ...e, qtdItens: novaQtdItens, subTotalItem: subTotalItem }
            }
            return e;
        }));
    };

    const subTotal = data.reduce((acc, cur) => acc + (cur.subTotalItem || cur.preco), 0)
    // console.log('Subtotal total do carrinho:', subTotal)

    const finalizarCompra = async () => {
        const usuarioLogado = getItem('usuarioLogado');

        // -------------DUVIDA---------------------
        // const userId2 = usuarioLogado.id;
        // console.log('id usuario:', userId2);
        // ----------------------------------------
            
        if (!usuarioLogado) {
            alert('Você precisa estar logado para finalizar a compra.');
            history.push('/login'); // Redirecionar para a página de login
            return;
        }

        const usuarioLogadoString = JSON.stringify(getItem('usuarioLogado'));
        const userId = usuarioLogadoString.split('"id":"')[1].split('"')[0];
        // console.log('id usuario:', userId); // checando

        const pedido = {
            valorTotal: subTotal,
            userId: userId,
            itens: data.map(e => ({ idProduto: e.id, quantidade: e.qtdItens }))
        }

        try {
            const response = await api.post('/pedido', pedido);
            atualizarEstoque(data)
            // console.log('Pedido criado com sucesso:', response.data); // checando

            // limpar o carrinho depois de finalizar a compra
            setData([]);
            history.push('/compra-realizada');
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
        }
    }

    
    const atualizarEstoque = async (data) => {
        try {
            const itensComprados = data.map((e) => ({ id: e.id, quantidade: e.qtdItens }));

            // acessando os detalhes de cada produto do banco de dados e atualizando o estoque
            for (const item of itensComprados) {
                const response = await api.get(`/produto/${item.id}`);

                if (response.data) {
                    const produto = response.data;
                    const estoqueAtualizado = produto.quantidade - item.quantidade;

                    await api.put(`/produto/${item.id}`, {...produto, quantidade: estoqueAtualizado });
                    console.log(`Estoque do produto ${item.id} atualizado para ${estoqueAtualizado}`);
                } else {
                    console.log(`Produto ${item.id} não encontrado na API`);
                }
            }

            console.log('Atualização do estoque concluída');
        } catch (error) {
            console.error('Erro ao atualizar o estoque:', error);
        }
    }

    const zerarCarrinho = () => {
        setData([])
    }

    return (
        <>
            <Cabecalho />

            <CartArea>
                {data.length === 0 ? (
                    <><br /><br /><br />
                        <p>O carrinho está vazio.</p>
                        <a href='/'><h2>Voltar a pagina principal</h2></a>
                        <br /><br /><br />
                    </>
                ) : (
                    data.map((e) => (
                        <div key={e.id}>
                            <img src={e.imgUrl} alt={e.descricao} />
                            <h4>{e.nome}</h4>
                            <h5>R$ {e.preco}</h5>
                            <span>
                                <label htmlFor={`quantidade-${e.id}`}>Quantidade: </label>
                                <input onClick={() => diminuir(e.id)} type="button" value=" - " />
                                <input
                                    id={`quantidade-${e.id}`}
                                    name="quantidade"
                                    className="text"
                                    size="2"
                                    type="text"
                                    maxLength="5"
                                    value={e.qtdItens}
                                    readOnly
                                />
                                <input onClick={() => aumentar(e)} type="button" value=" + " />
                            </span>
                            <button onClick={() => removeItem(e)}>x</button>
                        </div>
                    ))
                )}
            </CartArea>
            {data.length > 0 && (
                <DivFinal>
                    <div>
                        <h3>{`SubTotal: R$ ${subTotal.toFixed(2)}`}</h3>
                        <br />
                        <button onClick={finalizarCompra}>Finalizar Compra</button> <br /><br />
                        <button style={{background: 'red'}} onClick={zerarCarrinho}>Excluir carrinho</button>
                    </div>
                </DivFinal>
            )}
            <Rodape />
        </>
    )
}

export default Carrinho