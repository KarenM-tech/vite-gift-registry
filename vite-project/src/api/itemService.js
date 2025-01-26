// API functions for interacting with the "item" table

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://byfkmtiyqxmulabthman.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZmttdGl5cXhtdWxhYnRobWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MzIzNjAsImV4cCI6MjA1MzQwODM2MH0.SA_hpVe3VHY-CKxy7MIgaSoMDXqtrJisVQgCbb-3c7o"
);

// Function to fetch all items
export const fetchItems = async () => {
  const { data, error } = await supabase.from("item").select("*");
  if (error) {
    console.error("Error fetching items:", error);
    return [];
  }
  return data;
};

// Function to update isBought attribute
export const updateItemStatus = async (itemId) => {
  const { data, error } = await supabase.from("item").update({ isBought: true }).eq("id", itemId);
  if (error) {
    console.error("Error updating item status:", error);
    throw error;
  }
  return data;
};

// Function to listen to real-time updates
export const subscribeToItemUpdates = (onUpdateCallback) => {
  const subscription = supabase
    .from("item")
    .on("UPDATE", (payload) => {
      console.log("Real-time update received:", payload.new);
      onUpdateCallback(payload.new);
    })
    .subscribe();

  // Return the subscription object so it can be removed later
  return subscription;
};
