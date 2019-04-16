import React, { useState, useEffect } from 'react';

//Servicios
import getUsersByPage from '../../services/users';

//Componentes
import ItemUsuario from '../item-user/Item-user';

//Librerias externas
import { Spinner } from 'react-bootstrap';

//Estilos SCSSs
import './home.scss';
import Sidebar from '../sidebar/Sidebar';

export default function({
  userList,
  setUserList,
  final,
  setFinal,
  pagina,
  setPagina
}) {
  if (!userList) {
    return false;
  }
  const [userDetailInfo, setUserDetailInfo] = useState(undefined);
  const [scrollVal, setScrollVal] = useState(0);

  const [reqInProgress, setReqInProgress] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  //----

  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const fakeDescription = `Some quick example text to build on the cardd title and
                      makee up thes bulk of the card's content...`;

  // Hooks que entra en acción al inicio y final del componente
  useEffect(() => {
    console.log(
      'Hooks que se dispara cuando hay un cambio de estado en [userList]: ',
      userList
    );
  }, [userList]);

  async function onScroll(elmt) {
    setScrollVal(elmt.scrollLeft);
    setShowSidebar(false);
    const visualArea = elmt.clientWidth;
    const pixelScrolled = elmt.scrollLeft;
    const scrollMaximumWidth = elmt.scrollWidth;

    if (visualArea + pixelScrolled === scrollMaximumWidth) {
      setFinal(true);
      //Se valida para no permitir hacer una peticion mientras se esta procesando otra igual.
      if (reqInProgress) {
        return;
      }
      setReqInProgress(true);
      const usersByPage = await getUsersByPage(pagina + 1);
      if (usersByPage && usersByPage.hasOwnProperty('data')) {
        if (usersByPage.data.length > 0) {
          //Es mejor de esta manera al hacer el cambio de estado y agregar nuevos elementos que recorrer el objeto de resultados y hacer push del nuevo elemento o con una concatenación de arrays.
          await usersByPage.data.map((element, index) => {
            return (element.description = fakeDescription);
          });
          setUserList([...userList, ...usersByPage.data]);
          if (Number(usersByPage.total_pages) >= pagina) {
            setPagina(pagina + 1);
          }
          setFinal(false);
        }
      }
      setReqInProgress(false);
    } else {
      setFinal(false);
    }
  }
  // Se vlida para no permitir aumentar scroll cuando se esta haciendo una peticion
  function onWheel(w) {
    if (w.deltaY < 0 && scrollVal >= 120) {
      setScrollVal(scrollVal - 120);
    } else if (w.deltaY < 0 && scrollVal <= 100) {
      setScrollVal(0);
    } else if (w.deltaY > 0 && !final && !reqInProgress) {
      setScrollVal(scrollVal + 120);
    } else {
      setScrollVal(scrollVal);
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
        {userList &&
          userList.map((userItem, index) => {
            return (
              <ItemUsuario
                key={index}
                setShowSidebar={setShowSidebar}
                userItem={userItem}
                setEditName={setEditName}
                setEditDescription={setEditDescription}
                setUserDetailInfo={setUserDetailInfo}
              />
            );
          })}
      </div>
      {reqInProgress || userList.length === 0 ? (
        <div className="loading-area">
          <Spinner animation="grow" variant="secondary" role="status" />
        </div>
      ) : (
        false
      )}

      <Sidebar
        setShowSidebar={setShowSidebar}
        infoToSide={userDetailInfo}
        editName={editName}
        setEditName={setEditName}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        userList={userList}
        setUserList={setUserList}
        showSidebar={showSidebar}
      />
    </div>
  );
}
