import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          return;
        }

        const meals = await response.json();
        setMeals(meals);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => (
      <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
}