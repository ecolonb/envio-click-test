import React from 'react';

//Librerías externas
import { Card, Button } from 'react-bootstrap';

//Estilos
import './item-user.scss';

export default function({
  userItem,
  setShowSidebar,
  setUserDetail,
  setEditName,
  setEditDescription
}) {
  return (
    <div
      className="user-container"
      onClick={evt => {
        if (evt.target.className.indexOf('btn') >= 0) {
          console.log('Mostrar POST del usuario -->>', userItem.id);
        } else {
          console.log(
            '------Mostrar perfil del usuario en SIDE-->>>>>',
            userItem
          );
          //Si se da click en cualquier parte del CARD se actualiza la info para mostrar en el sideBar y se muestra
          setUserDetail(userItem);
          setEditDescription(false);
          setEditName(false);
          setShowSidebar(true);
        }
      }}
    >
      <Card className="card-user" name="card_user">
        <div className="img-user">
          <img
            src={userItem.avatar}
            alt="img-profile"
            className="img-profile"
            name="img_profile"
          />
        </div>
        <Card.Body name="card_profile">
          <Card.Title>
            {userItem.first_name + ' ' + userItem.last_name}
          </Card.Title>
          <Card.Text className="card_text">
            {userItem.description}
            <br />
            Id: <strong>{userItem.id}</strong>
          </Card.Text>
          <Button variant="primary" name="view_posts">
            View posts
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
