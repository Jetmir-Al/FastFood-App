import './orderForm.css';
import { useNavigate, Link } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { getFoodItems, getImageUrl } from '../../api/food.api';
import { type IMenu } from '../../types/foodTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useOrderForm } from '../../services/orders.services';

const Order = () => {
    const navigate = useNavigate();
    const [submitOrder, setSubmitOrder] = useState(false);
    const [submitErr, setSubmitErr] = useState(false);
    const [food, setFood] = useState<IMenu[] | null>(null);
    const [foodID, setFoodID] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [address, setAdress] = useState('');
    const [loading, setLoading] = useState(true);
    const [foodError, setFoodError] = useState(false);
    const [pending, setPending] = useState(false);
    const [retry, setRetry] = useState(0);
    const submitting = useRef(false);
    const orderForm = useOrderForm();

    useEffect(() => {
        const foodList = async () => {
            setLoading(true);
            setFoodError(false);
            try { setFood(await getFoodItems()); }
            catch { setFoodError(true); }
            finally { setLoading(false); }
        };
        foodList();
    }, [retry]);

    const OrderFormFunc = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting.current) return;
        submitting.current = true;
        setPending(true);
        setSubmitErr(false);
        try {
            const res = await orderForm(address, foodID, quantity);
            if (res.message === "Inserted Successfully!") { setSubmitOrder(true); setSubmitErr(false); }
        } catch { setSubmitErr(true); setSubmitOrder(false); }
        finally { submitting.current = false; setPending(false); }
    };
    const selectedFood = food?.find(item => Number(item.foodID) === foodID);
    return (
        <div className="order-page page-shell">
            <div className="page-heading"><div><p className="eyebrow">Good food is on the way</p><h1>Let’s make it an order.</h1><p>Choose your bite. Tell us where. We’ll take it from here.</p></div><Link to="/menu" className="text-link">Back to menu</Link></div>
            {submitOrder ? <section className="order-success"><FontAwesomeIcon icon={faCheckCircle} /><h2>Your order is in!</h2><p role="status">You can follow your order’s status from your account.</p><Link to="/profile" className="button-link">View my orders<FontAwesomeIcon icon={faArrowRight} /></Link></section> : <div className="order-layout">
                <form className="order" onSubmit={OrderFormFunc}>
                    <div className="order-form-heading"><span>01</span><div><h2>Your order details</h2><p>All fields are required.</p></div></div>
                    {submitErr && <p role="alert" className="inline-alert">We couldn’t place your order. Please try again.</p>}
                    {foodError && <div className="inline-alert"><p role="alert">The menu couldn’t be loaded.</p><Button className="text-button" onClick={() => setRetry(value => value + 1)}>Try again</Button></div>}
                    <label htmlFor="orderItem">Choose your food</label><select id="orderItem" name="orderItem" required value={foodID || ""} disabled={loading || foodError} onChange={event => setFoodID(Number(event.target.value))}><option value="" disabled>{loading ? "Loading the menu…" : "Select your favourite"}</option>{food?.map(item => <option key={item.foodID} value={Number(item.foodID)}>{item.foodName} ~ {item.price}€</option>)}</select>
                    {!loading && !foodError && food?.length === 0 && <p className="inline-alert">There are no menu items available to order yet.</p>}
                    <label htmlFor="order-quantity">Quantity</label><input id="order-quantity" type="number" min={1} step={1} value={Number.isNaN(quantity) ? "" : quantity} onChange={event => setQuantity(event.target.valueAsNumber)} required />
                    <label htmlFor="order-address">Delivery address</label><input id="order-address" name="address" type="text" autoComplete="street-address" placeholder="Street, house number, city" value={address} onChange={event => setAdress(event.target.value)} required />
                    <p className="field-hint">Include any apartment or floor details so your driver can find you.</p>
                    <div className="order-form-actions"><Button type="submit" disabled={pending || loading || foodError || !food?.length}>{pending ? "Placing your order…" : "Place order"}<FontAwesomeIcon icon={faArrowRight} /></Button><Button className="secondary" onClick={() => navigate("/")}>Cancel</Button></div>
                </form>
                <aside className="order-summary"><p className="eyebrow">A little preview</p><h2>Your next good bite.</h2>{selectedFood ? <><img src={getImageUrl(selectedFood.foodImg)} alt={selectedFood.foodName} /><h3>{selectedFood.foodName}</h3><p>{selectedFood.foodDesc}</p><div className="summary-line"><span>Price per item</span><strong>€{Number(selectedFood.price).toFixed(2)}</strong></div><div className="summary-line"><span>Quantity</span><strong>{Number.isNaN(quantity) ? "—" : quantity}</strong></div><div className="summary-total"><span>Food total</span><strong>€{(Number(selectedFood.price) * (Number.isNaN(quantity) ? 0 : quantity)).toFixed(2)}</strong></div></> : <div className="summary-placeholder"><FontAwesomeIcon icon={faBagShopping} /><p>Pick something delicious.<br />Your order preview will appear here.</p></div>}<p className="summary-note">Review your details before placing your order.</p></aside>
            </div>}
        </div>
    );
};
export default Order;
