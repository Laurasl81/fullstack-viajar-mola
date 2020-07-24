import React from 'react'

import { Link } from 'react-router-dom'
import './Footer.css'

import Row from 'react-bootstrap/Row'




const Footer = () => {
    return (
       <footer>
       <Row>
                <div className="col-lg-4 col-sm-3 col-6 text-xs-center ">
            <ul>
                <li>+34 666 666</li>
                <li>viajarmola@viajarmola.com</li>
                <li>Lun - Vie: 10h-18h</li>
            </ul>
           
             </div>
                <div className="col-lg-4 col-sm-3 col-6 text-xs-center ">
            <ul>
                <li><Link to="#">Preguntas frecuentes</Link></li>
                <li><Link to="#">Politica de privacidad</Link></li>
                <li><Link to="#">Condiciones generales</Link></li>
            </ul>
            </div>
                <div className="col-lg-4 col-sm-3 col-6 text-xs-center ">
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