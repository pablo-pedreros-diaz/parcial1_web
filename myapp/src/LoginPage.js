import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RobotDetail from './RobotDetail';

const RobotApp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [robots, setRobots] = useState([]);
  const [selectedRobotId, setSelectedRobotId] = useState(null);
  const [view, setView] = useState('login');

  const fetchRobots = async () => {
    try {
      const response = await fetch('http://localhost:3001/robots');
      if (response.ok) {
        const data = await response.json();
        setRobots(data);
      } else {
        console.error('Failed to fetch robots');
      }
    } catch (err) {
      console.error('Error fetching robots:', err);
    }
  };
  
  const handleRobotSelect = (robotId) => {
    setSelectedRobotId(robotId);
    setView('detail');
  };
  
  const handleBackToList = () => {
    setSelectedRobotId(null);
    setView('list');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password: password
        }),
      });

      if (response.status === 200) {
        // Login successful
        setIsLoggedIn(true);
        setView('list');
        // Fetch robots data
        fetchRobots();
      } else if (response.status === 401) {
        setError('Error de autenticación. Revise sus credenciales');
      } else {
        setError('Error en el servidor');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error');
    }
  };

  const renderLoginForm = () => (
    <div className="card-body">
      <h1 className="text-center fw-bold mb-3">
        Adopta un Robot con Robot Lovers!
      </h1>
      
      <hr className="my-3" />
      
      <div className="my-4">
        <div className="bg-danger p-3 rounded" style={{ backgroundColor: '#f77f9e' }}>
          <div className="text-center">
            <img 
              src="/api/placeholder/800/200" 
              alt="Robot characters lineup" 
              className="img-fluid"
              style={{ maxHeight: '180px' }}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h2 className="text-center fw-bold mb-4">
          Inicio de sesión
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              className="form-control bg-light"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ backgroundColor: '#e2e2e2' }}
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              className="form-control bg-light"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ backgroundColor: '#e2e2e2' }}
            />
          </div>
          
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary w-100"
                type="submit"
                style={{ backgroundColor: '#0d47a1' }}
              >
                Ingresar
              </button>
            </div>
            
            <div className="col">
              <button
                className="btn btn-danger w-100"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-3 text-center text-danger">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderRobotList = () => (
    <div className="card-body">
      <div className="mt-4">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>Empresa Fabricante</th>
            </tr>
          </thead>
          <tbody>
            {robots.map(robot => (
              <tr 
                key={robot.id} 
                onClick={() => handleRobotSelect(robot.id)}
              >
                <td>{robot.id}</td>
                <td>{robot.nombre}</td>
                <td>{robot.modelo}</td>
                <td>{robot.empresaFabricante}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(view) {
      case 'login':
        return renderLoginForm();
      case 'list':
        return renderRobotList();
      case 'detail':
        return <RobotDetail robotId={selectedRobotId} />;
      default:
        return renderLoginForm();
    }
  };

  return (
    <div className="container-fluid bg-light py-3">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            {view !== 'login' && (
              <div className="card-header p-0">
                <h1 className="text-center fw-bold my-3">
                  Adopta un Robot con Robot Lovers!
                </h1>
                <hr className="my-0" />
                <div className="my-0">
                  <div className="bg-danger p-3" style={{ backgroundColor: '#f77f9e' }}>
                    <div className="text-center">
                      <img 
                        src="./robots.png" 
                        alt="Robot characters lineup" 
                        className="img-fluid"
                        style={{ maxHeight: '180px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {renderContent()}
            
            <div className="card-footer text-center small">
              Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotApp;