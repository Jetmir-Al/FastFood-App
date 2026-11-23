import './auth.css';
import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { register } from '../../api/auth.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash, faHamburger, faPizzaSlice, faUtensils } from '@fortawesome/free-solid-svg-icons';

export const SignUp = () => {
    const navigate = useNavigate();
    const inFlight = useRef(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [badInfo, setBadInfo] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const signUp = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inFlight.current) return;

        inFlight.current = true;
        setIsPending(true);
        setBadInfo(false);

        try {
            const res = await register(name, email, psw, phone, role);
            if (res.message === "User Created") {
                navigate("/login");
            } else {
                setBadInfo(true);
            }
        } catch {
            setBadInfo(true);
        } finally {
            inFlight.current = false;
            setIsPending(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-shell auth-shell--signup">
                <form
                    className="auth-form auth-form--signup"
                    onSubmit={signUp}
                    onChange={() => setBadInfo(false)}
                    aria-labelledby="signup-title"
                    aria-describedby={badInfo ? 'signup-error' : undefined}
                    aria-busy={isPending}
                >
                    <header className="auth-form-header">
                        <p className="auth-eyebrow">Your FastFood account</p>
                        <h1 id="signup-title">Join the table.</h1>
                        <p>Create an account to get started. All fields are required.</p>
                    </header>

                    {badInfo && (
                        <p id="signup-error" className="auth-error" role="alert" aria-atomic="true">
                            We couldn’t create your account. Check your details and try again.
                        </p>
                    )}

                    <div className="auth-fields">
                        <div className="auth-field">
                            <label htmlFor="signup-name">Full name</label>
                            <input
                                id="signup-name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Your full name"
                                required
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="auth-field">
                            <label htmlFor="signup-email">Email address</label>
                            <input
                                id="signup-email"
                                name="email"
                                type="email"
                                autoComplete="username"
                                spellCheck={false}
                                placeholder="you@example.com"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="auth-field">
                            <label htmlFor="signup-password">Password</label>
                            <p id="signup-password-hint" className="auth-field-hint">Use at least 6 characters.</p>
                            <div className="auth-password">
                                <input
                                    id="signup-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    aria-describedby="signup-password-hint"
                                    minLength={6}
                                    required
                                    value={psw}
                                    onChange={(event) => setPsw(event.target.value)}
                                />
                                <button
                                    className="auth-password-toggle"
                                    type="button"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-controls="signup-password"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} aria-hidden="true" />
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div className="auth-field-row">
                            <div className="auth-field">
                                <label htmlFor="signup-phone">Phone number</label>
                                <input
                                    id="signup-phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    maxLength={20}
                                    placeholder="Your phone number"
                                    required
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </div>
                            <div className="auth-field">
                                <label htmlFor="signup-role">Account type</label>
                                <select
                                    id="signup-role"
                                    name="role"
                                    autoComplete="off"
                                    required
                                    value={role}
                                    onChange={(event) => setRole(event.target.value)}
                                >
                                    <option value="" disabled>Select a role</option>
                                    <option value="customer">Customer</option>
                                    <option value="delivery">Delivery Man</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="auth-actions">
                        <button className="auth-submit" type="submit" disabled={isPending}>
                            {isPending ? 'Creating account…' : 'Create account'}
                            {!isPending && <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />}
                        </button>
                        <button className="auth-cancel" type="button" onClick={() => navigate("/")}>
                            Cancel
                        </button>
                    </div>
                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </form>

                <aside className="auth-aside" aria-hidden="true">
                    <div className="auth-brand">
                        <span className="auth-brand-icon"><FontAwesomeIcon icon={faHamburger} /></span>
                        FastFood<span className="auth-brand-dot">.</span>
                    </div>
                    <div className="auth-aside-copy">
                        <p className="auth-aside-eyebrow">Make yourself at home</p>
                        <h2>A little hello.<br />A lot of flavor.</h2>
                        <p>There’s a place for you at our table.</p>
                    </div>
                    <div className="auth-food-art">
                        <span className="auth-food-orbit" />
                        <span className="auth-food-main"><FontAwesomeIcon icon={faHamburger} /></span>
                        <span className="auth-food-pizza"><FontAwesomeIcon icon={faPizzaSlice} /></span>
                        <span className="auth-food-utensils"><FontAwesomeIcon icon={faUtensils} /></span>
                        <span className="auth-food-spark auth-food-spark--one" />
                        <span className="auth-food-spark auth-food-spark--two" />
                    </div>
                    <p className="auth-aside-footer">Burgers. Pizza. Your kind of food.</p>
                </aside>
            </div>
        </div>
    );
};
