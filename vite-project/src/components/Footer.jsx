import React, { useState } from "react";


// Create Supabase client


function Footer() {
  const [likes, setLikes] = useState(0);

 

   // Handle when the "like" button is clicked
   const handleLike = () => {
    setLikes(likes + 1);
  };
   

  return (
    <div className="footer">
      
      <h3>Banking Details</h3>
  <div className="bankDetails">
    <div className="bankDetails-left">
      <h4>ABSA</h4>
      <ul>
      <li>Account holder: Karen Tafadzwa Mandishona</li>
        <li>Account Type: Current Account</li>
        <li>Account Number: 4102967619</li>
        <li>Branch Code: 632005</li>
      </ul>
    </div>
    <div className="bankDetails-right">
      <h4>Nedbank</h4>
      <ul>
        <li>Account holder: Karen Mandishona</li>
        <li>Account Type: Current Account</li>
        <li>Account Number: 1269873199</li>
        <li>Branch Code: 198765</li>
      </ul>
    </div>
      </div>
      <p> Hello there, do you like my website?</p>
      <button onClick={handleLike} className="thumbs-up">
        <img src='./images/heart.jpeg' height="20px" width="20px"></img> {likes}
      </button>
    </div>
  );
}

export default Footer;
