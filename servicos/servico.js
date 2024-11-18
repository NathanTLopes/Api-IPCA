import historicoInflacao from '../dados/dados.js';

// buscar todos os dados
export function buscarTodosDados() {
  return historicoInflacao;
}

// buscar por ano
export function buscarPorAno(ano) {
  const anoInt = parseInt(ano);
  if (anoInt < 2015 || anoInt > 2024) return null;
  return historicoInflacao.filter(dado => dado.ano === anoInt);
}

// buscar por ID
export function buscarPorId(id) {
  const idInt = parseInt(id);
  return historicoInflacao.find(dado => dado.id === idInt);
}

// calcular reajuste
export function calcularReajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal) {
  const valorFloat = parseFloat(valor);


  if (isNaN(valorFloat) || valorFloat <= 0) {
    return null;
  }

  const anoInicialInt = parseInt(anoInicial);
  const mesInicialInt = parseInt(mesInicial);
  const anoFinalInt = parseInt(anoFinal);
  const mesFinalInt = parseInt(mesFinal);

  
  if (
    anoInicialInt > anoFinalInt ||
    (anoInicialInt === anoFinalInt && mesInicialInt > mesFinalInt)
  ) {
    return null; 
  }

  
  const dadosPeriodo = historicoInflacao.filter(dado => {
    const ano = dado.ano;
    const mes = dado.mes;
    return (
      (ano > anoInicialInt || (ano === anoInicialInt && mes >= mesInicialInt)) &&
      (ano < anoFinalInt || (ano === anoFinalInt && mes <= mesFinalInt))
    );
  });

  
  let resultado = valorFloat;
  dadosPeriodo.forEach(dado => {
    resultado *= 1 + dado.ipca / 100;
  });

  return resultado.toFixed(2);
}
