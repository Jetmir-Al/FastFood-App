import React, { useState } from "react";
import Button from "../ui/Button";
import "./foodForm.css";
import { addFoodItem } from "../../api/food.api";

const FoodForm = ({ setDisplay }: { setDisplay: () => void }) => {
    const [foodName, setFoodName] = useState<string>("");
    const [foodDesc, setFoodDesc] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [imgFile, setImgFile] = useState<File>();
    const [badInfo, setBadInfo] = useState<boolean>(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            console.log(files[0]);
            setImgFile(files[0]);
        }
    }

    const handleUpload = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (imgFile) {

                const res = await addFoodItem(foodName, foodDesc, price, imgFile);
                if (res.message === "Insert Succesfully!") {
                    setDisplay();
                }
            }
        } catch {
            setBadInfo(true);
        }

    }

    return (
        <div className="foodForm-container">
            <div className='foodItemHeader'>
                <h2 className="header-title">Add a food item!</h2>
            </div>
            <form className="addFoodItem" onSubmit={handleUpload}>
                {
                    badInfo && <h3>Invalid values!</h3>
                }
                <input type="text" placeholder="Enter food name:"
                    onChange={(e) => setFoodName(e.target.value)} />
                <input type="text" placeholder="Enter food description:"
                    onChange={(e) => setFoodDesc(e.target.value)} />
                <input type="number" placeholder="Enter price:"
                    onChange={(e) => setPrice(String(e.target.value))} />
                <input className="inputFile" type="file" onChange={handleFile} />
                <div className="addFoodBtns">

                    <Button
                        className="btn-login"
                        type="submit"
                    >
                        Upload
                    </Button>
                    <Button className="btn-login"
                        type="button"
                        onClick={() => setDisplay()}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FoodForm;