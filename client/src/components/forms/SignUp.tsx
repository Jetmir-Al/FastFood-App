import './auth.css';
import { useNavigate } from 'react-router';
import { useState, type ReactHTMLElement } from 'react';
import Button from '../ui/Button';
import { register } from '../../api/auth.api';

export const SignUp = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const [badInfo, setBadInfo] = useState(false);
    const BadInfo = () => setBadInfo(true);


    const signUp = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await register(name, email, psw, phone, role);
            // 
            navigate("/logIn");
        } catch (err: any | string) {
            // 
        }
    }

    return (
        <div className='signUp-Container'>
            <form className='signupForm' onSubmit={signUp}>
                <h1>Singup</h1>
                {
                    badInfo && <p id='' className='displayBadInfo'>Invalid Credecials!</p>
                }
                <label>
                    Name: <br />
                    <input className='signUpInput' type="text" placeholder='Name' required
                        onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Email: <br />
                    <input className='signUpInput' type="email" placeholder='Email' required
                        onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password: <br />
                    <input className='signUpInput' type="password" placeholder='Password' required
                        onChange={(e) => setPsw(e.target.value)} />
                </label>
                <label>
                    Phone Number: <br />
                    <input className='signUpInput' type="number" placeholder='Phone number' required onChange={(e) => setPhone(e.target.value)} />
                </label>
                <select id="role" className='role' name="role" required value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="" disabled>Select role</option>
                    <option value="customer">Customer</option>
                    <option value="delivery">Delivery Man</option>
                </select>

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
                <p>Already have a account? <Button
                    className='formToggle'
                    type='button'
                    onClick={() => { navigate("/login") }}
                >
                    Login
                </Button></p>

            </form>
        </div >
    );
}