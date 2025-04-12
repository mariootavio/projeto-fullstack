import { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch('http://localhost:3001/api/hello');
      const data = await res.json();
      setMsg(data.message);
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Frontend OK 🎉</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;