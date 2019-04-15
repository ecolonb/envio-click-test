import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

//Servicios
import { getUsersWithAlbums } from '../../services/users';

import './albums.scss';
export default function() {
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    console.log('On use effect-->>>');
    loadUSers();
  }, []);
  async function loadUSers() {
    console.log('Obteniendo los usuarios');
    const usersWA = await getUsersWithAlbums();
    setUsers(usersWA.data);
    console.log('usersWA: ', usersWA);
  }

  return (
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
                      // showDetails(e);
                      console.log('View photos id: ', item.id);
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
