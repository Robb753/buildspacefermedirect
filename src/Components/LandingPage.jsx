import React, { useState } from "react";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://farmedirect-6317c32e65bb.herokuapp.com/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage(
            "Merci de vous être inscrit ! Nous vous informerons dès que nous serons en ligne."
          );
          setEmail("");
        } else {
          setMessage("Une erreur s'est produite. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        setMessage("Une erreur s'est produite. Veuillez réessayer.");
      });
  };

  return (
    <div className="landing-page">
      <h1>Bienvenue sur FermeDirect</h1>
      <p>Inscrivez-vous pour être les premiers informés de notre lancement !</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse e-mail"
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LandingPage;
