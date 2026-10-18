import { useEffect, useState} from "react";
import { Col, Row, Button, FormControl} from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { useNavigate } from "react-router-dom";

const BlogList = props => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const goTo = useNavigate()

  const fetchPost = async () => {
    const myPass = localStorage.getItem('myPass')
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/posts?page=${page}&limit=6&title=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${myPass}`}
      })
      if(result.status===401){
        localStorage.removeItem('myPass')
        goTo('/login')
        return
      }

      const data = await result.json()
      setPosts(data.results)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [page, searchTerm])


//FILTRO DI RICERCA
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

//COMANDI PER PULSANTI PAGINATION
  const handleBack = () => { setPage(page - 1) }
  const handleNext = () => { setPage(page + 1) }

  return (
    <div>
      <Row className="m-4 ">
        <FormControl
        type='text'
        placeholder="Cerca un post"
        value={searchTerm}
        onChange={handleSearchChange}/>
      </Row>
      <Row>
        {posts.map((post, i) => (
          <Col
            key={`item-${i}`}
            md={4}
            style={{
              marginBottom: 50,
            }}
          >
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
      <Row className="row-cols-3 justify-content-center align-items-center">
        <Button onClick={handleBack} disabled={page === 1}>Indietro</Button>
        <span className="text-center">{`pagina ${page} di ${totalPages}`}</span>
        <Button onClick={handleNext} disabled= {page >= totalPages}>Avanti</Button>
      </Row>
    </div>
  );
};

export default BlogList;
