import React, { useEffect, useState } from 'react'
import './App.css'; 
import Recipe from './Recipe'; 
  
const App = () => { 
  const APP_ID = "c016275c"; 
  const APP_KEY = "e7a20a0fd3337c8c3fead10be2db25f3"

  ; 
  const [recipes, setRecipes] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [query, setQuery] = useState("Paneer"); 
  useEffect(() => { 
    getRecipes(); 
  }, [query]) 
  const getRecipes = async () => { 
    const response = await fetch 
          (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
    const data = await response.json(); 
    setRecipes(data.hits); 
    // console.log(data); 
  
  }; 
  const updateSearch = e => { 
    setSearch(e.target.value); 
  }; 
  const getSearch = e => { 
    e.preventDefault(); 
    setQuery(search); 
    setSearch(""); 
  } 
  
  return ( 
    <div className="App"> 
      <form className="search-form" onSubmit={getSearch}  > 
        <input className="search-bar" type="text" value={search} 
             onChange={updateSearch} /> 
        <button className="search-button" type="submit" > 
             Search 
        </button> 
      </form> 
      <div className="recipes"> 
        {recipes.map(recipe => ( 
          <Recipe 
            key={recipe.recipe.label} 
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image} 
            ingredients={recipe.recipe.ingredients} 
          /> 
  
        ))} 
      </div> 
  
    </div> 
  ); 
} 
  
export default App;