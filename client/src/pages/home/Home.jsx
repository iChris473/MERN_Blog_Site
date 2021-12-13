import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from 'axios';
import './Home.css'
import { useLocation } from "react-router";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const url = "http://localhost:2000"
    const fetchPosts = async () => {
      const res = await axios.get(`${url}/${search}`);
      setPosts(res.data)
    }
    fetchPosts()
  }, [search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
}

export default Home
