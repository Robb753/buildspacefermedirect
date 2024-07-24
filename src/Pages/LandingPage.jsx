import React, { useState } from "react";
import { Link } from "react-router-dom";// Assurez-vous d'avoir un fichier CSS séparé pour les styles
import backgroundVideo from "../assets/img/2547258-uhd_3840_2160_30fps.mp4";
import "bootstrap/dist/css/bootstrap.min.css";


const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

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
            "Thank you for signing up! We will notify you as soon as we go live."
          );
          setEmail("");
          setConsent(false); // Reset the consent checkbox
        } else {
          setMessage("An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again.");
        console.error("Erreur:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <video src={backgroundVideo} autoPlay loop muted playsInline></video>
      <header className="landing-page-header">
        <h1>
          Exploring <span>Farming</span>
          <p>Sign up to be the first to know about our launch!</p>
        </h1>
        <Link to="/home" className="btn btn-outline-success mt-3">
          Enter
        </Link>
      </header>
      <div className="description">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="form-control"
          />
          <div className="form-check form-switch mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="consentCheck"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <label className="form-check-label" htmlFor="consentCheck">
              I agree to the processing of my personal data in accordance with
              the GDPR.
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-success mt-3"
            disabled={isLoading || !consent}
          >
            {isLoading ? "Sending..." : "Sign up"}
          </button>
        </form>
        {message && <p>{message}</p>}
        <p className="copyright">
          Video Credit: Tom Fisk{" "}
          <a href="https://www.pexels.com/fr-fr/video/vue-aerienne-d-un-paysage-brumeux-2547258/">
            pexels.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
