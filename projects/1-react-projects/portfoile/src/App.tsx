import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from '@/components/layout';
import { HomePage, ResumePage } from '@/pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
