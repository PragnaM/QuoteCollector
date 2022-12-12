import mongoose from "mongoose";

describe("QuoteCollector", () => {
  beforeAll(async () => {
    const MONGO_URI =
      "mongodb+srv://pragna97:ExamCS590@cluster0.xycfq4w.mongodb.net/quotecollector";

    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const quoteSchema = mongoose.Schema({ quote: String, num: Number });
    const Quote = mongoose.model("Quotes", quoteSchema);
  });

  test("save quote", async () => {
    const res = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: "quote",
        num: 1,
      }),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toBe("Quote- quote -saved");
  }),
    test("delete all quotes", async () => {
      const res = await fetch("/delete", {
        method: "DELETE",
      });
      expect(res.status).toBe(200);
      expect(await res.json()).toBe("All quotes deleted");
    }),
    test("delete one quote", async () => {
      const res = await fetch("/deleteOne", {
        method: "DELETE",
      });
      expect(res.status).toBe(200);
      expect(await res.json()).toBe("Quote deleted");
    });
});
