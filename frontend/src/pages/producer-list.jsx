import { useState, useEffect } from 'react';
import { Card, Table, Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';
import apiClient from '../services/apiClient';

export default function ProducerList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const emptyForm = { name: '', slogan: '', description: '', isActive: true };
  const [formData, setFormData] = useState(emptyForm);

  const fetchItems = async () => { try { setLoading(true); const res = await apiClient.get('/producers'); setItems(res.data); } catch(e){} finally{ setLoading(false); } };
  useEffect(() => { fetchItems(); }, []);

  const openModal = (item = null) => { if(item) { setFormData(item); setIsEdit(true); } else { setFormData(emptyForm); setIsEdit(false); } setShowModal(true); };
  const saveForm = async (e) => { e.preventDefault(); try{ if(isEdit) await apiClient.put(`/producers/${formData._id}`, formData); else await apiClient.post('/producers', formData); setShowModal(false); fetchItems(); }catch(e){ alert(e.response?.data?.message || 'Error');} };

  return (
    <>
      <Card className="shadow-lg border-0 mb-4 rounded-4"><Card.Header className="bg-primary text-white py-3 d-flex justify-content-between align-items-center"><h3 className="mb-0">🎥 Productoras</h3><Button variant="light" className="fw-bold" onClick={()=>openModal()}>+ Nuevo Estudio</Button></Card.Header><Card.Body>{loading?<Spinner/>:<Table hover responsive><thead><tr><th>Nombre Estudio</th><th>Slogan</th><th>Estatus</th><th>Acciones</th></tr></thead><tbody>{items.map(i => <tr key={i._id}><td className="fw-bold text-primary">{i.name}</td><td><i className="text-muted">"{i.slogan}"</i></td><td><Badge bg={i.isActive?'success':'danger'}>{i.isActive?'Licencia Activa':'Licencia Revocada'}</Badge></td><td><Button size="sm" variant="outline-primary" onClick={()=>openModal(i)}>Ajustar</Button></td></tr>)}</tbody></Table>}</Card.Body></Card>
      <Modal show={showModal} onHide={()=>setShowModal(false)}><Modal.Header closeButton><Modal.Title>{isEdit ? 'Propiedades' : 'Inscribir'} Productora</Modal.Title></Modal.Header><Modal.Body><Form onSubmit={saveForm}><Form.Group className="mb-3"><Form.Label>Nombre Corporativo</Form.Label><Form.Control required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/></Form.Group><Form.Group className="mb-3"><Form.Label>Lema Oficial (Slogan)</Form.Label><Form.Control value={formData.slogan} onChange={e=>setFormData({...formData, slogan: e.target.value})}/></Form.Group><Form.Group className="mb-3"><Form.Label>Descripción Ejecutiva</Form.Label><Form.Control as="textarea" required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})}/></Form.Group>{isEdit && <Form.Check type="switch" label="Contrato Operativo" checked={formData.isActive} onChange={e=>setFormData({...formData, isActive: e.target.checked})}/>}<Button type="submit" variant="primary">Guardar Catálogo</Button></Form></Modal.Body></Modal>
    </>
  );
}
