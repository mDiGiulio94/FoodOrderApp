import logoImg from '../assets/logo.jpg';
import Buttons from './UI/Buttons';
import CartContext from '../store/CartContext';
import { useContext} from 'react';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
const cartContext = useContext(CartContext);
const userProgressContext = useContext(UserProgressContext);

const handleShowCart = () => {
    userProgressContext.showCart();
}

// il metodo reduce serve a trasformare un array in un unico valore
const totalCartItem = cartContext.items.reduce((total, item) => total + item.quantity, 0);
    return (
        <header id="main-header" >
        <div id="title">
                <img src={logoImg} alt="A restaurant" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Buttons textOnly={true} onClick={handleShowCart}>Cart ({totalCartItem})</Buttons>
        </nav>
        </header>
    )
}