import { useState, useEffect } from 'react';
import { Card, Table, Spinner, Badge, Alert, Button, Modal, Form } from 'react-bootstrap';
import apiClient from '../services/apiClient';

export default function DirectorList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const emptyForm = { names: '', isActive: true };
  const [formData, setFormData] = useState(emptyForm);

  const fetchItems = async () => { try { setLoading(true); const res = await apiClient.get('/directors'); setItems(res.data); } catch(e){} finally{ setLoading(false); } };
  useEffect(() => { fetchItems(); }, []);

  const openModal = (item = null) => { if(item) { setFormData(item); setIsEdit(true); } else { setFormData(emptyForm); setIsEdit(false); } setShowModal(true); };
  const saveForm = async (e) => { e.preventDefault(); try{ if(isEdit) await apiClient.put(`/directors/${formData._id}`, formData); else await apiClient.post('/directors', formData); setShowModal(false); fetchItems(); }catch(e){} };

  return (
    <>
      <Card className="shadow-lg border-0 mb-4 rounded-4"><Card.Header className="bg-primary text-white py-3 d-flex justify-content-between align-items-center"><h3 className="mb-0">🎬 Directores</h3><Button variant="light" className="fw-bold" onClick={()=>openModal()}>+ Nuevo</Button></Card.Header><Card.Body>{loading?<Spinner/>:<Table hover><thead><tr><th>Nombre Autor</th><th>Estatus</th><th>Acciones</th></tr></thead><tbody>{items.map(i => <tr key={i._id}><td className="fw-bold">{i.names}</td><td><Badge bg={i.isActive?'success':'danger'}>{i.isActive?'Activo':'Inactivo'}</Badge></td><td><Button size="sm" variant="outline-primary" onClick={()=>openModal(i)}>Editar Setup</Button></td></tr>)}</tbody></Table>}</Card.Body></Card>
      <Modal show={showModal} onHide={()=>setShowModal(false)}><Modal.Header closeButton><Modal.Title>{isEdit ? 'Editar' : 'Crear'} Director</Modal.Title></Modal.Header><Modal.Body><Form onSubmit={saveForm}><Form.Group className="mb-3"><Form.Label>Nombre y Apellido</Form.Label><Form.Control required value={formData.names} onChange={e=>setFormData({...formData, names: e.target.value})}/></Form.Group>{isEdit && <Form.Check type="switch" label="Activo en Base de Datos" checked={formData.isActive} onChange={e=>setFormData({...formData, isActive: e.target.checked})}/>}<Button type="submit" variant="primary">Guardar Catálogo</Button></Form></Modal.Body></Modal>
    </>
  );
}
