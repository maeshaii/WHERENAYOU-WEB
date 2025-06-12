import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Needed for back navigation
import Sidebar from '../global/sidebar.tsx';

interface Graduate {
  year: number;
  status: string;
}

const graduates: Graduate[] = [
  { year: 2024, status: 'Imported' },
  { year: 2024, status: 'Imported' },
  { year: 2024, status: 'Imported' },
  { year: 2024, status: 'Imported' }
];

const App: React.FC = () => {
  const navigate = useNavigate(); // ✅ Hook to navigate

  const handleGenerateClick = () => {
    alert('Generating statistics...');
  };
  const handleCardClick = (year: number) => {
    navigate(`/alumni/${year}`);
  };
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.leftSection}>
          <button
        onClick={() => navigate(-1)} // Go back to previous page
        style={{
          background: 'none',
          border: 'none',
          color: '#1D4E89',
          fontSize: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        &lt; Back
      
            </button>
            <div style={styles.viewStatistics}>
              <span role="img" aria-label="chart">📊</span> View Statistics
            </div>
          </div>
          <button style={styles.generateBtn} onClick={handleGenerateClick}>
            Generate Statistics
          </button>
        </div>

        {/* Cards */}
        <div style={styles.cards}>
          {graduates.map((grad, index) => (
          <div
          key={index}
          style={styles.card}
          onClick={() => handleCardClick(grad.year)}
        >
          <div style={styles.cardImage} />
          <div style={styles.cardText}>
            <p><strong>YEAR GRADUATED:</strong> {grad.year}</p>
            <p>{grad.status}</p>
          </div>
        </div>
        
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    flex: 1,
    overflowY: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column', // ⬅️ Make children stack vertically
    alignItems: 'flex-start', // ⬅️ Align to the left
    gap: '10px' // ⬅️ Optional spacing between items
  },
  
  viewStatistics: {
    fontSize: '20px',
    fontWeight: 500,
    fontFamily: 'Arial, sans-serif'
  },
  backBtn: {
    backgroundColor: '#e5e7eb',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 500
  },
  generateBtn: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 500
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid
    gap: '20px',
    width: '100%'
  },  
  card: {
    backgroundColor: '#17406a',
    color: 'white',
    borderRadius: '15px',
    padding: '15px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    width: '90%', // Let the grid control width
  },  
  cardImage: {
    backgroundColor: 'white',
    height: '100px',
    width: '100%',
    borderRadius: '5px',
    marginBottom: '1px'
  },
  cardText: {
    textAlign: 'left',
    width: '100%'
  }
  
};

export default App;
