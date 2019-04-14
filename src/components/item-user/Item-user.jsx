import React from 'react';

//Librerías externas
import { Card, Button } from 'react-bootstrap';

//Estilos
import './item-user.scss';

export default function({ usuarioInfo }) {
  return (
    <div
      className="user-container"
      onClick={evt => {
        console.log('-- asds --: ', evt.target.className);
        console.log('-->>', evt.target.className.indexOf('card-body'));
        if (evt.target.className.indexOf('btn') >= 0) {
          console.log('Mostrar POST del usuario -->>', usuarioInfo.id);
        } else {
          console.log('Mostrar perfil del usuario en SIDE', usuarioInfo.id);
        }
      }}
    >
      <Card className="card-user" name="card_user">
        <div className="img-user">
          <img
            src={usuarioInfo.avatar}
            alt="img-profile"
            className="img-profile"
            name="img_profile"
          />
        </div>
        <Card.Body name="card_profile">
          <Card.Title>
            {usuarioInfo.first_name + ' ' + usuarioInfo.last_name}
          </Card.Title>
          <Card.Text className="card_text">
            Some quick example text to build on the cardd title and makee up
            thes bulk of the card's content..
            <br />
            Id: <strong>{usuarioInfo.id}</strong>
          </Card.Text>
          <Button variant="primary" name="view_posts">
            View posts
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
