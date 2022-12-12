import express from "express";
import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://pragna97:ExamCS590@cluster0.xycfq4w.mongodb.net/quotecollector";
const PORT = 3001;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quoteSchema = mongoose.Schema({ quote: String, num: Number });
const Quote = mongoose.model("Quotes", quoteSchema);

const app = express();
app.use(express.json());

app.post("/create", async (req, res) => {
  try {
    let newQuote = new Quote({ quote: req.body.quote, num: req.body.num });
    await newQuote.save();
    console.log(newQuote);

    let message = "Quote-" + req.body.quote + " -saved";
    res.status(200).send(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
});

app.post("/update", async (req, res) => {
  try {
    let update = await Quote.updateOne({ num: 2 }, { quote: req.body.quote });
    console.log(update);
    res.status(200).send(JSON.stringify(update));
  } catch (error) {
    console.log(error);
  }
});

//DeleteMany
app.delete("/delete", async (req, res) => {
  try {
    await Quote.deleteMany({});
    let message = "All quotes deleted";
    res.status(200).send(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteOne", async (req, res) => {
  try {
    await Quote.deleteOne({ num: 2 });
    let message = "All quotes deleted";
    res.status(200).send(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
});

app.get("/getQuote", async (req, res) => {
  try {
    let quotes = await Quote.find({});
    res.status(200).send(JSON.stringify(quotes));
  } catch (error) {
    console.log(error);
  }
});

app.get("/getOneQuote", async (req, res) => {
  try {
    let quote = await Quote.findOne({ num: 2 });
    res.status(200).send(JSON.stringify(quote));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
