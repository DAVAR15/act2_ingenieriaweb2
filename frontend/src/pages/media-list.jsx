import { useState, useEffect } from 'react';
import { Card, Table, Spinner, Badge, Alert, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import apiClient from '../services/apiClient';

export default function MediaList() {
  const [medias, setMedias] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const emptyForm = { serial: '', title: '', synopsis: '', url: '', coverImage: '', releaseYear: new Date().getFullYear(), genre: '', director: '', producer: '', type: '' };
  const [formData, setFormData] = useState(emptyForm);
  const [processing, setProcessing] = useState(false);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const [mRes, gRes, dRes, pRes, tRes] = await Promise.all([
        apiClient.get('/media'),
        apiClient.get('/genres'),
        apiClient.get('/directors'),
        apiClient.get('/producers'),
        apiClient.get('/types')
      ]);
      setMedias(Array.isArray(mRes?.data) ? mRes.data : []);
      setGenres(Array.isArray(gRes?.data) ? gRes.data : []);
      setDirectors(Array.isArray(dRes?.data) ? dRes.data : []);
      setProducers(Array.isArray(pRes?.data) ? pRes.data : []);
      setTypes(Array.isArray(tRes?.data) ? tRes.data : []);
    } catch (e) {
      setErrorMsg('Error de red al cargar el Ecosistema Multimedia');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  const openModal = (item = null) => {
    if(item) { 
      setFormData({
        ...item,
        genre: item.genre?._id || '',
        director: item.director?._id || '',
        producer: item.producer?._id || '',
        type: item.type?._id || ''
      });
      setIsEdit(true); 
    }
    else { setFormData(emptyForm); setIsEdit(false); }
    setShowModal(true);
  };

  const saveForm = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      if(isEdit) await apiClient.put(`/media/${formData._id}`, formData);
      else await apiClient.post('/media', formData);
      setShowModal(false);
      const mRes = await apiClient.get('/media');
      setMedias(Array.isArray(mRes?.data) ? mRes.data : []);
    } catch(e) { alert(e.response?.data?.message || 'Error guardando'); } 
    finally { setProcessing(false); }
  };

  return (
    <>
      <Card className="shadow-lg border-0 mb-4 rounded-4 overflow-hidden">
        <Card.Header className="bg-danger text-white d-flex justify-content-between align-items-center py-4 px-3 px-md-5">
          <h2 className="mb-0 fw-bolder">🍿 Panel de Control Cuevana (Media)</h2>
          <Button variant="warning" className="fw-bolder px-4 rounded-pill shadow text-dark border-0" onClick={() => openModal()}>+ Registrar Producción</Button>
        </Card.Header>
        <Card.Body className="p-0">
          {errorMsg && <Alert variant="danger" className="m-4 shadow-sm fw-bold">{errorMsg}</Alert>}
          {isLoading ? <div className="text-center py-5"><Spinner animation="border" variant="danger"/></div> : (
            <Table responsive hover className="align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="ps-md-5 py-3">Portada Visual</th><th>Catálogo Técnico</th><th>Clasificaciones</th><th>Estudio / Staff</th><th className="text-center pe-md-5">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {medias.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted py-5 fw-bold fs-5">No existe ninguna película registrada todavía.</td></tr>
                ) : (
                  medias.map(m => (
                    <tr key={m._id}>
                      <td className="ps-md-5">
                        <img src={m.coverImage} alt="Port" style={{width: '75px', height: '110px', objectFit: 'cover'}} className="rounded shadow border" />
                      </td>
                      <td>
                        <span className="text-muted small fw-bold font-monospace">#{m.serial}</span><br/>
                        <span className="fw-bolder fs-4 text-primary">{m.title}</span><br/>
                        <Badge bg="warning" text="dark" className="fs-6 mt-1 shadow-sm">{m.releaseYear}</Badge>
                      </td>
                      <td>
                        <Badge bg="success" className="me-1 mb-1 fs-6 px-3">{m.genre?.name || 'Huérfano'}</Badge><br/>
                        <Badge bg="secondary" className="px-3 shadow-sm">{m.type?.name || 'N/A'}</Badge>
                      </td>
                      <td>
                        <div className="small mb-1"><strong>Dir:</strong> {m.director?.names || 'N/A'}</div>
                        <div className="small text-truncate" style={{maxWidth: '180px'}}><strong>Prod:</strong> {m.producer?.name || 'N/A'}</div>
                      </td>
                      <td className="text-center pe-md-5">
                        <Button size="sm" variant="outline-danger" className="fw-bold px-4 rounded-pill shadow-sm" onClick={()=>openModal(m)}>⚙️ Setup</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={()=>setShowModal(false)} centered backdrop="static" size="xl">
        <Modal.Header closeButton className="bg-dark text-white"><Modal.Title className="fw-bold fs-3">{isEdit ? 'Actualizar Ficha' : 'Nueva Película'}</Modal.Title></Modal.Header>
        <Modal.Body className="p-4 p-md-5 bg-light">
          <Form onSubmit={saveForm}>
            <Row className="gy-4">
              <Col lg={4}>
                <h5 className="fw-bold text-danger border-bottom pb-2 mb-3">Ficha Técnica</h5>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">Serial</Form.Label><Form.Control required value={formData.serial} onChange={e=>setFormData({...formData, serial: e.target.value})} disabled={isEdit} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">Título</Form.Label><Form.Control required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">Año</Form.Label><Form.Control type="number" required value={formData.releaseYear} onChange={e=>setFormData({...formData, releaseYear: e.target.value})} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">Sinopsis</Form.Label><Form.Control as="textarea" rows={4} required value={formData.synopsis} onChange={e=>setFormData({...formData, synopsis: e.target.value})} /></Form.Group>
              </Col>
              <Col lg={4}>
                <h5 className="fw-bold text-danger border-bottom pb-2 mb-3">Recursos Enlaces</h5>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">URL Video</Form.Label><Form.Control type="url" required value={formData.url} onChange={e=>setFormData({...formData, url: e.target.value})} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">URL Póster</Form.Label><Form.Control type="url" required value={formData.coverImage} onChange={e=>setFormData({...formData, coverImage: e.target.value})} /></Form.Group>
                {formData.coverImage && <div className="text-center rounded-3 bg-dark p-3 shadow-lg"><img src={formData.coverImage} alt="Preview" className="img-fluid rounded" style={{maxHeight:'200px'}}/></div>}
              </Col>
              <Col lg={4}>
                <h5 className="fw-bold text-danger border-bottom pb-2 mb-3">Relaciones Mongoose</h5>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">Tipo Formato</Form.Label><Form.Select required value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})}><option value="">--Seleccionar--</option>{types.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}</Form.Select></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">Género</Form.Label><Form.Select required value={formData.genre} onChange={e=>setFormData({...formData, genre: e.target.value})}><option value="">--Seleccionar--</option>{genres.filter(g => g.isActive || g._id === formData.genre).map(g => <option key={g._id} value={g._id}>{g.name} {!g.isActive ? '(Baneado)' : ''}</option>)}</Form.Select></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">Productora</Form.Label><Form.Select required value={formData.producer} onChange={e=>setFormData({...formData, producer: e.target.value})}><option value="">--Seleccionar--</option>{producers.filter(p => p.isActive || p._id === formData.producer).map(p => <option key={p._id} value={p._id}>{p.name} {!p.isActive ? '(Baneada)' : ''}</option>)}</Form.Select></Form.Group>
                <Form.Group className="mb-3"><Form.Label className="fw-bold">Director</Form.Label><Form.Select required value={formData.director} onChange={e=>setFormData({...formData, director: e.target.value})}><option value="">--Seleccionar--</option>{directors.filter(d => d.isActive || d._id === formData.director).map(d => <option key={d._id} value={d._id}>{d.names} {!d.isActive ? '(Baneado)' : ''}</option>)}</Form.Select></Form.Group>
              </Col>
            </Row>
            <div className="d-grid gap-3 d-md-flex justify-content-md-end mt-5 pt-4 border-top">
              <Button variant="outline-dark" size="lg" onClick={()=>setShowModal(false)} className="rounded-pill px-5 fw-bold">Cancelar</Button>
              <Button variant="danger" size="lg" type="submit" disabled={processing} className="rounded-pill px-5 fw-bold shadow-lg">{processing ? <Spinner animation="border" /> : 'Confirmar Todo'}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
