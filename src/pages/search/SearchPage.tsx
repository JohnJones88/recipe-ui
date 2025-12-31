import { useEffect, useState } from "react";
import Recipe from "../../models/Recipe";
import { useNavigate } from "react-router-dom";
import FigureRecipe from "../../components/figures/RecipeFigures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchPage(){
    const navigate = useNavigate();
    const [searches, setSearches] = useState<Recipe[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {

    }, []);

    return(
        <div>
      <form onSubmit={submitForm}>
        <div className="search">
          <span className="search-icon">
            <FontAwesomeIcon icon={faSearch} onClick={searchRecipe} />
          </span>
          <input className="search-input" type="search" placeholder="Search" value={name} onChange={(e) => { setName(e.target.value) }} />
        </div>
      </form>
      <div className="container">
        <div className="row g-4">
          {searches.map((recipe) => (
            <div onClick={() => navigate(`/view/${recipe.id}`)} key={recipe.id} className="col-xl-4 col-md-6 col-sm-12">
              <FigureRecipe id={recipe.id} name={recipe.name} description={recipe.description} imageUrl={recipe.imageUrl} food_Type={recipe.food_Type} />
            </div>
          ))}
        </div>
      </div>
    </div>
    );

    function searchRecipe(){
        const asyncPostRecipeSearch = async () => {
            const url = process.env.REACT_APP_BASE_URL + '/recipes/search';

            const options = {
                method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': `${localStorage.getItem('profile-token')}` },
        body: JSON.stringify({ name: name })
            }

            try {
                const response = await fetch(url,options)
                if(response.status === 401){
                    navigate('/')
                }
                const data = await response.json();
                setSearches(data)
            } catch (error) {
                console.error(error)
                
            }
        }
        asyncPostRecipeSearch();
    }
    function submitForm(e: any){
        e.preventDefault();

        if (!name)
            return;
        searchRecipe();
    }
}

export default SearchPage;