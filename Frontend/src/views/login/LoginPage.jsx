import { Container, Row, Col, Form, FormControl, FormGroup, FormLabel, Button, Alert } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const goTo = useNavigate()




    const handleLogin = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (data.token) {
                localStorage.setItem('myPass', data.token)
                goTo('/')
            } else {
                setErrorMessage(data.message)
            }

        } catch (error) {
            console.log(error)

        }
    }






    return (
        <>
            <Container className="mt-5 pt-5">
                <Row>
                    <Col className='mt-5 pt-5'>
                        <Form onSubmit={handleLogin} >
                            <FormGroup controlId='access-email'>
                                <FormLabel>email</FormLabel>
                                <FormControl
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </FormGroup>

                            <FormGroup controlId='access-password' className="mt-5">
                                <FormLabel>password</FormLabel>
                                <FormControl
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </FormGroup>
                            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                            <Button type='submit' className="mt-5">Login</Button>
                        </Form>
                        <Button href={`${process.env.REACT_APP_API_URL}/auth/google`} 
                        variant="outline-dark"
                        className="mt-3">
                            Accedi con Google
                        </Button>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default LoginPage