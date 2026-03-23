import { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });
    try {
      await apiClient.post('/users', formData);
      setStatus({ loading: false, error: null, success: true });
      setTimeout(() => navigate('/users'), 1800);
    } catch (e) { setStatus({ loading: false, error: e.response?.data?.message || 'Error', success: false }); }
  };

  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Header className="bg-primary text-white py-3"><h3 className="mb-0">Añadir Nuevo Operador</h3></Card.Header>
      <Card.Body className="p-4">
        {status.error && <Alert variant="danger">{status.error}</Alert>}
        {status.success && <Alert variant="success">Operador validado y guardado con éxito! Redirigiendo a la tabla central...</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4"><Form.Label className="fw-bold">Nombre Completo Real</Form.Label><Form.Control required onChange={e=>setFormData({...formData, name: e.target.value})}/></Form.Group>
          <Form.Group className="mb-4"><Form.Label className="fw-bold">Correo (Email Autenticador)</Form.Label><Form.Control type="email" required onChange={e=>setFormData({...formData, email: e.target.value})}/></Form.Group>
          <Button type="submit" size="lg" disabled={status.loading} variant="primary">{status.loading ? <Spinner animation="border" size="sm"/> : 'Registrar Credencial y Subir'}</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
