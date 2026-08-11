import Dashboard from "./pages/Dashboard";
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    // Reemplazamos el fragmento <> por un div estructurado en columna
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* El contenido principal ocupa todo el espacio disponible empujando al footer */}
      <main className="flex-grow w-full">
        <Dashboard />
      </main>
      
      {/* El footer ahora se queda fijado abajo de manera limpia */}
      <Footer />
    </div>
  );
}

export default App;
