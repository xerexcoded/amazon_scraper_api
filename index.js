const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //allows app to parse json

//const apikey = "27181fe9d3c16c8907b58ea918abd0b6";
const ScraperUrl = (apikey) =>
  `https://api.scraperapi.com?api_key=${apikey}&autoparse=true`;

app.get("/", (req, res) => {
  res.send("welcome to amazon scraper api");
}); //base route

// GET product Details route
app.get("/products/:productId", async (req, res) => {
  // :porductId signifies that productId is dynamic
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${ScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response)); //send the response back from the server
    //JSON helps to get data in readable format
  } catch (error) {
    res.json(error);
  }
});
// GET product reviews route
app.get("/products/:productId/reviews", async (req, res) => {
  // :productId signifies that productId is dynamic
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${ScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.json(JSON.parse(response)); //send the response back from the server
    //JSON helps to get data in readable format
  } catch (error) {
    res.json(error);
  }
});
// GET product offers route
app.get("/products/:productId/offers", async (req, res) => {
  // :porductId signifies that productId is dynamic
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${ScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response)); //send the response back from the server
    //JSON helps to get data in readable format
  } catch (error) {
    res.json(error);
  }
});

// GET search results route
app.get("/search/:searchQuery", async (req, res) => {
  // :porductId signifies that productId is dynamic
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${ScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response)); //send the response back from the server
    //JSON helps to get data in readable format
  } catch (error) {
    res.json(error);
  }
});
app.listen(PORT, () => console.log(`on port ${PORT}`));
