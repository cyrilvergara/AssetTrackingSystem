// app/hello/page.jsx
'use client';

import { useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("hello there from the server");
  async function fetchData() {
    setLoading(true);
    const res = await fetch('/api/hello');
    const result = await res.json();
    setData(result);
    setLoading(false);
  }
  

  return (
    <div>
      <h1>Server Action Example</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
