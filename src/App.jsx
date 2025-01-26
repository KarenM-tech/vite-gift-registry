import React from "react";
import ItemList from "./components/ItemList";
import {Heart} from "lucide-react";
import './style.css';

function App() {
  return (
    <div className="wholepageApp">
      <h1  className="brushStroke">
        Karen's 21st birthday wishlist
        <Heart className="heartIcon"/>
      </h1>
      <ItemList />
    </div>
  );
}

export default App;
