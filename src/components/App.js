import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { api } from "./services/api";

import './index.css';

function App() {
  
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  if (cep.complemento === "") {
    cep.complemento = 'Desconhecido'
  }
  
  async function Handle_Search() {
    if (input === "") {
      alert("Preencha algum CEP!")
      return;
    }
    
    try {
      const response = await api.get(`${input}/json/`);
      setCep(response.data)
      setInput("")
      
    } catch {
      alert('erro ao buscar. Por favor digite novamente');
      setInput("")
    }
    
  }
  
  return (
    <>
      <div className="container">
        <h1 className="title">Buscador CEP</h1>
          <div className="containerInput">
            <input
              type="text"
              placeholder="Digite seu cep..."
              value={input}
              onChange={(e) => setInput(e.target.value) }
            />
            <button className="buttonSearch" onClick={Handle_Search}>
              <FiSearch size={25} color="#FFF" />
            </button>
          </div>
          {Object.keys(cep).length > 1 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
            
          </main>
          )}
      </div>
    </>
  );
};

export default App;
