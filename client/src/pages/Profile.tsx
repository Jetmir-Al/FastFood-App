import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useRef, useState } from 'react';
import { useAuthHook } from '../hooks/useAuthHook';
import "./styles/profile.css";
import { useDeleteAcc, useLogout } from '../services/auth.services';
import ActiveOrders from '../components/order/ActiveOrders';
import OrderHistory from '../components/order/OrderHistory';
import { UpdatePsw } from '../api/auth.api';
import DeliveryHistory from '../components/delivery/DeliveryHistory';

const Profile = () => {
    const [updatePsw, setUpdatePsw] = useState(false);
    const [newPsw, setNewPsw] = useState("");
    const [oldPsw, setOldPsw] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const inFlight = useRef(false);
    const { user, reFetchFunc } = useAuthHook();
    const Logout = useLogout();
    const DeleteAcc = useDeleteAcc();

    const updatePassword = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inFlight.current) return;
        inFlight.current = true;
        setPending(true);
        setError("");
        setSuccess("");
        try {
            const res = await UpdatePsw(oldPsw, newPsw);
            if (res.message === "Password updated") {
                reFetchFunc(true);
                setUpdatePsw(false);
                setOldPsw("");
                setNewPsw("");
                setSuccess("Your password has been updated.");
            }
        } catch { setError("We couldn’t update your password. Check your current password and try again."); }
        finally { inFlight.current = false; setPending(false); }
    };
    const accountAction = async (action: 'logout' | 'delete') => {
        if (inFlight.current) return;
        inFlight.current = true;
        setPending(true);
        setError("");
        try { if (action === 'logout') await Logout(); else await DeleteAcc(); }
        catch { setError(action === 'logout' ? "We couldn’t sign you out. Please try again." : "We couldn’t delete your account. Please try again."); }
        finally { inFlight.current = false; setPending(false); setConfirmDelete(false); }
    };
    return <div className="profile-page page-shell">
        <div className="page-heading"><div><p className="eyebrow">Your little corner of FastFood</p><h1>My account.</h1><p>Your details, your orders, your next good food moment.</p></div></div>
        <section className="profile-card">
            <div className="profile-identity"><span className="profile-avatar"><FontAwesomeIcon icon={faUser} /></span><div><p className="eyebrow">{user?.role === 'delivery' ? 'Delivery team' : user?.role === 'admin' ? 'Kitchen admin' : 'At the table'}</p><h2>{user?.name}</h2><span className="profile-role">{user?.role}</span></div></div>
            <div className="profile-details"><p><FontAwesomeIcon icon={faEnvelope} /><span><small>Email address</small>{user?.email}</span></p><p><FontAwesomeIcon icon={faPhone} /><span><small>Phone number</small>{user?.phone}</span></p></div>
            <div className="profile-actions"><Button className="secondary" disabled={pending} aria-expanded={updatePsw} aria-controls="password-settings" onClick={() => { setUpdatePsw(value => !value); setError(""); setSuccess(""); }}>Change password</Button><Button className="text-button" disabled={pending} onClick={() => accountAction('logout')}>Sign out</Button></div>
        </section>
        {error && <p role="alert" className="inline-alert profile-feedback">{error}</p>}
        {success && <p role="status" className="inline-alert success profile-feedback">{success}</p>}
        <div id="password-settings" hidden={!updatePsw}>{updatePsw && <form className="password-settings" onSubmit={updatePassword}><div><p className="eyebrow">Keep your account yours</p><h2>Change password</h2></div><div className="password-fields"><div><label htmlFor="old-password">Current password</label><input id="old-password" name="current-password" type="password" autoComplete="current-password" required value={oldPsw} onChange={event => setOldPsw(event.target.value)} /></div><div><label htmlFor="new-password">New password</label><input id="new-password" name="new-password" type="password" autoComplete="new-password" required value={newPsw} onChange={event => setNewPsw(event.target.value)} /></div></div><div className="password-actions"><Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save password"}</Button><Button className="secondary" disabled={pending} onClick={() => setUpdatePsw(false)}>Cancel</Button></div></form>}</div>
        <div className="profile-history">{user?.role === "customer" ? <><ActiveOrders /><OrderHistory /></> : user?.role === "delivery" && <DeliveryHistory />}</div>
        <section className="account-danger-zone"><div><h2>Account management</h2><p>Deleting your account is permanent. Make sure you’re ready before continuing.</p></div><Button className="danger" disabled={pending} onClick={() => setConfirmDelete(true)}>Delete account</Button></section>
        {confirmDelete && <ConfirmDialog title="Delete your account?" description="This permanently deletes your FastFood account. This action cannot be undone." confirmLabel="Delete account" pending={pending} onClose={() => setConfirmDelete(false)} onConfirm={() => accountAction('delete')} />}
    </div>;
};
export default Profile;
