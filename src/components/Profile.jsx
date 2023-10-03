import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getUserData, isLoggedIn, deletePost } from "../api";

export default function Profile(){
  const {postId} = useParams();
  const nav = useNavigate();
  const [profData, setProfData] = useState({
    posts: [],
    messages: [],
    username: '',
  });

  useEffect(() => {
    if(isLoggedIn()){
      loadData();
    }else{
      nav('/login');
    }
  }, [])

  async function loadData(){
    try{
      const token = sessionStorage.getItem('token');
      if(token){
        const userData = await getUserData(token);
        const posts = userData.data.posts
        setProfData({...userData.data, posts: posts})
      }
    }catch(error){
      console.error(error);
    }
  }

  async function handleDelete(postId){
    try{
      const token = sessionStorage.getItem('token');
      const response = await deletePost(token, postId);
      return response;
    }catch(error){
      console.error(error);
    }
  }
  return(
    <>
      <h1>Hello, {profData.username}</h1>
      <ul>{profData.posts.map((post) => (
        <li key={post._id}>
          {post.title}
          <button onClick={handleDelete}>Delete</button>
        </li>
      ))}</ul>
    </>
  )
}