import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
//servicios
import findByIdAlbums, { findPhotosByAlbumId } from '../../functions/helpers';

import './photoalbum.scss';
export default function({ albumId, photos, userId }) {
  console.log('on photo album-->', albumId, photos);

  if (!photos) {
    return false;
  }
  const [photoAlbums, setPhotoAlbums] = useState(undefined);
  useEffect(() => {
    loadPhotoAlbums();
  }, []);

  async function loadPhotoAlbums() {
    const photoAlbumsFilter = await findPhotosByAlbumId(photos, albumId);
    console.log('Photos->', photoAlbumsFilter);
    setPhotoAlbums(photoAlbumsFilter);
  }

  return (
    <div className="photos-container">
      <div className="go-back">
        <NavLink to={`/albums/${userId}`} className="navlink-goback">
          <FaArrowLeft className="iconGoBack" />
        </NavLink>
      </div>
      <div className="text-center">
        Mostrando todas las fotos del album: {albumId}
      </div>
      <div className="result-photos-album-user">
        {photoAlbums &&
          photoAlbums.map(photo => {
            return (
              <Card style={{ width: '18rem' }} className="card w-25">
                <Card.Img variant="top" src={photo.url} />
                <Card.Body>
                  <Card.Title>{photo.title}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
