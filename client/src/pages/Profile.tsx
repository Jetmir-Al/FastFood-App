import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuthHook } from '../hooks/useAuthHook';
import "./styles/profile.css";

const Profile = () => {

    const [updatePsw, setUpdatePsw] = useState(false);
    const [newPsw, setNewPsw] = useState("");
    const navigate = useNavigate();
    const { user } = useAuthHook();


    return (
        <div className="customer-Container">

            <div className='custmoreInfo-container'>
                <div className='accInfo'>
                    <h1>{"user?.name"}</h1>
                    <h3>{"user?.role.toUpperCase()"}</h3>
                    <div className='accInfo-extra'>
                        <h3><FontAwesomeIcon className='icons' icon={faEnvelope} /> {

                            "user?.email"
                        }</h3>
                        <h3> <FontAwesomeIcon className='icons' icon={faPhoneVolume} /> {"user?.phone"}</h3>
                        {
                            updatePsw ? <form className="updatePsw" onSubmit={() => { }}>
                                <input className='inputPsw' type="password" placeholder="Enter your new password" onChange={(e) => setNewPsw(e.target.value)} />
                                <div className="accinfo-btns">
                                    <button type="submit">Submit</button>
                                    <button type="button" onClick={() => setUpdatePsw(p => !p)}>Cancel</button>
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
                            onClick={() => { }}
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