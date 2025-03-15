import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormattedMessage, useIntl} from 'react-intl';

const RobotDetail = ({ robotId }) => {
  const [robot, setRobot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRobotDetail = async () => {
      setLoading(true);
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
    <div className="card-body p-2">
      <div className="row">
        <div className="col-md-12">
          <div className="card" style={{ backgroundColor: '#D9D9D980' }}>
            <div className="card-body">
              <div className="text-center mb-2">
                <h3 className='mb-1'>{robot.nombre}</h3>
                <img 
                  src={robot.imagen} 
                  alt={robot.nombre} 
                  className="img-fluid" 
                  style={{ maxHeight: '200px', borderRadius: '8px' }}
                />
              </div>
              <div className='mt-2'>
                <p className='mb-1'><strong>➝ <FormattedMessage id='Year of Manufacture'/>:</strong> {robot.añoFabricacion}</p>
                <p className='mb-1'><strong>➝ <FormattedMessage id='Processing Capacity'/>:</strong> {robot.capacidadProcesamiento}</p>
                <p className='mb-0'><strong>➝ <FormattedMessage id='Humor'/>:</strong> {robot.humor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotDetail;