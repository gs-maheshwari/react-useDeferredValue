import { Suspense, useState, useDeferredValue } from 'react';
import './App.css';
import { SlowData } from './SlowData';

function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query)	;

  return (
    <>
     <input type='text' value={query} onChange={(ev) => setQuery(ev.target.value) }></input>
     <Suspense fallback="loading....">
          <SlowData id={deferredQuery} />
      </Suspense>
    </>
  )
}

export default App
