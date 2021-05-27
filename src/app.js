const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static derictory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vanessa Camat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Vanessa Camat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Some a little help here",
    title: "Help",
    name: "Vanessa Camat",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  //this run if search is provided
  if (!req.query.search) {
    //query is also an objects contains all query string information
    // ! - logical not operator to flip to the false or false to the true
    return res.send({
      //if you dnt provide search it will show below
      //to send some back to json
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search); //but if you it will show here
  res.send({
    products: [],
  });
});

//doesnt match
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vanessa Camat",
    errorMessage: "Help article not found.",
  });
});

//if it doesnt match above it will print this
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vanessa Camat",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
