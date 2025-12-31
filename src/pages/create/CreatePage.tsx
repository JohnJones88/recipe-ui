import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import Form from 'react-bootstrap/Form';
import './CreatePage.css';


function CreatePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [food_Type, setFood_Type] = useState('')
    const [description, setDescription] = useState('');
   // const [meat_Type, setMeat_Type] = useState('');
   // const [non_Meat_Type, setNon_Meat_Type] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [step, setStep] = useState([{ sortNumber: '', recDescription: '' }]); // Store steps as an array of objects
    const [sortNumber, setSortNumber] = useState('');
    const [recDescription, setRecDescription] = useState('');

    const uploadImage = async (rawImage: any) => {
        if (rawImage == null) return;
        const imageRef = ref(storage, `images/${rawImage.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, rawImage);
        const url = await getDownloadURL(snapshot.ref);
        setImageUrl(url);
    };

    // Handle adding new step
    const addSteps = () => {
    const trimmedSortNumber = sortNumber.trim();
    const trimmedDescription = recDescription.trim();

    if (!trimmedSortNumber || !trimmedDescription) {
        alert("Please provide both a step number and description.");
        return;
    }

    const numericSort = Number(trimmedSortNumber);

    if (isNaN(numericSort) || numericSort <= 0) {
        alert("Step number must be a number greater than 0.");
        return;
    }

    const isDuplicate = step.some(s => Number(s.sortNumber) === numericSort);
    if (isDuplicate) {
        alert(`Step number ${numericSort} already exists. Please use a unique number.`);
        return;
    }

    const newStep = { sortNumber: numericSort.toString(), recDescription: trimmedDescription };
    setStep((prevStep) => [...prevStep, newStep]);
    setSortNumber('');
    setRecDescription('');
};



    const addRecipe = async () => {
        const url = process.env.REACT_APP_BASE_URL + '/recipes';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': `${localStorage.getItem('profile-token')}` },
            body: JSON.stringify({ name, /*meat_Type, non_Meat_Type*/food_Type,description, imageUrl, step })
        };
        try {
            const response = await fetch(url, options);
            if (response.status === 401) {
                navigate('/');
            }
            const data = await response.json();
            console.log(data);
            navigate(`/view/${data.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container pt-6">
            <div className="CreatePage">
                <input type="file" onChange={(e) => {
                    if (e.target.files == null) {
                        return;
                    }
                    uploadImage(e.target.files[0]);
                }} />
               {imageUrl && (
  <img
    src={imageUrl}
    alt="Uploaded"
    className="img-fluid uploaded-image"
  />
)}

            </div>

            <div className="row mb-3">
                <div className="col-4">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" placeholder="Enter Recipe name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="col-4">
                    <label className="form-label">Description</label>
                    <input className="form-control" type="text" placeholder="Enter Recipe description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-4">
                    <Form.Select className="form-label" aria-label="Default select example" value={food_Type} onChange={(e) => { setFood_Type(e.target.value) }}>
                        <option>Choose the Meat Type</option>
                        <option value="Beef">Beef</option>
                        <option value="Pork">Pork</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Plant Based">Plant Based</option>
                        <option value="No Meat">No Meat</option>
                        <option value="Starch">Starch</option>
                        <option value="Vegetable">Vegetable</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Fruit">Fruit</option>
                    </Form.Select>
                </div>
            </div>

            <div className="row mb-3">
                

                <div>
                    <button type="button" className="btn btn-secondary" onClick={addSteps}>Add New Step</button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-4">
                    <label className="form-label">Sort Number</label>
                    <input className="form-control" type="number" placeholder="Enter Step Sort Number" value={sortNumber} onChange={(e) => { setSortNumber(e.target.value) }} min="0" />
                </div>
                <div className="col-4">
                    <label className="form-label">Step Description</label>
                    <input className="form-control" type="text" placeholder="Enter Step Description" value={recDescription} onChange={(e) => { setRecDescription(e.target.value) }} />
                </div>
            </div>

            <div>
                <button type="button" className="btn btn-primary" onClick={addRecipe}>Create</button>
            </div>

            {/* Displaying added steps */}
           {[...step]
  .sort((a, b) => Number(a.sortNumber) - Number(b.sortNumber))
  .map((step, index) => (
    <li key={index}>Step {step.sortNumber}: {step.recDescription}</li>
))}

        </div>
    );
}

export default CreatePage;
