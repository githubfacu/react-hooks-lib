import './App.css';

import { DemoComponent } from './components/DemoComponent';
import { useClickout } from './hooks/useClickout';
import { useCounter } from './hooks/useCounter';

function App() {
  const { value, increment } = useCounter({ initialValue: 0 });
  const { isOpen, setIsOpen, elementRef } = useClickout<HTMLDivElement>(false); // 🔹 Especificamos el tipo

  return (
    <>
      <button type="button" onClick={() => increment()}>
        +1
      </button>
      <br />
      <span>value: {value}</span>
      <button type="button" onClick={() => setIsOpen(true)}>open Modal</button>

      {isOpen && (
        <div ref={elementRef} className="modal" style={{backgroundColor: 'white', color:'black'}}>
          <p>Este es un modal</p>
          <button onClick={() => setIsOpen(false)}>Cerrar</button>
        </div>
      )}
      <div style={{marginTop: 1000}}>
        <DemoComponent />
      </div>
    </>
  );
}

export default App;