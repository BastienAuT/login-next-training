"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));

    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session.status, params, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {success ? success : "Soyez le bienvenue"}
      </h1>
      <h2 className={styles.subtitle}>Veuillez vous connecter.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Adresse mail"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          className={styles.input}
        />
        <button className={styles.button}>Connexion</button>
        {error && error}
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Connexion avec Google
      </button>
      <button
        onClick={() => {
          signIn("github");
        }}
        className={styles.button + " " + styles.github}
      >
        Connexion avec Github
      </button>
      <span className={styles.or}>- OU -</span>
      <Link className={styles.link} href="/register">
        Créez un nouveau compte
      </Link>
    </div>
  );
};

export default Login;
