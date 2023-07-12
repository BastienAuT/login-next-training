"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Link from "next/link";


 
const Register = () => {
  const [err, setError] = useState(false);


const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      res.status === 201 && router.push("/login?success=Compte crée")
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="utilisateur"
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          required
        />
        <button className={styles.button}>REGISTER</button>
      </form>
      {err && "Quelque chose s'est mal passé!"}
      <Link href="/login"> Login avec un compte existant</Link>
    </div>
  );
};

export default Register;
