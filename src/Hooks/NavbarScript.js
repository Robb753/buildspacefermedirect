// src/Hooks/NavbarScript.js
import { useEffect } from "react";

const useScript = () => {
  useEffect(() => {
    const header = document.querySelector("header");
    const container = document.getElementById("container-navbar");
    const menuButton = document.getElementById("menu");
    const links = document.querySelectorAll("a[data-target]");

    // Vérifiez que les éléments existent
    if (!header || !container || !menuButton || !links) {
      return;
    }

    // Function to handle the scroll
    function handleScroll() {
      container.classList.remove("menuopen");
      header.classList.toggle("sticky", window.scrollY >= 100);
    }

    // Function to handle menu button click
    function handleMenuButtonClick() {
      header.classList.remove("sticky");
      container.classList.toggle("menuopen");
    }

    // Function to handle anchor links click
    function handleLinkClick(event) {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("data-target");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }

    // Function to close the menu when clicking outside and show the sticky menu
    function handleCloseOutside(event) {
      if (!menuButton.contains(event.target)) {
        // Check if the click was outside the menu button
        container.classList.remove("menuopen");
        header.classList.add("sticky");
      }
    }

    window.addEventListener("scroll", handleScroll);
    menuButton.addEventListener("click", handleMenuButtonClick);
    links.forEach((link) => link.addEventListener("click", handleLinkClick));
    document.addEventListener("click", handleCloseOutside);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      menuButton.removeEventListener("click", handleMenuButtonClick);
      links.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
      document.removeEventListener("click", handleCloseOutside);
    };
  }, []);
};

export default useScript;
