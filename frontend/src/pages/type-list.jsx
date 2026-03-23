import { useState, useEffect } from 'react';
import { Card, Table, Spinner, Button, Modal, Form } from 'react-bootstrap';
import apiClient from '../services/apiClient';

export default function TypeList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const emptyForm = { name: '', description: '' };
  const [formData, setFormData] = useState(emptyForm);

  const fetchItems = async () => { try { setLoading(true); const res = await apiClient.get('/types'); setItems(res.data); } catch(e){} finally{ setLoading(false); } };
  useEffect(() => { fetchItems(); }, []);

  const openModal = (item = null) => { if(item) { setFormData(item); setIsEdit(true); } else { setFormData(emptyForm); setIsEdit(false); } setShowModal(true); };
  const saveForm = async (e) => { e.preventDefault(); try{ if(isEdit) await apiClient.put(`/types/${formData._id}`, formData); else await apiClient.post('/types', formData); setShowModal(false); fetchItems(); }catch(e){alert(e.response?.data?.message || 'Error');} };

  return (
    <>
      <Card className="shadow-lg border-0 mb-4 rounded-4"><Card.Header className="bg-primary text-white py-3 d-flex justify-content-between align-items-center"><h3 className="mb-0">📺 Formatos (Tipos)</h3><Button variant="light" className="fw-bold" onClick={()=>openModal()}>+ Nuevo Origen</Button></Card.Header><Card.Body>{loading?<Spinner/>:<Table hover><thead><tr><th>Denominación</th><th>Descripción</th><th>Acciones</th></tr></thead><tbody>{items.map(i => <tr key={i._id}><td className="fw-bold text-success">{i.name}</td><td>{i.description}</td><td><Button size="sm" variant="outline-primary" onClick={()=>openModal(i)}>Editar Setup</Button></td></tr>)}</tbody></Table>}</Card.Body></Card>
      <Modal show={showModal} onHide={()=>setShowModal(false)}><Modal.Header closeButton><Modal.Title>{isEdit ? 'Editar' : 'Crear'} Modalidad</Modal.Title></Modal.Header><Modal.Body><Form onSubmit={saveForm}><Form.Group className="mb-3"><Form.Label>Categoría Raíz</Form.Label><Form.Control required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})}/></Form.Group><Form.Group className="mb-3"><Form.Label>Descripción del Segmento</Form.Label><Form.Control as="textarea" required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})}/></Form.Group><Button type="submit" variant="primary">Guardar Catálogo</Button></Form></Modal.Body></Modal>
    </>
  );
}
