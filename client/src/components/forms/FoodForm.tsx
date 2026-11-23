import React, { useRef, useState } from "react";
import Button from "../ui/Button";
import "./foodForm.css";
import { addFoodItem } from "../../api/food.api";

const FoodForm = ({ setDisplay, reFetchFunc }: { setDisplay: () => void; reFetchFunc: () => void | Promise<void> }) => {
    const [foodName, setFoodName] = useState("");
    const [foodDesc, setFoodDesc] = useState("");
    const [price, setPrice] = useState("");
    const [imgFile, setImgFile] = useState<File>();
    const [badInfo, setBadInfo] = useState(false);
    const [pending, setPending] = useState(false);
    const [saved, setSaved] = useState(false);
    const submitting = useRef(false);

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => setImgFile(event.target.files?.[0]);
    const handleUpload = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting.current || !imgFile || saved) return;
        submitting.current = true;
        setPending(true);
        setBadInfo(false);
        try {
            const res = await addFoodItem(foodName, foodDesc, price, imgFile);
            if (res.message === "Insert Succesfully!") { setSaved(true); await reFetchFunc(); setDisplay(); }
        } catch { setBadInfo(true); }
        finally { submitting.current = false; setPending(false); }
    };
    return (
        <div className="foodForm-container page-shell">
            <div className="page-heading"><div><p className="eyebrow">Fresh on the menu</p><h1>Add a food item.</h1><p>Give your next menu favourite a name, description, and photo.</p></div><Button className="secondary" onClick={setDisplay}>Back to menu</Button></div>
            <form className="addFoodItem" onSubmit={handleUpload}>
                {badInfo && <div className="inline-alert"><p role="alert">{saved ? "The item was added, but the menu couldn’t be refreshed. Don’t submit it again." : "We couldn’t add this item. Check the details and try again."}</p>{saved && <Button className="text-button" disabled={pending} onClick={async () => { setPending(true); try { await reFetchFunc(); setDisplay(); } catch { setBadInfo(true); } finally { setPending(false); } }}>Refresh menu</Button>}</div>}
                <label htmlFor="food-name">Food name</label><input id="food-name" type="text" placeholder="e.g. Classic cheeseburger" required value={foodName} onChange={event => setFoodName(event.target.value)} />
                <label htmlFor="food-description">Description</label><textarea id="food-description" placeholder="What makes this bite special?" required rows={3} value={foodDesc} onChange={event => setFoodDesc(event.target.value)} />
                <label htmlFor="food-price">Price (€)</label><input id="food-price" type="number" min="0" step="0.01" required placeholder="0.00" value={price} onChange={event => setPrice(String(event.target.value))} />
                <label htmlFor="food-image">Food photo</label><p id="food-image-hint" className="field-hint">Choose an image that shows the food clearly.</p><input id="food-image" className="inputFile" type="file" accept="image/*" required aria-describedby="food-image-hint" onChange={handleFile} />
                {imgFile && <p className="selected-file">Selected: {imgFile.name}</p>}
                <div className="addFoodBtns"><Button type="submit" disabled={pending || saved}>{saved ? "Item added" : pending ? "Adding item…" : "Add to menu"}</Button><Button className="secondary" disabled={pending} onClick={setDisplay}>Cancel</Button></div>
            </form>
        </div>
    );
};
export default FoodForm;
