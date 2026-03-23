import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import ThemeProvider, { useTheme } from './context/ThemeContext';

import UserList from './pages/user-list';
import UserForm from './pages/user-form';
import GenreList from './pages/genre-list';
import DirectorList from './pages/director-list';
import ProducerList from './pages/producer-list';
import TypeList from './pages/type-list';
import MediaList from './pages/media-list';

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column transition-all">
        <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" className="shadow-sm border-bottom" sticky="top">
          <Container fluid>
            <Navbar.Brand as={Link} to="/media" className="fw-bolder fs-4 px-md-3 text-warning">🤖 CUEVANA ADMIN</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto gap-2">
                <Nav.Link as={Link} to="/media" className="fw-bolder fs-6 btn btn-danger rounded-pill px-4 text-white shadow-sm ms-md-2 mt-2 mt-md-0 mb-2 mb-md-0 me-md-4">🍿 PELÍCULAS (MAESTRO)</Nav.Link>
                <Nav.Link as={Link} to="/genres" className="fw-semibold text-light pt-md-2">🎭 Géneros</Nav.Link>
                <Nav.Link as={Link} to="/directors" className="fw-semibold text-light pt-md-2">🎬 Directores</Nav.Link>
                <Nav.Link as={Link} to="/producers" className="fw-semibold text-light pt-md-2">🎥 Productoras</Nav.Link>
                <Nav.Link as={Link} to="/types" className="fw-semibold text-light pt-md-2 border-end pe-md-4">📺 Tipos</Nav.Link>
                <Nav.Link as={Link} to="/users" className="fw-semibold text-info ms-md-2 pt-md-2">👥 Gestión Operadores</Nav.Link>
              </Nav>
              <Button 
                variant={isDarkMode ? 'light' : 'dark'} 
                onClick={toggleTheme}
                className="rounded-pill px-4 fw-bold shadow-sm border"
              >
                {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Noche'}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid className="py-4 py-md-5 flex-grow-1 px-md-5">
          <Routes>
            <Route path="/" element={<div className="text-center py-5"><h1>Bienvenido a la Base de Datos Node</h1></div>} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/media" element={<MediaList />} />
            <Route path="/genres" element={<GenreList />} />
            <Route path="/directors" element={<DirectorList />} />
            <Route path="/producers" element={<ProducerList />} />
            <Route path="/types" element={<TypeList />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
