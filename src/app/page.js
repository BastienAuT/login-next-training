"use client"
import styles from "./page.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
Bienvenue sur la page d'entraînement de différents types de login de Bastien Autem!
      </p>
      {session.data?.user ? (
        <div>
          <h1>Welcome, {session.data.user.name}!</h1>
          <button onClick={handleSignOut} className={styles.button}>Disconnect</button>
        </div>
      ) : (
        <Link className={styles.link} href="/login">
          <button className={styles.button}>Log in</button>
        </Link>
      )}

      <span className={styles.or}>- OR -</span>

      <Link className={styles.link} href="/register">
        Create a new account
      </Link>
    </div>
  );
}
