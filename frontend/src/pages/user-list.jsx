import { useState, useEffect } from 'react';
import { Card, Table, Spinner, Badge, Alert, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUserEdit, setCurrentUserEdit] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchActiveUsers = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get('/users');
      setUsers(Array.isArray(res?.data) ? res.data : []); 
    } catch (e) { setErrorMessage('Falla de conexión al servidor Node'); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchActiveUsers(); }, []);

  const handleOpenEdit = (user) => { setCurrentUserEdit(user); setShowEditModal(true); };
  const handleCloseEdit = () => { setShowEditModal(false); setCurrentUserEdit(null); };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await apiClient.put(`/users/${currentUserEdit._id}`, { name: currentUserEdit.name, email: currentUserEdit.email });
      setShowEditModal(false); fetchActiveUsers();
    } catch (e) { alert('Falla al actualizar datos'); } finally { setIsProcessing(false); }
  };

  const handleDeactivate = async (userId) => {
    if (!window.confirm("¿Dar de Baja Permanentemente?")) return;
    try { setIsLoading(true); await apiClient.patch(`/users/${userId}/deactivate`); fetchActiveUsers(); } 
    catch (e) { alert('Error de red'); setIsLoading(false); }
  };

  return (
    <>
      <Card className="shadow-lg border-0 mb-4 rounded-4">
        <Card.Header className="bg-primary text-white py-3 d-flex justify-content-between align-items-center"><h3 className="mb-0 fw-bold">👥 Administración de Operadores</h3><Button variant="light" className="text-primary fw-bold rounded-pill" onClick={() => navigate('/users/new')}>+ Registrar Nuevo</Button></Card.Header>
        <Card.Body className="p-4">
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {isLoading ? <Spinner animation="border" /> : (
            <Table responsive hover>
              <thead><tr><th>Nombre</th><th>Email</th><th>Estatus Base Datos</th><th>Acciones Administrativas</th></tr></thead>
              <tbody>{users.length === 0 ? (<tr><td colSpan="4" className="text-center text-muted fw-bold">Sin operadores registrados</td></tr>) : ( users.map(u => (<tr key={u._id}><td className="fw-bold">{u.name}</td><td>{u.email}</td><td><Badge bg={u.isActive?'success':'danger'}>{u.isActive?'Operativo Activo':'Baja Administrativa'}</Badge></td><td><Button size="sm" variant="outline-info" onClick={()=>handleOpenEdit(u)} disabled={!u.isActive}>Modificar</Button>{u.isActive && <Button size="sm" variant="outline-danger" className="ms-2" onClick={()=>handleDeactivate(u._id)}>Suspender (Soft Delete)</Button>}</td></tr>)) )}</tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton><Modal.Title>Modificar Credencial de Operador</Modal.Title></Modal.Header>
        <Modal.Body>
          {currentUserEdit && (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3"><Form.Label>Nombre Completo</Form.Label><Form.Control value={currentUserEdit.name} onChange={e=>setCurrentUserEdit({...currentUserEdit,name:e.target.value})} required/></Form.Group>
              <Form.Group className="mb-3"><Form.Label>Correo Electrónico Válido</Form.Label><Form.Control value={currentUserEdit.email} onChange={e=>setCurrentUserEdit({...currentUserEdit,email:e.target.value})} required/></Form.Group>
              <Button type="submit" variant="primary" disabled={isProcessing}>{isProcessing?'Sincronizando...':'Sobrescribir Registro'}</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
