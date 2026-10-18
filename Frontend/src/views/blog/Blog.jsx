import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";


const Blog = props => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const goTo = useNavigate();

  const fetchPost = async () => {
    const myPass = localStorage.getItem('myPass')
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`,{
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${myPass}`,
        }
      }
      )
      if(result.status===401){
        localStorage.removeItem('myPass')
        goTo('/login')
        return
      }

      
      const data = await result.json()
      if (result.ok) {
        setBlog(data)
        setLoading(false)
      } else { 
        goTo ("/") 
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fetchPost()
  }, []);



  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor name={blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
