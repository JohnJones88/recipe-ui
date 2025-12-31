import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Recipe from "../../models/Recipe";
import { errorMonitor } from "events";
import FigureRecipe from "../../components/figures/RecipeFigures";
import Steps from "../../models/Steps";



function MyRecipePage(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([])
    //const [mySteps, setMySteps] = useState<Steps[]>([])
   useEffect(() => {
    const asyncgetMyRecipes = async () => {
        const url = process.env.REACT_APP_BASE_URL + `/recipes/${id}`;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${localStorage.getItem('profile-token')}`
            }
        };
        try {
            const response = await fetch(url, options);
            if (response.status === 401) {
                navigate('/');
                return;
            }
            const data = await response.json();
            console.log("Fetched data:", data);

            if (Array.isArray(data)) {
                setMyRecipes(data);
            } else if (Array.isArray(data.recipes)) {
                setMyRecipes(data.recipes); // if your API returns { recipes: [...] }
            } else {
                console.error("Unexpected data format:", data);
                setMyRecipes([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    asyncgetMyRecipes();
}, [id, navigate]);


    return(
        <div className="container">
            <div className="row g-4">
                {myRecipes.map((recipe) => (
                    <div onClick={() => navigateTo(recipe.id)} key={recipe.id} className="col-xl-4 col-md-6 col-sm-12">
                        <FigureRecipe id={recipe.id} name={recipe.name} description={recipe.description} food_Type={recipe.food_Type}/*meat_Type={recipe.meat_Type} non_Meat_Type={recipe.non_Meat_Type}*/ imageUrl={recipe.imageUrl}  />
                    </div>
                ))}
            </div>

        </div>
    );

    function navigateTo(id:number){
        const asyncNavigateTo = async (id:number) => {
            try {
                navigate(`/view/${id}`)
            } catch (error) {
                console.error(error)
                
            }

        }
        asyncNavigateTo(id);
    }
    
}

export default MyRecipePage;