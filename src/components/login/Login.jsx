import React from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Button, Form, Nav } from 'react-bootstrap';
import './login.scss';
export default function({ loggedUser, setLoggedUser }) {
  return loggedUser ? (
    <Redirect to="home" />
  ) : (
    <div className="login-container">
      <div className="login-form-container">
        <Card className="card-login">
          <Card.Body>
            <Card.Title>
              <h2>SignIn</h2>
              <Card.Subtitle className="mb-2 text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                hic distinctio earum quidem eaque accusamus...
              </Card.Subtitle>
            </Card.Title>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Password" />
              </Form.Group>
            </Form>
            <Button
              variant="dark"
              onClick={() => {
                setLoggedUser(true);
              }}
              block="true"
            >
              Sign In-
            </Button>
            <Card.Text className="forgot-password">
              <Nav.Link href="#"> Forgot your password?</Nav.Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
