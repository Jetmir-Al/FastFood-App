import './orderForm.css';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { getFoodItems } from '../../api/food.api';
import { type IMenu } from '../../types/foodTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
    const navigate = useNavigate();
    const [submitOrder, setSubmitOrder] = useState(false);
    const [food, setFood] = useState<IMenu[] | null>(null);
    const [foodID, setFoodID] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [address, setAdress] = useState('');
    useEffect(() => {
        const foodList = async () => {
            try {
                const foods = await getFoodItems();
                setFood(foods);
            } catch (err) {
                console.log("Diqka shkoj keq: ", err);
            }
        }
        foodList();
    }, []);



    return (
        <>
            <div className='order-container'>

                <form className='order' onSubmit={() => { }}>
                    <h2 className='authTitle'>
                        Order <FontAwesomeIcon icon={faHamburger} />
                    </h2>
                    {
                        submitOrder &&
                        <h3 className='submitOrder'>
                            Your order has been submited!
                        </h3>
                    }
                    <label className='orderLbl'>
                        Your address here: <br />
                        <input type="text"
                            onChange={(e) => setAdress(e.target.value)} required />
                    </label>
                    <label className='orderLbl'>
                        Menu: <br />
                        <select id="orderItem" className='orderItem' name="orderItem" required
                            value={foodID}
                            onChange={(e) => setFoodID(e.target.value)}
                        >
                            <option value="" disabled>Select Food to Order:</option>
                            {
                                food?.map((res: IMenu) => (
                                    <option key={res.foodID} value={res.foodID}>{res.foodName} ~ {res.price}€</option>
                                ))
                            }
                        </select>
                    </label>
                    <label className='orderLbl'>
                        Quantity: <br />
                        <input type="number" onChange={(e) => setQuantity(e.target.valueAsNumber)} required />
                    </label>
                    <div className='btn-continer'>
                        <Button
                            className='btn-login'
                            type="submit"
                            onClick={() => { }}>
                            Submit
                        </Button>
                        <Button
                            className='btn-login'
                            type='button'
                            onClick={() => { navigate("/") }}>
                            Cancel
                        </Button>

                    </div>
                </form>
            </div>
        </>
    );
}

export default Order;