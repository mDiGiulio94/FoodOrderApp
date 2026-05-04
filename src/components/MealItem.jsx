import { currencyFormatter } from "../utils/fomratting";
import Buttons from "./UI/Buttons";
import { useContext } from "react";
import CartContext from "../store/CartContext";
export default function MealItem({idMeal, meal}){

    const cartContext = useContext(CartContext);

    const handleAddMealToCart = () => {
        cartContext.addItem(meal);
    }

    return (
<>
  <li key={idMeal} className="meal-item">
          <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
              <h3>{meal.name}</h3>
              <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
              <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
            <Buttons onClick={handleAddMealToCart}>Add to Cart </Buttons>
            </p>
          </article>
        </li>
</>
    );
}