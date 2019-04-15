import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FaWindowClose, FaPen, FaSave } from 'react-icons/fa';

//Librerias externas
import swal from 'sweetalert';

//Servicios
import alertError from '../../services/alerts';

import './sidebar.scss';

export default function({
  setShowSidebar,
  infoToSide,
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  userList,
  setUserList
}) {
  if (!infoToSide) {
    return false;
  }

  const [dataFormDetails, setDataFormDetails] = useState(undefined);
  async function saveInfo(typeInfoToSave) {
    if (!dataFormDetails) {
      return false;
    }
    console.log(
      'La edicón no es percistente, solo se actualiza el estado..., falta hacer una llamada http y actualizar los datos en el server'
    );
    const listClone = userList.slice(0);
    await listClone.map((element, index) => {
      if (element.id === infoToSide.id) {
        if (typeInfoToSave === 'name') {
          element.first_name = dataFormDetails.first_name
            ? dataFormDetails.first_name
            : element.first_name;
          element.last_name = dataFormDetails.last_name
            ? dataFormDetails.last_name
            : element.last_name;
          setEditName(false);
        } else if (typeInfoToSave === 'description') {
          element.description = dataFormDetails.description
            ? dataFormDetails.description
            : element.description;
          setEditDescription(false);
        }
      }
    });

    setUserList(listClone);
  }

  // setUserList

  function saveItem(item) {
    switch (item) {
      case 'name':
        if (!dataFormDetails) {
          setEditName(false);
          break;
        } else if (
          !dataFormDetails.hasOwnProperty('last_name') &&
          !dataFormDetails.hasOwnProperty('first_name')
        ) {
          setEditName(false);
          break;
        } else {
          saveInfo('name');
        }
        break;
      case 'description':
        if (!dataFormDetails) {
          setEditDescription(false);
          break;
        } else if (dataFormDetails.hasOwnProperty('description')) {
          if (dataFormDetails.description.trim().length === 0) {
            alertError('¡Debes ingresar la descripción!');
          } else {
            saveInfo('description');
          }
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
    setDataFormDetails(undefined);
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
                    <React.Fragment>
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        name="first_name"
                        defaultValue={infoToSide.first_name}
                        onChange={evt => {
                          onChangeEvent(evt);
                        }}
                        className="form-control-edit"
                      />
                      <Form.Control
                        type="text"
                        name="last_name"
                        placeholder="Last name"
                        defaultValue={infoToSide.last_name}
                        onChange={evt => {
                          onChangeEvent(evt);
                        }}
                      />
                    </React.Fragment>
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
                      {infoToSide.description}
                      <br />
                      Id: <strong>{infoToSide.id}</strong>
                    </React.Fragment>
                  )}
                  {editDescription && (
                    <Form.Control
                      as="textarea"
                      name="description"
                      defaultValue={infoToSide.description}
                      onChange={evt => {
                        onChangeEvent(evt);
                      }}
                      rows="9"
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
