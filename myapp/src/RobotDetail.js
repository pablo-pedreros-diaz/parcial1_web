import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RobotDetail = ({ robotId, onBack }) => {
  const [robot, setRobot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRobotDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/robots/${robotId}`);
        if (response.ok) {
          const data = await response.json();
          setRobot(data);
        } else {
          setError('No se pudo cargar la información del robot');
        }
      } catch (err) {
        console.error('Error fetching robot details:', err);
        setError('Error de conexión al cargar detalles');
      } finally {
        setLoading(false);
      }
    };

    fetchRobotDetail();
  }, [robotId]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!robot) return <div className="alert alert-warning">No se encontró información del robot</div>;

  return (
    <div className="card-body">

      <div className="row mt-4">
        <div className="col-md-6">
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
              <tr>
                <td>{robot.id}</td>
                <td>{robot.nombre}</td>
                <td>{robot.modelo}</td>
                <td>{robot.empresaFabricante}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-3">
                <h3>{robot.nombre}</h3>
                <img 
                  src={robot.imagen} 
                  alt={robot.nombre} 
                  className="img-fluid" 
                  style={{ maxHeight: '200px', borderRadius: '8px' }}
                />
              </div>
              <div className="mt-3">
                <p><strong>➝ Año de Fabricación:</strong> {robot.añoFabricacion}</p>
                <p><strong>➝ Capacidad de Procesamiento:</strong> {robot.capacidadProcesamiento}</p>
                <p><strong>➝ Humor:</strong> {robot.humor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotDetail;