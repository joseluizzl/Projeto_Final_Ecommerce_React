import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Cadastro from '../pages/Cadastro/Cadastro'
import Login from '../pages/Login/Login'
import Categoria from '../pages/Categoria/Categoria'
import Produto from '../pages/Produto/Produto'
import Carrinho from '../pages/Carrinho/Carrinho'
import CompraRealizada from '../pages/CompraRealizada/CompraRealizada'

const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/cadastro' component={Cadastro} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/categoria/:nomeCategoria' component={Categoria} />
                    <Route exact path='/produto/:id' component={Produto} />
                    <Route exact path='/carrinho' component={Carrinho} />
                    <Route exact path="/compra-realizada" component={CompraRealizada} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Routes