import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Financement() {
    const { id: financementId } = useParams(); // Récupère l'ID du financement depuis l'URL
    const [project, setProject] = useState(''); // État pour le projet
    const [userId, setUserId] = useState(null); // État pour l'ID de l'utilisateur connecté
    const [montant, setMontant] = useState(''); // Nouvel état pour le montant

    useEffect(() => {
        // Récupère l'ID de l'utilisateur connecté depuis le local storage
        const storedUserId = localStorage.getItem('user_id');
        setUserId(storedUserId);

        // Fetch project by financing ID
        axios.get(`http://localhost:8000/api/projet/${financementId}`)
            .then(response => {
                setProject(response.data.projectId);
            })
            .catch(error => {
                console.error("There was an error fetching the project!", error);
            });
    }, [financementId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const financementData = {
            projet_id: project.id,
            demandeur_user_id: project.user.id,
            donateur_user_id: userId,
            montant_f: montant,
        };

        // Submit form data to backend
        axios.post('http://localhost:8000/api/financement/create', financementData)
            .then(response => {
                alert( response.data.success);
                console.log("Financement submitted successfully!", response.data);
                setMontant('');
            })
            .catch(error => {
                console.error("There was an error submitting the financement!", error);
                alert('Erreur lors de la soumission du financement. Veuillez réessayer.');
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col lg={6} className="mb-4">
                    <h2>Pourquoi financer ce projet?</h2>
                    <p>
                        En soutenant ce projet, vous aidez à transformer une idée en réalité. Votre contribution permet de réaliser des
                        initiatives significatives qui ont un impact direct sur notre communauté. Chaque don compte et rapproche ce projet
                        de son succès. Ensemble, nous pouvons faire la différence!
                    </p>
                </Col>
                <Col lg={6}>
                    <h1 className="text-center mb-4">Financement</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Montant</Form.Label>
                            <Form.Control
                                type="number"
                                name="montant_f"
                                value={montant}
                                onChange={(e) => setMontant(e.target.value)}
                                required
                                placeholder="Entrez le montant"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/* <Form.Label>Projet ID</Form.Label> */}
                            <Form.Control
                                type="hidden"
                                name="projet_id"
                                value={project.id || ''}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/* <Form.Label>Demandeur de projet</Form.Label> */}
                            <Form.Control
                                type="hidden"
                                name="demandeur_user_id"
                                value={project.user ? project.user.id : ''}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            {/* <Form.Label>Donateur</Form.Label> */}
                            <Form.Control
                                type="hidden"
                                name="donateur_user_id"
                                value={userId || ''}
                                readOnly
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100 mb-5">
                            Financer
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Financement;
