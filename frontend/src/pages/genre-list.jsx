import { useState, useEffect } from 'react';
import { Card, Table, Spinner, Badge, Alert, Button, Modal, Form } from 'react-bootstrap';
import apiClient from '../services/apiClient';

export default function GenreList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const emptyForm = { name: '', description: '', isActive: true };
  const [formData, setFormData] = useState(emptyForm);

  const fetchItems = async () => {
    try { setLoading(true); const res = await apiClient.get('/genres'); setItems(res.data); }
    catch(e) { setErrorMsg('Error red'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const openModal = (item = null) => { if(item) { setFormData(item); setIsEdit(true); } else { setFormData(emptyForm); setIsEdit(false); } setShowModal(true); };

  const saveForm = async (e) => {
    e.preventDefault();
    try {
      if(isEdit) await apiClient.put(`/genres/${formData._id}`, formData);
      else await apiClient.post('/genres', formData);
      setShowModal(false); fetchItems();
    } catch(e) { alert(e.response?.data?.message || 'Error'); }
  };

  return (
    <>
      <Card className="shadow-lg border-0 mb-4 rounded-4">
        <Card.Header className="bg-primary text-white py-3 d-flex justify-content-between align-items-center"><h3 className="mb-0">🎭 Géneros</h3><Button variant="light" className="fw-bold" onClick={()=>openModal()}>+ Nuevo</Button></Card.Header>
        <Card.Body>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          {loading ? <Spinner animation="border" /> : (
            <Table hover responsive>
              <thead><tr><th>Nombre</th><th>Descripción</th><th>Estatus</th><th>Acciones</th></tr></thead>
              <tbody>{items.map(i => <tr key={i._id}><td className="fw-bold">{i.name}</td><td>{i.description}</td><td><Badge bg={i.isActive?'success':'danger'}>{i.isActive?'Activo':'Inactivo'}</Badge></td><td><Button size="sm" variant="outline-primary" onClick={()=>openModal(i)}>Editar</Button></td></tr>)}</tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>{isEdit ? 'Editar' : 'Crear'} Género</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveForm}>
            <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Descripción</Form.Label><Form.Control as="textarea" required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} /></Form.Group>
            {isEdit && <Form.Check type="switch" label="Estatus Activo" checked={formData.isActive} onChange={e=>setFormData({...formData, isActive: e.target.checked})} />}
            <Button type="submit" variant="primary">Guardar Catálogo</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
