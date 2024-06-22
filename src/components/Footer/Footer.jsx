import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
        <p>Serratec / Grupo 02 - Projeto Final de React  - {new Date().getFullYear()}</p>
        <p>Desenvolvido por: Larissa, Cristiano, Arthur, José Luiz, Rodrigo e André</p>
        <ul className='social_list'>
            <li><FaFacebook /></li>
            <li><FaInstagram /></li>
            <li><FaTwitter /></li>
            <li><FaYoutube /></li>
        </ul>
    </footer>
  );
};

export default Footer;