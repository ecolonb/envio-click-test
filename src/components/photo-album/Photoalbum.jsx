import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

//servicios
import findByIdAlbums from '../../functions/helpers';

import './photoalbum.scss';
// component={Photoalbum}
//                   loggedUser={loggedUser}
//                   setLoggedUser={setLoggedUser}
//                   albumId={albumId}
//                   photos={photos}
//                   albums={albums}
export default function({ albumId, photos, userId }) {
  console.log('on photo album-->', albumId, photos);

  if (!photos) {
    return false;
  }
  const [photoAlbums, setPhotoAlbums] = useState(undefined);
  useEffect(() => {
    loadUserAlbums();
  }, []);

  async function loadUserAlbums() {
    const userAlbumsFilter = await findByIdAlbums(photos, albumId);
    setPhotoAlbums(userAlbumsFilter);
  }

  return (
    <div className="album-container">
      <div className="go-back">
        <NavLink to={`/albums/${userId}`} className="navlink-goback">
          <FaArrowLeft className="iconGoBack" />
        </NavLink>
      </div>
      <div className="text-center">
        Mostrando todas las fotos del album: {albumId}
      </div>
      <div className="resultAlbumsUser">
        {photoAlbums &&
          photoAlbums.map(photo => {
            return <p> {JSON.stringify(photo)} </p>;
          })}
      </div>
    </div>
  );
}
