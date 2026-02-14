import './auth.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Button from '../ui/Button';
import { register } from '../../api/auth.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

export const SignUp = () => {

    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [psw, setPsw] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [role, setRole] = useState<string>('');

    const [badInfo, setBadInfo] = useState<boolean>(false);


    const signUp = async (event: React.SubmitEvent<HTMLFormElement>) => {
        console.log(name, email, psw, phone, role)
        event.preventDefault();
        try {
            const res = await register(name, email, psw, phone, role);
            if (res.message === "User Created") {
                navigate("/login");
            }
        } catch {
            setBadInfo(true);
        }
    }

    return (
        <div className='signUp-Container'>
            <form className='signupForm' onSubmit={signUp}>
                <h2 className='authTitle'>
                    Singup <FontAwesomeIcon icon={faHamburger} />
                </h2>
                {
                    badInfo && <p className='displayBadInfo'>Invalid Credecials!</p>
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
                        minLength={6}
                        onChange={(e) => setPsw(e.target.value)} />
                </label>
                <label>
                    Phone Number: <br />
                    <input className='signUpInput' type="number"
                        maxLength={20} placeholder='Phone number' required onChange={(e) => setPhone(e.target.value)} />
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