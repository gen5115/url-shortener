import { useState } from "react";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/shorten`, {
        originalUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🔗 URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-gray-700">Your short URL:</p>
            <a
              href={`http://${shortUrl}`}
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 font-semibold hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
