import { useState,useEffect } from "react"
import { makePost } from "../api";

export default function NewListing(){
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [succMessage, setSuccMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    try{
      const post = {
        title: title,
        description: desc,
        price: price,
        location: location,
      };

      const response = await makePost(token, post);
      if(response.success){
        setSuccMessage("Listing submitted");
        setTitle('')
        setDesc('')
        setPrice('')
      }else{
        setError('Failed to submit listing');
      }
    }catch(error){
      console.error(error);
    }
  }
  return(
    <>
      <h2>Create a New Listing</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {succMessage && <p className="success-message">{succMessage}</p>}
    </>
  )
}