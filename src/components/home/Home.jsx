import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import './home.scss';

export default function() {
  const [scrollVal, setScrollVal] = useState(0);
  const [final, setFinal] = useState(false);

  function onScroll(elmt) {
    if (elmt.clientWidth + elmt.scrollLeft === elmt.scrollWidth) {
      console.log('is a finall');
      setFinal(true);
    } else {
      setFinal(false);
    }
  }

  return (
    <div className="home-container">
      <div
        className="users-container"
        id="users-container"
        onScroll={evt => {
          return onScroll(evt.target);
        }}
        onWheel={() => {
          const elmt = document.getElementById('users-container');
          elmt.scrollLeft = scrollVal;
          if (!final) {
            setScrollVal(scrollVal + 100);
          } else {
            setScrollVal(0);
          }
          return true;
        }}
      >
        <div className="user-container">
          <Card className="card-user">
            <div className="img-user">
              <img
                src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                alt="img-profile"
                className="img-profile"
              />
            </div>
            <Card.Body>
              <Card.Title>Card Titldeds</Card.Title>
              <Card.Text className="card_text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="user-container">
          <Card className="card-user">
            <div className="img-user">
              <img
                src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                alt="img-profile"
                className="img-profile"
              />
            </div>
            <Card.Body>
              <Card.Title>Card Titldeds</Card.Title>
              <Card.Text className="card_text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="user-container">
          <Card className="card-user">
            <div className="img-user">
              <img
                src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                alt="img-profile"
                className="img-profile"
              />
            </div>
            <Card.Body>
              <Card.Title>Card Titldeds</Card.Title>
              <Card.Text className="card_text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="user-container">
          <Card className="card-user">
            <div className="img-user">
              <img
                src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                alt="img-profile"
                className="img-profile"
              />
            </div>
            <Card.Body>
              <Card.Title>Card Titldeds</Card.Title>
              <Card.Text className="card_text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="user-container">
          <Card className="card-user">
            <div className="img-user">
              <img
                src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                alt="img-profile"
                className="img-profile"
              />
            </div>
            <Card.Body>
              <Card.Title>Card Titldeds</Card.Title>
              <Card.Text className="card_text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
