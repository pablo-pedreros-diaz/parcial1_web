import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RobotDetail from './RobotDetail';
import {FormattedMessage, useIntl} from 'react-intl';

const RobotApp = () => {
  const  intl = useIntl();
  const locale = intl.locale;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
        setView('list');
        // Fetch robots data
        fetchRobots();
      } else if (response.status === 401) {
        setError(<FormattedMessage id="wrong credentials"/>);
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
      <h1 className="text-center fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>
        <FormattedMessage id="Adopt a Robot with Robot Lovers!"/>
      </h1>
      
      <hr className="my-3" />
      
      <div className="my-4">
        <div className="bg-danger p-3 rounded" style={{ backgroundColor: 'white' }}>
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
      
      <div className="mt-4">
        <h2 className="text-center fw-bold mb-4">
          <FormattedMessage id="Log in"/>
        </h2>
  
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="username" style={{ color: "black" }}>
              <FormattedMessage id="Username"/>
            </label>
            <input
              className="form-control bg-light"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ backgroundColor: '#D9D9D9', width: '270px' }}
            />
          </div>
    
          <div className="mb-4">
            <label className="form-label fw-bold" htmlFor="password">
              <FormattedMessage id="Password"/>
            </label>
            <input
              className="form-control bg-light"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ backgroundColor: '#D9D9D9', width: '270px' }}
            />
          </div>
    
          <div className="d-flex justify-content-center gap-4 w-100">
            <button
              className="btn btn-primary fw-bold"
              type="submit"
              style={{ backgroundColor: '#0d47a1', width: '120px' }}
            >
             <FormattedMessage id="Log in button"/>

            </button>
      
            <button
              className="btn btn-danger fw-bold"
              type="button"
              style={{ backgroundColor: '#E75D5D', color: 'black', width: '120px' }}
            >
              <FormattedMessage id="Cancel"/>

            </button>
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
      <div className="row">
        <div className="col-md-6">
          <div className="mt-4">
            <table className="table">
              <thead className="table-dark" backgroundColor= "#333A40">
                <tr>
                  <th>ID</th>
                  <th><FormattedMessage id='Name'/></th>
                  <th><FormattedMessage id='Model'/></th>
                  <th><FormattedMessage id='Manufacturing Company'/></th>
                </tr>
              </thead>
              <tbody>
                {robots.map(robot => (
                  <tr 
                    key={robot.id} 
                    onClick={() => handleRobotSelect(robot.id)}
                  >
                    <td style={{fontWeight: 'bold'}}>{robot.id}</td>
                    <td>{robot.nombre}</td>
                    <td>{robot.modelo}</td>
                    <td>{robot.empresaFabricante}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="col-md-4">
          {selectedRobotId && view === 'detail' && 
            <RobotDetail robotId={selectedRobotId} />
          }
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(view) {
      case 'login':
        return renderLoginForm();
      case 'list':
      case 'detail':
        return renderRobotList();
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
                <h1 className="text-center fw-bold my-3" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>
                  <FormattedMessage id='Adopt a Robot with Robot Lovers!'/>
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
            
            <div className=" text-center small" style={{ paddingBottom: '20px' }}>
              Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotApp;