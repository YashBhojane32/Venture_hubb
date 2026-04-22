import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { destinations } from "@/data/destinations";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // 🔥 Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      const filtered = destinations.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered.slice(0, 5));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // ❌ Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!inputRef.current?.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // 🔍 Handle select
  const handleSelect = (id: string) => {
    setQuery("");
    setShow(false);
    navigate(`/destinations/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto mb-10 relative">

      {/* 🔍 INPUT */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search destinations..."
        value={query}
        onFocus={() => setShow(true)}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* 📦 RESULTS */}
      {show && query && (
        <div className="absolute w-full bg-white shadow-lg rounded-xl mt-2 z-50 overflow-hidden">

          {results.length > 0 ? (
            results.map((d) => (
              <div
                key={d.id}
                onClick={() => handleSelect(d.id)}
                className="p-3 hover:bg-gray-100 cursor-pointer transition"
              >
                <p className="font-medium">{d.name}</p>
                <p className="text-xs text-gray-500">{d.location}</p>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500 text-sm">
              No results found 😢
            </div>
          )}

        </div>
      )}
    </div>
  );
}