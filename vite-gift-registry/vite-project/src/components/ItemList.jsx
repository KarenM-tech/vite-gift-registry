import { useEffect, useState } from "react";
import Footer from "./Footer";
import { createClient } from "@supabase/supabase-js";
import GotItModal from "./GotItModal";
import '../style.css';

const supabase = createClient(
  "https://byfkmtiyqxmulabthman.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZmttdGl5cXhtdWxhYnRobWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MzIzNjAsImV4cCI6MjA1MzQwODM2MH0.SA_hpVe3VHY-CKxy7MIgaSoMDXqtrJisVQgCbb-3c7o"

);

const ItemList = () => {
  const [item, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [showConfirmation, setShowConfirmation] = useState (false);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from("item").select("*").gte("id",1);
      if (error) console.error("Error fetching items:", error);
      else setItems(data);
    };

    fetchItems();
  }, []);

   // Function to handle the "Got it!" button click
   const handleGotItClick = (item) => {
    setSelectedItem(item); // Set the selected item
    setIsModalOpen(true); // Open the modal
    
  };

  // Function to confirm the purchase
  const handleConfirmPurchase = async () => {
    const { data, error } = await supabase
      .from("item")
      .update({ isBought: true })
      .eq("id", selectedItem.id);
    
    if (error) {
      console.error("Error updating item:", error);
    } else {
      // Update the item locally
      setItems(items.map(item =>
        item.id === selectedItem.id ? { ...item, isBought: true } : item
      ));
      setIsModalOpen(false); // Close the modal
      setShowConfirmation(true);

      /*setTimeout(()=> {
        setShowConfirmation(false);
      }, 3000);*/
    }
    console.log("Purchase Confirmed. Showing confirmation pop-up...");
  };

   // Function to cancel the modal
   const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="wholeImagepage">
      <div className="mapDivs">
        {item.map((item) => (
          <div key={item.id} className="itemDiv">
            <h2>{item.name}</h2>
            <img
              src={item.image}
              style={{ width: "270px", height: "300px" }}
            />
            <div className="itemInfo">
              <p>{item.size}</p>
              <p>*{item.specifics}</p>
              <p>{item.color}</p>
              {item.link && (
                <a href={item.link} className="link">
                  Where to Buy
                </a>
              )}
              <br />
            </div>
            <button
              className="btnnGot"
              onClick={() => handleGotItClick(item)} // Show the modal when clicked
              // Disable if already purchased
              style={{
                backgroundColor: item.isBought ? "#aaa" : "#007bff",
                color: "white",
                cursor: item.isBought ? "not-allowed" : "pointer",
              }}
            >
              {item.isBought ? "Already Purchased" : "Got it!"}
            </button>
          </div>
        ))}
      </div>
      <Footer />

      {/* Confirmation Pop-Up }
      {showConfirmation && (
        <div className="confirmation-popup">
          Confirmed
        </div>
      )*/}
       <div className={`confirmation-popup ${showConfirmation ? "show" : ""}`}>
        Confirmed
      </div>

      {/* GotItModal is triggered when isModalOpen is true */}
      <GotItModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmPurchase}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ItemList;