import Link from 'next/link';
import Image from 'next/image';
import classes from './page.module.css';

import icon from './favicon.ico';

export default function Home() {
  return (
    <div>
      <h6>
        <Image src={icon} alt="Task Space Logo" className={classes['heading-img']} />
      </h6>
      <h3 className={classes.heading}>
        Welcome to the
      </h3>
      <h1 className={classes['main-header']}>
        <span className="highlight">Task Space</span>
      </h1>
      <p className={classes.description}>Manage your tasks, organize, prioritize and accomplish your goals with clarity.</p>
      <div className={classes['register-buttons']}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <Link href='/register/?mode=signup' className={classes['sign-up-button']}>
          <i className="fas fa-rocket icon"></i> Get Started
        </Link>
        <Link href='/register/?mode=login' className={classes['sign-in-button']}>Sign In</Link>
      </div>
    </div >
  )
}
