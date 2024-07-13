const config = {
  development: {
    apiUrl: "http://localhost:3000",
  },
  production: {
    apiUrl: "https://fermedirect-bb0533e3ea6e.herokuapp.com/", // Remplacez par l'URL de votre application Heroku
  },
};

export default config[process.env.NODE_ENV];
