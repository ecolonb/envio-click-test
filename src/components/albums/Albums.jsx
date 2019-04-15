import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './albums.scss';
export default function({ users, setUsers }) {
  const [redirect, setRedirect] = useState(undefined);

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
