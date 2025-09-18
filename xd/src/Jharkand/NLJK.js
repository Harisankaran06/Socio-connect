import React, { useMemo, useState, useRef, useEffect } from 'react';

const MUNICIPAL_CORPORATIONS = [
  'Ranchi Municipal Corporation',
  'Dhanbad Municipal Corporation',
  'Deoghar Municipal Corporation',
  'Adityapur Municipal Corporation',
  'Chas Municipal Corporation (Bokaro)',
  'Medininagar (Daltonganj) Municipal Corporation (Palamu)',
  'Hazaribagh Municipal Corporation',
  'Giridih Municipal Corporation',
  'Mango Municipal Corporation (East Singhbhum)'
];

const MUNICIPALITIES = [
  'Bishrampur Nagar Parishad',
  'Chatra Nagar Parishad',
  'Chakradharpur Nagar Parishad',
  'Chaibasa Nagar Parishad',
  'Dumka Nagar Parishad',
  'Garhwa Nagar Parishad',
  'Godda Nagar Parishad',
  'Gumla Nagar Parishad',
  'Jhumritilaiya (Jhumri Tilaiya) Nagar Parishad',
  'Jugsalai Nagar Parishad',
  'Kapali Nagar Parishad',
  'Lohardaga Nagar Parishad',
  'Madhupur Nagar Parishad',
  'Mihijam Nagar Parishad',
  'Pakur Nagar Parishad',
  'Phusro Nagar Parishad',
  'Ramgarh Nagar Parishad',
  'Sahibganj Nagar Parishad',
  'Simdega Nagar Parishad'
];

const styles = `
  *{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif}
  :root{--accent:#9b5cf1}
  html,body{height:100%}
  body{min-height:100vh;display:flex;justify-content:center;align-items:center;background:linear-gradient(135deg,#e8ebff,#f8f5ff);overflow:hidden;position:relative}
  .tn-map-bg {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    opacity: 0.10;
    pointer-events: none;
    width: 700px;
    max-width: 90vw;
    height: auto;
    filter: grayscale(1) contrast(1.1);
  }
  body::before, body::after{content:"";position:absolute;border-radius:50%;background:rgba(174,144,255,0.18);z-index:0}
  body::before{width:400px;height:400px;top:-100px;left:-100px}
  body::after{width:300px;height:300px;bottom:-80px;right:-80px}
  .card{position:relative;z-index:1;width:100%;max-width:1400px;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(155,92,241,0.18),0 2px 10px rgba(155,92,241,0.07);overflow:hidden;padding:60px 80px;border:1.5px solid rgba(155,92,241,0.10);margin:40px auto}
  h1{font-size:20px;margin-bottom:10px;color:#222}
  p{color:#444}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  @media(max-width:768px){.row{grid-template-columns:1fr}}
  input[list], input[type="text"], input[type="search"], select{width:100%;padding:12px 15px;border:1px solid #e0e0e0;border-radius:10px;font-size:14px;background:#f9f9f9;transition:border 0.25s, background 0.25s}
  input:focus, select:focus{outline:none;border-color:var(--accent);background:#fff;box-shadow:0 6px 18px rgba(155,92,241,0.06)}
  .choice{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1px solid #ececec;padding:10px 14px;border-radius:10px;cursor:pointer}
  .choice input{width:18px;height:18px}
  .choice-label{font-weight:600;color:#333}
  #localLabel{margin-bottom:8px;display:block}
`;

export default function NextLoginJharkand({ onSelect, onNext }) {
  const [mode, setMode] = useState('');
  const [value, setValue] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const currentList = useMemo(() => {
    if (mode === 'municipality') return MUNICIPALITIES;
    if (mode === 'corporation') return MUNICIPAL_CORPORATIONS;
    return [];
  }, [mode]);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return currentList.slice();
    return currentList.filter(n => n.toLowerCase().includes(q));
  }, [currentList, value]);

  function toggleMode(newMode) {
    if (mode === newMode) {
      setMode('');
      setValue('');
      if (onSelect) onSelect(null);
    } else {
      setMode(newMode);
      setValue('');
    }
  }

  function handleInput(e) {
    setValue(e.target.value);
    if (onSelect) onSelect({ mode, value: e.target.value });
  }

  function handleNext() {
    const payload = { mode, value };
    if (!value) return;
    if (typeof onNext === 'function') {
      onNext(payload);
      return;
      }
      if (onSelect) onSelect(payload);
    }

    return (
      <div>
        <style>{styles}</style>
        {/* Tamil Nadu map background */}
        <img className="tn-map-bg" src="/images/jharkand-map.png" alt="Jharkand Map" />
        <main className="card" role="main" aria-labelledby="pageTitle">
          <div style={{display:'flex',justifyContent:'center',marginBottom:18}}>
            <img src="/images/logo.png" alt="Socio Connect Logo" style={{height:60,objectFit:'contain'}} />
          </div>
          <h1 id="pageTitle">Choose Local Body (Jharkand)</h1>
          <p style={{color:'#444',marginTop:6,marginBottom:18,maxWidth:680}}>Select either <strong>Municipality</strong> or <strong>Municipal Corporation</strong>. Only one may be active at a time.</p>

          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
            <label className="choice" onClick={() => toggleMode('municipality')}>
              <input type="checkbox" readOnly checked={mode==='municipality'} />
              <span className="choice-label">Municipality</span>
            </label>

            <label className="choice" onClick={() => toggleMode('corporation')}>
              <input type="checkbox" readOnly checked={mode==='corporation'} />
              <span className="choice-label">Municipal Corporation</span>
            </label>
          </div>

          <div id="listArea" style={{marginTop:6}}>
            <label htmlFor="localInput" id="localLabel" style={{display:'block',marginBottom:8,color:'#333',fontWeight:600}}>Select local body</label>
            <input
              id="localInput"
              placeholder={filtered.length === 0 ? 'No results' : 'Type to search...'}
              aria-label="Select local body"
              value={value}
              onChange={handleInput}
              style={{width:'100%',padding:10,borderRadius:10,border:'1px solid #e6e6e6',marginBottom:8,display: mode ? 'block' : 'none'}}
              disabled={!mode}
            />

            {/* Visible list shown below the input so all items are displayed on the page */}
            {mode ? (
              <div>
                <div id="localList" style={{maxHeight:240,overflowY:'auto',border:'1px solid #f0f0f0',borderRadius:10,padding:6,background:'#fff'}}>
                  {filtered.length === 0 ? (
                    <div style={{padding:10,color:'#888'}}>No results</div>
                  ) : (
                    filtered.map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => {
                          const payload = { mode, value: n };
                          setValue(n);
                          if (onSelect) onSelect(payload);
                          if (mode === 'corporation' && String(n).trim().toLowerCase() === 'ranchi municipal corporation') {
                            if (typeof onNext === 'function') {
                              if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current);
                              }
                              timeoutRef.current = setTimeout(() => {
                                onNext('/intjk');
                              }, 2000);
                            }
                          }
                        }}
                        style={{display:'block',width:'100%',textAlign:'left',padding:'10px 12px',border:'none',background:'transparent',cursor:'pointer',borderBottom:'1px solid #f6f6f6'}}
                      >
                        {n}
                      </button>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    );
  }
