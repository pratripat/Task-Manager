import Link from 'next/link';
import { useState } from 'react';

import classes from '../app/register/page.module.css';
import { auth } from '@/actions/auth-actions';

export default function AuthForm({ mode }) {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const formData = new FormData(e.target);
        const result = await auth(mode, formData);

        if (result.errors) {
            setErrors(result.errors);
        }
        setIsLoading(false);
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.card}>
                    <h1 className={classes.title}>
                        Welcome to <span className={classes.highlight}>TaskSpace</span>
                    </h1>
                    <p className={classes.subtitle}>
                        Enter your credentials to access your cosmic workspace
                    </p>

                    <div className={classes.tabContainer}>
                        <Link
                            href='/register?mode=login'
                            className={`${classes.tab} ${mode === 'login' ? classes.activeTab : ''}`}
                            onClick={() => setErrors({})}
                        >
                            Log in
                        </Link>
                        <Link
                            href='/register?mode=signup'
                            className={`${classes.tab} ${mode === 'signup' ? classes.activeTab : ''}`}
                            onClick={() => setErrors({})}
                        >
                            Sign up
                        </Link>
                    </div>

                    <form className={classes.form} onSubmit={handleSubmit}>
                        <div className={classes.inputGroup}>
                            <span className={classes.icon}>📧</span>
                            <input id="email" name="email" type="email" placeholder="cosmic@space.com" />
                        </div>

                        <div className={classes.inputGroup}>
                            <span className={classes.icon}>🔒</span>
                            <input id="password" name="password" type="password" placeholder="••••••••" />
                        </div>

                        {Object.keys(errors).length > 0 && (
                            <ul id="form-errors">
                                {Object.keys(errors).map((error) => (
                                    <li key={error}>{errors[error]}</li>
                                ))}
                            </ul>
                        )}

                        <button className={classes.registerButton} disabled={isLoading} type="submit">
                            {/* {
                                (mode === 'login') ? 'Login' : 'Sign up'
                            } */}
                            {isLoading ? 'Loading...' : mode === 'login' ? 'Log in' : 'Sign up'}
                            <span className={classes.arrow}>{'->'}</span>
                        </button>
                    </form>

                    <a href="/" className={classes.backLink}>Back to home</a>
                </div>
            </div>
        </>
    )
}