import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Recipe from "../../models/Recipe";
import Button from 'react-bootstrap/Button';
import { Col, Row } from "react-bootstrap";
import './ViewPage.css'


function ViewPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [food_Type, setFood_Type] = useState('');
  // const [meat_Type, setMeat_Type] = useState('');
  // const [non_Meat_Type, setNon_Meat_Type] = useState('');
  const [steps, setSteps] = useState('')


  useEffect(() => {

    const asyncGetRecipeById = async () => {
      const url = process.env.REACT_APP_BASE_URL + `/recipes/${id}`;
      const options = {
        headers: { 'Content-Type': 'application/json', 'authorization': `${localStorage.getItem('profile-token')}` },
      }
      try {
        const response = await fetch(url, options);
        if (response.status === 401) {
          navigate('/')
        }
        const data = await response.json();
        console.log(data);

        setImageUrl(data.imageUrl)
        setName(data.name)
        setDescription(data.description)
        setFood_Type(data.food_Type)
        //setMeat_Type(data.meat_Type)
        //setNon_Meat_Type(data.non_Meat_Type)
        setSteps(data.steps)
      } catch (error) {
        console.error(error)

      }
    };
    if (id) {
      asyncGetRecipeById();
    }
  }, []);

  return (
    <div>

      <meta name="view-page" content="width=device-width, initial-scale=1.0" />
      <Row>
        <body className="container-body">
          <div className="wrapper">
            <Col className='col-5'>
              <img className="recipe-img" src={imageUrl}></img>
            </Col>
            <Col>
              <div className="recipe-img-info h2">
                <h2>Name: {name}</h2>
              </div>
              <div className="recipe-img-info h4">
                <h4>Food Type: {food_Type}</h4>
              </div>
          
          <div className="recipe-img-info p">
            <p>Description: {description}</p>
          </div>
          <div className="recipe-img-info p">
            <p>Steps: {steps}</p>
          </div>
         <div className="mt-3">
  <Button variant="danger" onClick={deleteRecipe}>Delete</Button>
  <Button variant="warning" className="ms-2" onClick={() => navigate(`/edit/${id}`)}>Edit</Button>
</div>

        </Col>

    </div>
        </body >
      </Row >
    </div >
  )

  function deleteRecipe() {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
  
    const asyncDeleteRecipe = async (id: string | undefined) => {
      try {
        let url = process.env.REACT_APP_BASE_URL + `/recipes/${id}`;
        let options = {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem('profile-token')}`
          }
        };
        const response = await fetch(url, options);
  
        if (response.ok) {
          navigate('/');
        } else {
          console.error("Failed to delete recipe:", await response.text());
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    asyncDeleteRecipe(id);
  }

 
  
}



export default ViewPage;