import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './home.scss';

export default function() {
  const [scrollVal, setScrollVal] = useState(0);
  const [final, setFinal] = useState(false);

  function onScroll(elmt) {
    setScrollVal(elmt.scrollLeft);
    if (elmt.clientWidth + elmt.scrollLeft === elmt.scrollWidth) {
      setFinal(true);
    } else {
      setFinal(false);
    }
  }
  function onWheel(w) {
    console.log('Y ', w.deltaY);
    console.log('X', w.deltaX);
    console.log('scrollVal: ', scrollVal);
    if (w.deltaY < 0 && scrollVal >= 50) {
      setScrollVal(scrollVal - 100);
    }
    if (w.deltaY > 0 && !final) {
      setScrollVal(scrollVal + 100);
    }
    const elmt = document.getElementById('users-container');
    elmt.scrollLeft = scrollVal;
    return true;
  }
  return (
    <div className="home-container">
      <div
        className="users-container"
        id="users-container"
        onScroll={evt => {
          return onScroll(evt.target);
        }}
        onWheel={w => {
          onWheel(w);
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
              <Card.Title>Card Title</Card.Title>
              <Card.Text className="card_text">
                Some quick example text to build on the cardd title and make up
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
