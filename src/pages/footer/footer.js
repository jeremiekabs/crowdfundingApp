import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {
  return (
    <footer className="footer text-light bg-dark">
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <h5>À propos</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <p><a href="#" className="text-light">Politique de confidentialité</a> | <a href="#" className="text-light">Conditions d'utilisation</a></p>
          </Col>
          <Col md={4}>
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Comment ça marche ?</a></li>
              <li><a href="#" className="text-light">Nos projets</a></li>
              <li><a href="#" className="text-light">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Suivez-nous</h5>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#" className="text-light">Facebook</a></li>
              <li className="inline-item"><a href="#" className="text-light">Twitter</a></li>
              <li className="inline-item"><a href="#" className="text-light">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <p className="text-center">© 2024 Votre plateforme de crowdfunding</p>
      </Container>
    </footer>
  );
};

export default Footer;
