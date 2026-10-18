import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Alert } from "react-bootstrap";
import "./styles.css";




const NewBlogPost = props => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('technology')
  const [coverImg, setCoverImg] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const goTo = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const myPass = localStorage.getItem('myPass')
    const body = new FormData()
    body.append('title', title)
    body.append('author', 'test@test.it')
    body.append('category', category)
    body.append('content', text)
    if (coverImg) {
      body.append('cover', coverImg)
    }
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${myPass}`
        },
        body: body,
      })
      

      if(result.status===401){
        localStorage.removeItem('myPass')
        goTo('/login')
        return

      }

      const data = await result.json()
      if (result.ok) {
        setSuccessMessage('Il post è stato pubblicato')
        setText('')
        setTitle('')
        setCategory('technology')
        setCoverImg(null)
      } else {
        setErrorMessage(data.message)
      }
    } catch (error) {
      console.log(error)

    }
  }


  const resetButton = () => {
    setText('')
    setTitle('')
    setCategory('technology')
    setCoverImg(null)
  }



  return (

    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select"
            value={category}
            onChange={(e) => { setCategory(e.target.value) }}>
            <option value='technology'>technology</option>
            <option value='relationships'>relationships</option>
            <option value='politics'>politics</option>
          </Form.Control>
        </Form.Group>

        {/*////////////UPLOAD COVER IMG///////////// */}
        <Form.Group controlId='blog-cover' className='mt-3'>
          <Form.Label>Cover</Form.Label>
          <Form.Control
            size='lg'
            type='file'
            onChange={(e) => { setCoverImg(e.target.files[0]) }}>
          </Form.Control>
        </Form.Group>


        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          />
        </Form.Group>

        {/*////////////RESET BUTTON///////////// */}
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="button" size="lg" variant="outline-dark"
            onClick={resetButton}>
            Reset
          </Button>


          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>

        </Form.Group>
        <div className="mt-4">
          {successMessage && <Alert variant='success'>{successMessage}</Alert>}
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
        </div>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
