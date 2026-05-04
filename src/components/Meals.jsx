import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
 
   const {data : meals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, []);

   if(isLoading){
    return <p className="center">Fetching meals...</p>
   }

   if(error){
    return <Error title="Failed to fetch meals" message={error.message || "Something went wrong"}/>
   }

  return (
    <ul id="meals">
      {meals?.map((meal) => (
      <MealItem idMeal={meal?.id} meal={meal}/>
      ))}
    </ul>
  );
}