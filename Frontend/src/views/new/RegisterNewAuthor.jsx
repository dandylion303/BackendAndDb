import { Container, Row, Col, Form, FormControl, FormGroup, FormLabel, Button, Alert } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const RegisterNewAuthor = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const goTo = useNavigate()



    const handleRegistration = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/authors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })
            const data = await response.json()
            if (response.ok) {
                goTo('/login')

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
                        <Form onSubmit={handleRegistration} >

                            <FormGroup controlId='registration-name'>
                                <FormLabel>name</FormLabel>
                                <FormControl
                                    type='text'
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)} />
                            </FormGroup>

                            <FormGroup controlId='registration-email'>
                                <FormLabel>email</FormLabel>
                                <FormControl
                                    type='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </FormGroup>

                            <FormGroup controlId='registration-password' className="mt-5">
                                <FormLabel>password</FormLabel>
                                <FormControl
                                    type='password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </FormGroup>


                            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}


                            <Button type='submit' className="mt-5">Register</Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default RegisterNewAuthor