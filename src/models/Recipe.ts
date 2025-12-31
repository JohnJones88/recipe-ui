interface Recipe {
    id: number;
    userId: number;
    name: string;
    food_Type: string
    description: string
    //meat_Type: string;
    //non_Meat_Type: string;
    imageUrl: string;
    steps: string;
}

export default Recipe;