
// to be made
import './auth.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';


export const LogIn = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    const [badInfo, setBadInfo] = useState<boolean>(false);
    // const BadInfo = () => setBadInfo(true);
    const login = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // 
        } catch (error: any) {
            // 
            console.log(error);
        }
    }

    return (
        <div className='login-Container'>
            <form className='loginForm' onSubmit={login}>
                <h2 className='authTitle'>
                    Login <FontAwesomeIcon icon={faPizzaSlice} />
                </h2>
                {
                    badInfo && <p id='' className='displayBadInfo'>Invalid Credecials!</p>
                }
                <label>
                    Email: <br />
                    <input type="email" className='loginInput' placeholder='Email' required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password: <br />

                    <input type="password" className='loginInput' placeholder='Password' required
                        minLength={6}
                        onChange={(e) => setPsw(e.target.value)} />
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
                        onClick={() => navigate("/")}>
                        Cancel
                    </Button>
                </div>
                <p>Dont have a account? <Button
                    className='formToggle'
                    type='button'
                    onClick={() => navigate("/signup")}
                >
                    Signup
                </Button></p>

            </form>
        </div>
    );
}



