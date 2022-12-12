import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [quote, setQuotes] = useState("");
  const [result, setResult] = useState("");
  const [id, setId] = useState(0);
  const [getQuote, setGetQuote] = useState([]);
  const [getOneQuote, setGetOneQuote] = useState([]);
  const [update, setUpdate] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("useEffect");
  }, [getQuote, getOneQuote]);

  async function saveQuote() {
    setId(id + 1);
    const res = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: quote,
        num: id,
      }),
    });
    if (res.status === 200) {
      console.log("Quote saved");
      setMessage("Quote saved");
      setResult(await res.json());
    } else {
      console.log("Quote not saved");
    }
  }
  async function deleteAllQuotes() {
    const res = await fetch("/delete", {
      method: "DELETE",
    });
    if (res.status === 200) {
      console.log("Quotes deleted");
      setMessage("Quotes deleted");
    } else {
      console.log("Quotes not deleted");
    }
  }

  async function DeleteOneQuote() {
    const res = await fetch("/deleteOne", {
      method: "DELETE",
    });
    if (res.status === 200) {
      console.log("Quote deleted");
      setMessage("Quote deleted");
      setResult(await res.json());
    } else {
      console.log("Quote not deleted");
    }
  }

  async function GetQuote() {
    const res = await fetch("/getQuote", {
      method: "GET",
    });
    if (res.status === 200) {
      let response = await res.json();
      console.log("Quotes displayed");
      setMessage("Quotes displayed");
      console.log(response);
      setGetQuote(response);
    } else {
      console.log("Quotes not fetched");
    }
  }

  async function GetOneQuote() {
    const res = await fetch("/getOneQuote", {
      method: "GET",
    });
    if (res.status === 200) {
      let response = await res.json();
      console.log("Quote displayed");
      setMessage("Quote displayed");
      console.log(response);
      setGetOneQuote(response);
    } else {
      console.log("Quote not fetched");
    }
  }

  async function updateQuote() {
    const res = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: "Updated quote",
        num: id,
      }),
    });
    if (res.status === 200) {
      let response = await res.json();
      console.log("Quote updated");
      setMessage("Quote updated");
      console.log(response);
      setUpdate(response);
    } else {
      console.log("Quote not updated");
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="quote"
        onChange={(e) => setQuotes(e.target.value)}
      />
      <button onClick={saveQuote} id="save">
        Save Quote
      </button>
      <button onClick={DeleteOneQuote} id="deleteone">
        Delete One Quote
      </button>
      <button onClick={deleteAllQuotes} id="deleteall">
        Delete All quotes
      </button>
      <button onClick={GetQuote} id="get">
        Get Quotes
      </button>
      <button onClick={updateQuote} id="update">
        Update Quotes
      </button>
      <button onClick={GetOneQuote} id="getone">
        Get One Quotes
      </button>
      <h2> {message} </h2>
      <h2> {result} </h2>
      <h2> {getOneQuote.quote} </h2>
      <h2> {update.quote}</h2>
      <table border="2" style={{ align: "center" }}>
        <tr>
          <th>Quote</th>
          <th>Id</th>
        </tr>

        {getQuote.map((q) => (
          <tr>
            <td>{q.quote}</td>
            <td>{q.num}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
