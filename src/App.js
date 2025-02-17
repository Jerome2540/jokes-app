import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Button from "./Components/Button";
import "./styles/App.css";

const App = () => {
  const [joke, setJoke] = useState("");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const fetchJoke = useCallback((category = "") => {
    let url = "https://api.chucknorris.io/jokes/random";
    if (category) url += `?category=${category}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setJoke(data.value));
  }, []);

  const searchJoke = useCallback(() => {
    fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result.length > 0) {
          setJoke(data.result[0].value);
        } else {
          setJoke("No jokes found with that keyword.");
        }
      });
  }, [search]);

  const categoryButtons = useMemo(() => (
    categories.map((category) => (
      <Button key={category} onClick={() => fetchJoke(category)}>
        {category}
      </Button>
    ))
  ), [categories, fetchJoke]);

  return (
    <div className="joke-app-container">
      <h1 className="title">Chuck Norris Joke App</h1>
      <input
        type="text"
        ref={inputRef}
        className="search-bar"
        placeholder="Search for a word in jokes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button className="search-button" onClick={searchJoke}>
        Search Joke
      </Button>
      <p className="joke-display">{joke}</p>
      <div className="category-buttons">{categoryButtons}</div>
      <JokeButton fetchJoke={fetchJoke} />
    </div>
  );
};

const JokeButton = ({ fetchJoke }) => {
  return (
    <Button className="random-joke-button" onClick={() => fetchJoke()}>
      Random Joke
    </Button>
  );
};

export default App;













// import { useEffect } from 'react';
// import './App.css';
// import { useState } from 'react';
// import Button from './Components/Button';

// function App() {
//   const [jokes,setJokes] = useState(0) 
//   const handleOnclick = setJokes()
//   useEffect(() => {
//     console.log("new");
    
//   })

//   return (
//     <div className="App">
//       <Button handleOnclick={handleOnclick} />
//     </div>
//   );
// }

// export default App;





