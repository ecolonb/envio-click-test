import React, { useState } from 'react';

//Librerias externas
import { Redirect } from 'react-router-dom';
import { Card, Button, Form, Nav, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';

//Servicios -apis
import Login from '../../services/login';
import { setSessionOnStorage } from '../../services/session';

//Helpers
import getUsersByPage, { getUsersWithAlbums } from '../../services/users';
import getAllAlbums, { getAllPhotos } from '../../services/albums';
//Estilos
import './login.scss';
export default function({
  loggedUser,
  setLoggedUser,
  setUsers,
  setAlbums,
  setPhotos,
  setUserList,
  userList
}) {
  const [formValidate, setFormValidate] = useState(false);
  const [userLoginData, setUserLoginData] = useState({
    username: '',
    password: ''
  });
  const [showSinner, setShowSpinner] = useState(false);

  //Hooks para obtener los datos para iniciar sesión
  function onChangeEvent(event) {
    setUserLoginData({
      ...userLoginData,
      [event.target.name]: event.target.value
    });
    return;
  }

  async function loadUersAndAlbums() {
    const fakeDescription = `Some quick example text to build on the cardd title and
                      makee up thes bulk of the card's content...`;
    //Cuando carga el componente albums se caran del Api, Usuarios y albums, las fotos las cargo en el componente photo_albums
    const usersWA = await getUsersWithAlbums();
    setUsers(usersWA.data);
    //Usando promesas para obtener los albums
    getAllAlbums()
      .then(albumsResp => {
        setAlbums(albumsResp);
      })
      .catch(err => {
        console.log('error->', err);
      });
    const photos = await getAllPhotos();
    setPhotos(photos);
    const usersByPage = await getUsersByPage(1);
    if (usersByPage) {
      await usersByPage.data.map((element, index) => {
        return (element.description = fakeDescription);
      });

      setUserList([...userList, ...usersByPage.data]);
    }
  }

  const handleSubmit = async event => {
    setShowSpinner(true);
    event.preventDefault();
    event.stopPropagation();
    setFormValidate(true);
    if (userLoginData.username.trim() === '') {
      setShowSpinner(false);
      return swal(
        'Error',
        '¡El email o la contraseña son incorrectos!',
        'error',
        {
          button: 'Ok'
        }
      );
    }

    const loginResponse = await Login(
      userLoginData.username,
      userLoginData.password
    );
    console.log('LoginResponse: ', loginResponse);
    if (loginResponse && loginResponse.token) {
      await setSessionOnStorage(loginResponse.token);
      loadUersAndAlbums();
      setShowSpinner(false);
      setLoggedUser(true);
    } else {
      setShowSpinner(false);
      swal('Error', '¡El email o la contraseña son incorrectos!', 'error', {
        button: 'Ok'
      });
    }
    //Show Spiner
    //Hook para validar el formulario
  };
  return loggedUser ? (
    <Redirect to="home" />
  ) : (
    <div className="login-container">
      <div className="login-form-container">
        <Card className="card-login">
          <Card.Body>
            {showSinner && (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            <Card.Title>
              <h2>SignIn</h2>
              <Card.Subtitle className="mb-2 text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                hic distinctio earum quidem eaque accusamus...
              </Card.Subtitle>
            </Card.Title>
            <Form
              noValidate
              validated={formValidate}
              onSubmit={e => handleSubmit(e)}
              method="post"
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="username"
                  autoComplete="off"
                  onKeyUp={event => {
                    onChangeEvent(event);
                  }}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="text-left txt-feedback"
                >
                  Incorrect email-
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicPass">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  onKeyUp={event => {
                    onChangeEvent(event);
                  }}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="text-left txt-feedback"
                >
                  Incorrect password
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="dark" type="submit" block="true">
                Sign In
              </Button>
            </Form>
            <Card.Text className="forgot-password">
              <Nav.Link href="#"> Forgot your password?</Nav.Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
