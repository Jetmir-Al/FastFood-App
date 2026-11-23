import './auth.css';
import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash, faHamburger, faPizzaSlice, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useAuthHook } from '../../hooks/useAuthHook';
import { login } from '../../api/auth.api';

export const LogIn = () => {
    const navigate = useNavigate();
    const { setUser, setAuth } = useAuthHook();
    const inFlight = useRef(false);

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [badInfo, setBadInfo] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const loginForm = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inFlight.current) return;

        inFlight.current = true;
        setIsPending(true);
        setBadInfo(false);

        try {
            const res = await login(email, psw);
            if (res.message === "User loged in!") {
                setAuth(true);
                setUser(res.user);
                navigate("/profile");
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
            <div className="auth-shell">
                <form
                    className="auth-form auth-form--login"
                    onSubmit={loginForm}
                    onChange={() => setBadInfo(false)}
                    aria-labelledby="login-title"
                    aria-describedby={badInfo ? 'login-error' : undefined}
                    aria-busy={isPending}
                >
                    <header className="auth-form-header">
                        <p className="auth-eyebrow">Your FastFood account</p>
                        <h1 id="login-title">Welcome back.</h1>
                        <p>Sign in and pick up where you left off.</p>
                    </header>

                    {badInfo && (
                        <p id="login-error" className="auth-error" role="alert" aria-atomic="true">
                            We couldn’t sign you in. Check your email and password, then try again.
                        </p>
                    )}

                    <div className="auth-fields">
                        <div className="auth-field">
                            <label htmlFor="login-email">Email address</label>
                            <input
                                id="login-email"
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
                            <label htmlFor="login-password">Password</label>
                            <div className="auth-password">
                                <input
                                    id="login-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    enterKeyHint="go"
                                    required
                                    value={psw}
                                    onChange={(event) => setPsw(event.target.value)}
                                />
                                <button
                                    className="auth-password-toggle"
                                    type="button"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-controls="login-password"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} aria-hidden="true" />
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="auth-actions">
                        <button className="auth-submit" type="submit" disabled={isPending}>
                            {isPending ? 'Signing in…' : 'Sign in'}
                            {!isPending && <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />}
                        </button>
                        <button className="auth-cancel" type="button" onClick={() => navigate("/")}>
                            Cancel
                        </button>
                    </div>
                    <p className="auth-switch">
                        New here? <Link to="/signup">Create an account</Link>
                    </p>
                </form>

                <aside className="auth-aside" aria-hidden="true">
                    <div className="auth-brand">
                        <span className="auth-brand-icon"><FontAwesomeIcon icon={faHamburger} /></span>
                        FastFood<span className="auth-brand-dot">.</span>
                    </div>
                    <div className="auth-aside-copy">
                        <p className="auth-aside-eyebrow">A seat at the table</p>
                        <h2>Big appetite.<br />Good to see you.</h2>
                        <p>Your next bite starts here.</p>
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
