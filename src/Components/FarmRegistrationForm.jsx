import React, { useState } from "react";

const FarmRegistrationForm = () => {
  const [farm, setFarm] = useState({
    name: "",
    address: "",
    products: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarm((prevFarm) => ({ ...prevFarm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Envoyer les données au backend
    const response = await fetch("/api/farms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(farm),
    });
    if (response.ok) {
      // Réinitialiser le formulaire après soumission réussie
      setFarm({
        name: "",
        address: "",
        products: "",
        email: "",
        phone: "",
      });
      alert("Ferme enregistrée avec succès !");
    } else {
      alert("Échec de l'enregistrement. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom de la ferme:
        <input
          type="text"
          name="name"
          value={farm.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Adresse:
        <input
          type="text"
          name="address"
          value={farm.address}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Produits:
        <input
          type="text"
          name="products"
          value={farm.products}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={farm.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Téléphone:
        <input
          type="tel"
          name="phone"
          value={farm.phone}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Enregistrer la ferme</button>
    </form>
  );
};

export default FarmRegistrationForm;
