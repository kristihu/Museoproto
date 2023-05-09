import { useState, useEffect } from "react";
import Home from "./components/Home";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend API
    fetch("http://localhost:3001/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <Home categories={categories} />
    </div>
  );
}

export default App;
