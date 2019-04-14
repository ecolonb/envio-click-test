import React, { useState, useEffect } from 'react';

//Servicios
import getUsersByPage from '../../services/users';

//Componentes
import ItemUsuario from '../item-user/Item-user';

//Librerias externas
import { Spinner } from 'react-bootstrap';

//Estilos SCSSs
import './home.scss';

export default function() {
  const [scrollVal, setScrollVal] = useState(0);
  const [final, setFinal] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [userList, setUserList] = useState([]);
  const [reqInProgress, setReqInProgress] = useState(false);

  // Hooks que entra en acción al inicio y final del componente
  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    console.log(
      'Hooks que se dispara cuando hay un cambio de estado en [userList]: ',
      userList
    );
  }, [userList]);

  async function loadUsers() {
    setReqInProgress(true);
    const usersByPage = await getUsersByPage(pagina);
    if (usersByPage) {
      setUserList([...userList, ...usersByPage.data]);
    }
    setReqInProgress(false);
  }

  async function onScroll(elmt) {
    setScrollVal(elmt.scrollLeft);
    const visualArea = elmt.clientWidth;
    const pixelScrolled = elmt.scrollLeft;
    const scrollMaximumWidth = elmt.scrollWidth;

    if (visualArea + pixelScrolled === scrollMaximumWidth) {
      setFinal(true);
      console.log('----- - Scroll end - Making the request ------');

      //Se valida para no permitir hacer una peticion mientras se esta procesando otra igual.
      if (reqInProgress) {
        return;
      }
      setReqInProgress(true);
      const usersByPage = await getUsersByPage(pagina + 1);
      if (usersByPage) {
        //Es mejor de esta manera al hacer el cambio de estado y agregar nuevos elementos que recorrer el objeto de resultados y hacer push del nuevo elemento o con una concatenación de arrays.

        setUserList([...userList, ...usersByPage.data]);

        if (Number(usersByPage.total_pages) >= pagina) {
          setPagina(pagina + 1);
        }
        setFinal(false);
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
        {userList.map((user_item, index) => {
          return <ItemUsuario key={index} usuarioInfo={user_item} />;
        })}
      </div>
      {reqInProgress && (
        <div className="loading-area">
          <Spinner animation="grow" variant="secondary" role="status" />
        </div>
      )}
    </div>
  );
}
