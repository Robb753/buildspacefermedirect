import React from "react";
import Hero from "../Components/Hero";
import Delivery from "../Components/Delivery";
import Healthy from "../Components/Healthy";
import ProductSlider from "../Components/ProductSlider";
import Products from "../Components/Products";

const Home = () => {
  return (
    <>
      <Hero />
      <Delivery />
      <Healthy />
      <ProductSlider />
      <Products />
    </>
  );
};

export default Home;
