import Link from 'next/link';
import { useActionState } from 'react';

import classes from '../app/register/page.module.css';
import { signup } from '@/actions/auth-actions';

export default function AuthForm({ mode }) {
    const [formState, formAction] = useActionState(signup, {});
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
                        >
                            Login
                        </Link>
                        <Link
                            href='/register?mode=signup'
                            className={`${classes.tab} ${mode === 'signup' ? classes.activeTab : ''}`}
                        >
                            Register
                        </Link>
                    </div>

                    <form className={classes.form} action={formAction}>
                        <div className={classes.inputGroup}>
                            <span className={classes.icon}>📧</span>
                            <input id="email" name="email" type="email" placeholder="cosmic@space.com" />
                        </div>

                        <div className={classes.inputGroup}>
                            <span className={classes.icon}>🔒</span>
                            <input id="password" name="password" type="password" placeholder="••••••••" />
                        </div>

                        {formState.errors && (
                            <ul id="form-error">
                                {Object.keys(formState.errors).map((error) => (
                                    <li key={error}>{formState.errors[error]}</li>
                                ))}
                            </ul>
                        )}

                        <button className={classes.loginButton} type="submit">
                            {
                                (mode === 'login') ? 'Login' : 'Sign up'
                            }
                            <span className={classes.arrow}>{'->'}</span>
                        </button>
                    </form>

                    <a href="/" className={classes.backLink}>Back to home</a>
                </div>
            </div>
        </>
    )
}