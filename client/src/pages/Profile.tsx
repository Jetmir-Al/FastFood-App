import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuthHook } from '../hooks/useAuthHook';
import "./styles/profile.css";
import { logout } from '../api/auth.api';

const Profile = () => {

    const [updatePsw, setUpdatePsw] = useState<boolean>(false);
    const [newPsw, setNewPsw] = useState<string>("");
    const [oldPsw, setOldPsw] = useState<string>("");
    const navigate = useNavigate();
    const { user, setUser, setAuth } = useAuthHook();

    const logoutFunc = async () => {
        try {
            await logout();
            setAuth(false);
            setUser(null);
            navigate("/");
        } catch {
            // 
        }
    }

    return (
        <div className="customer-Container">

            <div className='custmoreInfo-container'>
                <div className='accInfo'>
                    <h1>{user?.name}</h1>
                    <h3>{user?.role.toUpperCase()}</h3>
                    <div className='accInfo-extra'>
                        <h3><FontAwesomeIcon className='icons' icon={faEnvelope} /> {
                            user?.email
                        }</h3>
                        <h3> <FontAwesomeIcon className='icons' icon={faPhoneVolume} /> {user?.phone}</h3>
                        {
                            updatePsw ? <form className="updatePsw" onSubmit={() => { }}>
                                <input className='inputPsw' type="password" placeholder="Enter your old password" onChange={(e) => setOldPsw(e.target.value)} />
                                <input className='inputPsw' type="password" placeholder="Enter your new password" onChange={(e) => setNewPsw(e.target.value)} />
                                <div className="accinfo-btns">
                                    <Button
                                        type="submit"
                                        className=''
                                        onClick={() => { }}>
                                        Submit
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setUpdatePsw(p => !p)}
                                        className=''>
                                        Cancel
                                    </Button>
                                </div>
                            </form> :
                                <Button
                                    className='updatePswBtn'
                                    type='button'
                                    onClick={() => setUpdatePsw(p => !p)}>
                                    Update password
                                </Button>
                        }
                    </div>
                    <div className="accountManagment">
                        <Button
                            type='button'
                            className=''
                            onClick={() => logoutFunc()}
                        >Logout
                        </Button>
                        <Button
                            className=''
                            type='button'
                            onClick={() => { }}>
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;