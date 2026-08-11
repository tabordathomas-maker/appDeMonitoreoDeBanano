import logoUniversidad from '../assets/Escudo-UdeA.svg';

function Footer() {
  return (
    <footer 
      style={{
        display: 'block',
        clear: 'both',
        width: '100vw',
        position: 'relative',
        zIndex: 9999,
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '32px 16px',
        borderTop: '1px solid #1e293b',
        marginTop: '40px'
      }}
    >
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        textAlign: 'center'
      }}>
        
        {/* Bloque de Nombres */}
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          Nevis Pérez, Jean Salazar, Thomas Taborda, Julian Ramirez, Estefania Zapata.
        </p>
        
        {/* Bloque Institucional */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px' 
        }}>
          {/* 2. Renderizado del SVG local */}
          <img 
            src={logoUniversidad} 
            alt="Escudo Universidad de Antioquia" 
            style={{ 
              height: '85px', /* Los archivos SVG se adaptan muy bien a este tamaño */
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <a style={{ textDecoration: 'none', color: 'inherit' }}>Instituto de Física</a>
            <b style={{ fontWeight: 'bold', color: '#fff' }}>Universidad de Antioquia</b>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;