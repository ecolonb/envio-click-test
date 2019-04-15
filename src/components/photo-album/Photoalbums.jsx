import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

//servicios
import findByIdAlbums from '../../functions/helpers';

import './photoalbums.scss';

export default function({ userId, albums }) {
  return (
    <div className="album-container">
      <div className="go-back">
        <NavLink to="/albums" className="navlink-goback">
          <FaArrowLeft className="iconGoBack" />
        </NavLink>
      </div>
      <div className="text-center">
        Mostrando resultados del id usuario: {userId}
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ad rerum
      quod vero placeat ipsum velit recusandae eveniet, perspiciatis explicabo
      nulla ipsam culpa facere quaerat quas cum iusto voluptas hic!
    </div>
  );
}
