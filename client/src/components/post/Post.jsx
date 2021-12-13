import './Post.css';
import PostImg from '../../images/heroImg.jpg';
import { Link }from 'react-router-dom'

export default function Post({post}) {
  const PF = "http://localhost:2000/images/"
  return (
    <div className="post">
      {post.photo && ( <img src={PF + post.photo} alt="" className="postImg" />)}     
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat"> {c.name} </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link" >
         <span className="postTitle">  {post.title} </span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        <div className="postDesc">
          {post.desc}
        </div>
      </div>
    </div>
  )
}
