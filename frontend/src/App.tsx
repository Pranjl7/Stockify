import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import LLMChat from './pages/LLMChat';
import AppLayout from './pages/AppLayout';

function App() {
  return (
    <main className='relative min-h-screen font-inter bg-slate-50 text-slate-900'>
      <Routes>
        <Route path="/" element={
          <div className="max-w-6xl mx-auto border-x border-black/10 bg-white min-h-screen relative">
            <Landing />
          </div>
        } />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<News />} />
          <Route path="stockify-ai" element={<LLMChat />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
