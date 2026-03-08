import type { IUpdateDelivery } from "../../types/deliveryTypes";
import Button from "../ui/Button";
import "./updateDelivery.css";

const UpdateDelivery = ({ deliveryID, customer, address, deliveryMan }: IUpdateDelivery) => {
    return (
        <div className="updateForm-container">
            <div className="updateForm">
                <div className="deliveryInfo">
                    <h1>{deliveryID}</h1>
                    <h1>{customer}</h1>
                    <h1>{address}</h1>
                    <h1>{deliveryMan}</h1>
                </div>
                <form className="deliveryForm">
                    <label>
                        New Delivery Man <br />
                        <input type="text" className="" required />
                    </label>
                    <Button
                        className=""
                        type="submit"
                        onClick={() => { }}>
                        Submit
                    </Button>
                    <Button
                        className=""
                        type="button"
                        onClick={() => { }}>
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default UpdateDelivery;