import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function EmailLink() {
  const emailRef = useRef()
  const { sendSignUpLink, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await sendSignUpLink(emailRef.current.value)
      //history("/")
      history("/signup")
    } catch(error) {
      console.error("Sending Signup link Error:", error);
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {JSON.stringify(currentUser)}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up for First-time user
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}