import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FaWindowClose, FaPen, FaSave } from 'react-icons/fa';

//Librerias externas
import swal from 'sweetalert';

import './sidebar.scss';

export default function({
  setShowSidebar,
  infoToSide,
  editName,
  setEditName,
  editDescription,
  setEditDescription
}) {
  if (!infoToSide) {
    return false;
  }

  const [dataFormDetails, setDataFormDetails] = useState({
    name: '',
    description: ''
  });
  useEffect(() => {
    console.log('dataFormDetails', dataFormDetails);
  }, [dataFormDetails]);
  const fakeDescription = `Some quick example text to build on the cardd title and
                      makee up thes bulk of the card's content...`;
  function saveItem(item) {
    switch (item) {
      case 'name':
        if (dataFormDetails.name.trim().length === 0) {
          console.log('Debes ingresar el nombre');
        } else {
          console.log('Guardar edición');
        }
        break;
      case 'description':
        if (dataFormDetails.description.trim().length === 0) {
          console.log('Debes ingresar la descripción');
        } else {
          console.log('Saving description: ', dataFormDetails.description);
        }
        break;
      default:
        break;
    }
  }

  function onChangeEvent(event) {
    setDataFormDetails({
      ...dataFormDetails,
      [event.target.name]: event.target.value
    });
    return;
  }
  function closeSidabar() {
    setShowSidebar(false);
  }
  return (
    <div className="side-bar-mcontainer">
      <div className="side-bar">
        <div className="user-container-detail">
          <Card className="card-user-detail text-justify" name="card_user">
            <div className="img-user">
              <img
                alt="img-profile"
                className="img-profile"
                name="img_profile"
                src={infoToSide.avatar}
              />
            </div>
            <Card.Body name="card_profile">
              <div className="container-detail">
                <Card.Title className="title-card-name">
                  {!editName &&
                    infoToSide.first_name + ' ' + infoToSide.last_name}
                  {editName && (
                    <Form.Control
                      type="text"
                      name="name"
                      defaultValue={
                        infoToSide.first_name + ' ' + infoToSide.last_name
                      }
                      onChange={evt => {
                        onChangeEvent(evt);
                      }}
                    />
                  )}
                </Card.Title>
                <div className="area-icon-edit">
                  {!editName && (
                    <FaPen
                      className="icon-edit"
                      onClick={() => {
                        setEditName(true);
                      }}
                    />
                  )}
                  {editName && (
                    <FaSave
                      className="icon-edit"
                      onClick={() => {
                        saveItem('name');
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="container-detail">
                <Card.Text className="card_text title-card-detail">
                  {!editDescription && (
                    <React.Fragment>
                      {fakeDescription}
                      <br />
                      Id: <strong>{infoToSide.id}</strong>
                    </React.Fragment>
                  )}
                  {editDescription && (
                    <Form.Control
                      as="textarea"
                      name="description"
                      defaultValue={fakeDescription}
                      onChange={evt => {
                        onChangeEvent(evt);
                      }}
                      rows="10"
                    />
                  )}
                </Card.Text>
                <div className="area-icon-edit">
                  {!editDescription && (
                    <FaPen
                      className="icon-edit"
                      onClick={() => {
                        setEditDescription(true);
                      }}
                    />
                  )}
                  {editDescription && (
                    <FaSave
                      className="icon-edit"
                      onClick={() => {
                        saveItem('description');
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="close-option">
                <FaWindowClose
                  className="icon-close-option"
                  onClick={() => {
                    closeSidabar();
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
