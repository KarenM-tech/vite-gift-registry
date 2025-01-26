import { useEffect, useState } from "react";
import Footer from "./Footer";
import { createClient } from "@supabase/supabase-js";
import GotItModal from "./GotItModal";
import "../style.css";

// Create Supabase client
const supabase = createClient(
  "https://byfkmtiyqxmulabthman.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZmttdGl5cXhtdWxhYnRobWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MzIzNjAsImV4cCI6MjA1MzQwODM2MH0.SA_hpVe3VHY-CKxy7MIgaSoMDXqtrJisVQgCbb-3c7o"
);

const ItemList = () => {
  const [items, setItems] = useState([]); // List of items
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedItem, setSelectedItem] = useState(null); // Item selected for update
  const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation pop-up

  // Fetch items from the database
  const fetchItems = async () => {
    const { data, error } = await supabase.from("item").select("*").order("id", {ascending:true});
    if (error) {
      console.error("Error fetching items:", error);
    } else {
      setItems(data);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle "Got it!" button click
  const handleGotItClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true); // Open the modal
  };

  // Confirm purchase and update the database
  const handleConfirmPurchase = async () => {
    if (!selectedItem) return;

    // Update the item's isBought status in the database
    const { data, error } = await supabase
      .from("item")
      .update({ isbought: true })
      .eq("id", selectedItem.id);

    if (error) {
      console.error("Error updating item in database:", error);
      return;
    }

    // Log the successful update
    console.log("Item updated successfully:", data);

    // Refresh the items to reflect the updated data
    await fetchItems();

    // Close the modal and show confirmation
    setIsModalOpen(false);
    setShowConfirmation(true);

    // Hide the confirmation pop-up after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  // Close the modal without any changes
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="wholeImagepage">
      <div className="mapDivs">
        {items.map((item) => (
          <div key={item.id} className="itemDiv">
            <h2>{item.name}</h2>
            <img
              src={item.image}
              style={{ width: "270px", height: "300px" }}
              alt={item.name}
            />
            <div className="itemInfo">
              <p>{item.size}</p>
              <p>{item.specifics}</p>
              <p>{item.color}</p>
              {item.link && (
                <a href={item.link} className="link" target="_blank" rel="noopener noreferrer">
                  Where to Buy
                </a>
              )}
            </div>
            <button
              className="btnnGotIt"
              onClick={() => handleGotItClick(item)}
              
              disabled={item.isBought}
            >
              {item.isbought ? "PURCHASED!" : "Got it!"}
            </button>
          </div>
        ))}
      </div>
      <Footer />

      {/* Confirmation Pop-Up */}
      <div className={`confirmation-popup ${showConfirmation ? "show" : ""}`}>
        Confirmed
      </div>

      {/* Modal */}
      <GotItModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmPurchase}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ItemList;
