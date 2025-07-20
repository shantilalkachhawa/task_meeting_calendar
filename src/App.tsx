import  { lazy, Suspense } from 'react';
import './App.css';
const Header = lazy(() => import('./shared/header'));
const CalenderComponent = lazy(() => import('./shared/calendar'));

function App() {
  return (
    <>
    <div className="App">
        <Header />
      <div className='p-1'>
        <Suspense fallback={<div>Loading Header...</div>}>
          <CalenderComponent/>
        </Suspense>
      </div>
    </div>
    </>
  );
}

export default App;
