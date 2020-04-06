import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Clima from './components/Clima';

function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consulta, setConsulta] = useState(false);
  const [resultado, setResultado] = useState({});

  const { ciudad, pais } = busqueda;

  const apikey= '48b0db1c2cfc73f8bd949075c5a2d5a3';

  useEffect(() => {
    const consultarAPI = async () => {
      if (ciudad !== '') {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apikey}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado)
      }
    };
    consultarAPI();
  }, [consulta]);

  return (
    <Fragment>
      <Header
        titulo="Clima App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                consulta={consulta}
                setConsulta={setConsulta}
              />
            </div>
            <div className="col m6 s12">
              <Clima resultado={resultado} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
