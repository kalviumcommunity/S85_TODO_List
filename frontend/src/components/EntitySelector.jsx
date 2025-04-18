import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EntitySelector = () => {
  const [entities, setEntities] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [entityDetails, setEntityDetails] = useState(null);
  const [error, setError] = useState('');

  // Fetch list of all entities on mount
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/entities');
        setEntities(res.data);
      } catch (err) {
        setError('Failed to fetch entity list');
      }
    };

    fetchEntities();
  }, []);

  // Fetch details whenever selectedId changes
  useEffect(() => {
    if (!selectedId) return;

    const fetchEntityDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/entities/${selectedId}`);
        setEntityDetails(res.data);
        setError('');
      } catch (err) {
        setEntityDetails(null);
        setError('Failed to fetch entity details');
      }
    };

    fetchEntityDetails();
  }, [selectedId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select an Entity</h2>

      <select onChange={(e) => setSelectedId(e.target.value)} value={selectedId}>
        <option value="">-- Choose an entity --</option>
        {entities.map((entity) => (
          <option key={entity.id} value={entity.id}>
            Entity {entity.id}
          </option>
        ))}
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {entityDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3>Entity Details</h3>
          <p><strong>ID:</strong> {entityDetails.id}</p>
          <p><strong>Title:</strong> {entityDetails.title}</p>
          <p><strong>Description:</strong> {entityDetails.description}</p>
          <p><strong>Created By:</strong> {entityDetails.created_by}</p>
          <p><strong>Created At:</strong> {new Date(entityDetails.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default EntitySelector;
