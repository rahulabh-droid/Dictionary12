import express from "express";
import axios from "axios";
import bodyParser from "body-parser"; 

const app = express();
const port = 3000;
const API_URL = "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req,res) => {
  res.render("index.ejs", {word: "", defination: ""});
});


app.post("/submit", (req, res) => {
  const word = req.body.word;

  const options = {
    method: 'GET',
    url: API_URL,
    params: { word: word }, 
    headers: {
      'x-rapidapi-key': '7b9812dbb2msh197eeb041d42993p18e859jsn8eacdc55d23e',
      'x-rapidapi-host': 'dictionary-by-api-ninjas.p.rapidapi.com'
    }
  };


  axios.request(options)
    .then(response => {
 
      res.render("index.ejs", { word: word, defination: response.data.definition });
    })
    .catch(error => {
      console.error(error);
      res.render("index.ejs", { word: word, defination: "Definition not found!" });
    });
    // try {
    //   const response = await axios.request(options);
    //   res.render("index.ejs", { word: word, definition: response.data.definition });
    // } catch (error) {
    //   console.error(error);
    //   res.render("index.ejs", { word: word, definition: "Definition not found!" });
    // }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}- https://locahost:3000`);
});
