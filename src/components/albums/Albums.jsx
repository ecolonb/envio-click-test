import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
//Servicios
import { getUsersWithAlbums } from '../../services/users';
import getAllAlbums from '../../services/albums';

import './albums.scss';
export default function() {
  const [users, setUsers] = useState(undefined);
  const [redirect, setRedirect] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  useEffect(() => {
    console.log('On use effect-->>>');
    loadUSers();
  }, []);

  async function loadUSers() {
    //Cuando carga el componente albums se caran del Api, Usuarios y albums, las fotos las cargo en el componente photo_albums
    const usersWA = await getUsersWithAlbums();
    setUsers(usersWA.data);
    //Usando promesas para obtener los albums
    // getAllAlbums()
    //   .then(albumsResp => {
    //     console.log('Albums: ', albumsResp);
    //     setAlbums(albumsResp);
    //   })
    //   .catch(err => {
    //     console.log('error->', err);
    //   });
  }

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <div className="albums-container">
      <div className="list-users">
        <Table
          responsive
          className="table table-striped"
          style={{ zIndex: '0' }}
        >
          <thead className="bg-secondary" style={{ color: '#FFFFFF' }}>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item, index) => {
                return item === undefined ? (
                  false
                ) : (
                  <tr
                    className="item-user"
                    onClick={e => {
                      setRedirect(`/albums/${item.id}`);
                      return console.log('View photos id: ', item.id);
                    }}
                  >
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.website}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
