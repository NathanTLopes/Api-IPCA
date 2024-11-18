import express from 'express'
import { buscarTodosDados, buscarPorAno, buscarPorId, calcularReajuste } from './servicos/servico.js';

const app = express();

// Primeira rota: buscar todos os dados
// Segunda rota: buscar dados por ano
app.get('/historicoIPCA', (req, res) => {
  const { ano } = req.query;

  if (ano) {
    const resultado = buscarPorAno(ano);
    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ erro: 'Ano fora do intervalo permitido (2015-2024)' });
    }
    return res.json(resultado);
  }

  res.json(buscarTodosDados());
});

// Quarta rota: cálculo de reajuste
app.get('/historicoIPCA/calculo', (req, res) => {
  const valor= req.query.valor;
  const mesInicial= req.query.mesInicial;
  const anoInicial= req.query.anoInicial;
  const mesFinal= req.query.mesFinal;
  const anoFinal= req.query.anoFinal;
  const resultado = calcularReajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal);
  if (resultado === null) {
    return res.status(400).json({ erro: 'Parâmetros inválidos ou datas incorretas' });
  }
  
  res.json({ valorReajustado: resultado });
});

// Terceira rota: buscar dados por ID
app.get('/historicoIPCA/:id', (req, res) => {
  const { id } = req.params;
  const resultado = buscarPorId(id);
  if (!resultado) {
    return res.status(404).json({ erro: 'ID não encontrado' });
  }
  res.json(resultado);
});



const data = new Date()

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080", data);
});
