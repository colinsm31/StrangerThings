import { Link } from "react-router-dom";

export default function Navbar(){
  return(
    <>
    <div className="navbar">
      <Link to="/">Home View</Link>
      <Link to="/create">Create View</Link>
      <Link to="/login">Login View</Link>
      <Link to="/posts">Posts View</Link>
    </div>
    </>
  )
}