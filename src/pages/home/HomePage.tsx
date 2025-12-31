import { useState, useEffect } from "react";
import Recipe from "../../models/Recipe";
import RecipeFigures from "../../components/figures/RecipeFigures";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <div className="container">
            {recipes.length > 0 && (
                <div className="carousel-wrapper">
                    <Carousel showThumbs={false} infiniteLoop autoPlay interval={4000}>
                        {recipes.map((recipe) => (
                            <div key={recipe.id} onClick={() => navigateTo(recipe.id)} style={{ cursor: 'pointer' }}>
                                <img src={recipe.imageUrl} alt={recipe.name} />
                                <p className="legend">{recipe.name}</p>
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}

            <div className="row g-4 mt-4">
                {recipes.map((recipe) => (
                    <div
                        onClick={() => navigateTo(recipe.id)}
                        key={recipe.id}
                        className="col-xl-4 col-md-6 col-sm-12"
                    >
                        <RecipeFigures
                            id={recipe.id}
                            name={recipe.name}
                            description={recipe.description}
                            food_Type={recipe.food_Type}
                            imageUrl={recipe.imageUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    async function getRecipes(): Promise<void> {
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${localStorage.getItem('profile-token')}`,
                },
            };
            const resp = await fetch(process.env.REACT_APP_BASE_URL + '/recipes?random=3', options);
            if (resp.status === 401) {
                navigate('/');
            }
            const data = await resp.json();
            setRecipes(data);
        } catch (error) {
            console.error(error);
        }
    }

    function navigateTo(id: number) {
        navigate(`/view/${id}`);
    }
}

export default HomePage;
