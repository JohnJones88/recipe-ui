import Figure from 'react-bootstrap/Figure';
import FigureImage from 'react-bootstrap/FigureImage'
import FigureCaption from 'react-bootstrap/FigureCaption'
import React from 'react';



interface FigureProps{
    id: number
    imageUrl: string
    name: string
    description: string
    food_Type: string
   // meat_Type: string
   //non_Meat_Type: string

}

function FigureRecipe({ id, imageUrl, name, description, food_Type /*meat_Type, non_Meat_Type*/}: FigureProps){


  return (
    <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={imageUrl}
      />
      <Figure.Caption className='container'>
        <div>
            <h5 className='figure-name'>{name}</h5>
            <h6 className='figure-description'>{description}</h6>
            <h6 className='figure-foodType'>{food_Type}</h6>
            
            
        </div>
        
      </Figure.Caption>
    </Figure>
  );
}

export default FigureRecipe;