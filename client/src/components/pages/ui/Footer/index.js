import React from 'react'

import { Link } from 'react-router-dom'
import './Footer.css'

import Row from 'react-bootstrap/Row'




const Footer = () => {
    return (
       <footer className="piePagina">
       <Row>
                <div className="col-lg-3 col-sm-3 col-6 text-xs-center ">
            <ul>
                <li><Link to="#">+34 666 666</Link></li>
                <li><Link to="#">viajarmola@viajarmola.com</Link></li>
                <li><Link to="#">Lun - Vie: 10h-18h</Link></li>
            </ul>
           
             </div>
                <div className="col-lg-3 col-sm-3 col-6 text-xs-center ">
            <ul>
                <li><Link to="#">Preguntas frecuentes</Link></li>
                <li><Link to="#">Politica de privacidad</Link></li>
                <li><Link to="#">Condiciones generales</Link></li>
            </ul>
            </div>
                <div className="col-lg-3 col-sm-3 col-6 text-xs-center ">
            <ul>
                <li><Link to="#">Aviso legal</Link></li>
                <li><Link to="#">Recomendar a un amigo</Link></li>
                <li><Link to="#">Viajes pasados</Link></li>
            </ul>
            </div>
            </Row>
           

       </footer>
    )
}

export default Footer