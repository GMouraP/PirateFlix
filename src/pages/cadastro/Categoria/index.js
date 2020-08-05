import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import InputField from './components/InputField';

import Button from './styles';
import './index.css';

const CadastrarCategoria = () => {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#CFB53B',
    codeSec: '',
    categoriaEnviada: false,
  };

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleChange(e) {
    setValue(e.target.getAttribute('name'), e.target.value);
  }

  function formValidation(state) {
    const invalids = Object.keys(state).filter((key) => state[key] === '');

    return (invalids.length === 0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.name === 'delCategoria') {
      setValues(valoresIniciais);
      return;
    }
    const ValidForm = formValidation(values);
    setValues({ ...values, categoriaEnviada: true });

    if (!ValidForm) {
      return;
    }

    setCategorias([...categorias, values]);
    setValues(valoresIniciais);
  }

  useEffect(() => {
    const URL = 'http://127.0.0.1:8081/categorias';
    fetch(URL).then(async (response) => {
      const res = await response.json();
      return res;
    }).then((jsonResponse) => {
      setCategorias([
        ...jsonResponse,
      ]);
    });
  }, [
    values.nome,
  ]);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          inputProps={{
            onChange: handleChange,
            type: 'text',
            name: 'nome',
            value: values.nome,
            required: true,
          }}
          labelProps={{
            label: 'Nome',
            requiredMessage: 'Nome é obrigatório',
            submitted: values.categoriaEnviada,
          }}
        />

        <InputField
          inputProps={{
            onChange: handleChange,
            as: 'textarea',
            type: 'text',
            name: 'descricao',
            value: values.descricao,
            required: true,
            style: { height: '20vh', borderTop: 'solid 24px rgba(0,0,0,0.0)', paddingTop: '0' },
          }}
          labelProps={{
            label: 'Descrição',
            requiredMessage: 'Descrição é obrigatória',
            submitted: values.categoriaEnviada,
          }}
        />

        <InputField
          inputProps={{
            onChange: handleChange,
            type: 'color',
            name: 'cor',
            value: values.cor,
          }}
          labelProps={{
            label: 'Cor da categoria',
          }}
        />

        <InputField
          inputProps={{
            onChange: handleChange,
            type: 'text',
            name: 'codeSec',
            value: values.codeSec,
            required: true,
          }}
          labelProps={{
            label: 'Código de Segurança',
            requiredMessage: 'O Código de Segurança é obrigatório',
            submitted: values.categoriaEnviada,
          }}
        />

        <Button name="addCategoria">Salvar</Button>
        <Button name="delCategoria" onClick={handleSubmit} className="cleanButton">Limpar</Button>
      </form>

      {categorias.length === 0 && (
      <div>
        Loading...
      </div>
      )}

      <ul>
        {
          categorias.map((categoria, i) => (
            <li key={i}>{categoria.nome}</li>
          ))
        }
      </ul>

    </PageDefault>
  );
};

export default CadastrarCategoria;
