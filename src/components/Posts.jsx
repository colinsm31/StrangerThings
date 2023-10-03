import { useState, useEffect } from "react";

const COHORT_NAME = '2209-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Posts(){
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts(){
      try{
        const response = await fetch(`${BASE_URL}/posts`);
        const result = await response.json();
        const postsArr = result.data.posts;
        console.log(postsArr);
        setPosts(postsArr);
      }catch(error){
        console.error(error);
      }
    }
    fetchPosts();
  }, [])

  return(
    <>
      <h1 className="header">Posts Page</h1>
      {posts.map((post) => {
        return(
          <div key={post.author._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <h3>Price: {post.price}</h3>
            <h3>Seller: {post.author.username}</h3>
            <h3>Location: {post.location}</h3>
          </div>
        )
      })}
    </>
  );
}