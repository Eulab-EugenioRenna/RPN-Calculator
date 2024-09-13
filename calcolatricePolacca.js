function eseguiOperazione(numeroA, numeroB, operazione) {
  let res = 0;
  switch (operazione) {
    case '+':
      res = numeroA + numeroB;
      break;

    case '*':
      res = numeroA * numeroB;
      break;

    case '-':
      res = numeroA - numeroB;
      break;

    case '/':
      if (numeroB == 0) {
        console.error('Non divisibile per 0');
        return Infinity;
      }
      res = numeroA / numeroB;
      break;

    default:
      console.log('Operazione non valida');
      break;
  }

  return res;
}

function calcola(espressione) {
  const history = {};
  const stack = [];
  const res = espressione.split(' ');
  let numeroA = null;
  let numeroB = null;
  let operazione = '';
  history['operazioni'] = [];
  console.log(espressione, '  ---->  ');

  for (let elemento of res) {
    if (!isNaN(elemento)) {
      stack.push(parseFloat(elemento));
    } else if (['+', '-', '*', '/'].includes(elemento)) {
      if (stack.length < 2) {
        console.error('Numero di elementi iniziali non sufficiente');
        return false;
      } else {
        numeroB = stack.pop();
        numeroA = stack.pop();
        operazione = elemento;

        if (numeroA !== null && numeroB !== null && operazione !== '') {
          if (numeroA !== undefined && numeroB !== undefined) {
            console.log(
              `Operazione eseguita ${numeroA} ${operazione} ${numeroB}`
            );
            let tmp = `Operazione eseguita: ${numeroA} ${operazione} ${numeroB} = ${eseguiOperazione(
              numeroA,
              numeroB,
              operazione
            )}`;
            history['operazioni'].push(tmp);

            stack.push(eseguiOperazione(numeroA, numeroB, operazione));
          }
        }
      }
    } else {
      console.log('Elemento corrente non valido');
      return false;
    }
  }
  console.log(stack);
  console.log(espressioneNormale(espressione));
  console.log('_________');
  history['espressione'] = espressioneNormale(espressione);
  history['stack'] = stack;
  return history;
}

function espressioneNormale(espressionePostfissa) {
  const stack = [];
  for (let elemento of espressionePostfissa.split(' ')) {
    if (!isNaN(elemento)) {
      stack.push(parseFloat(elemento));
    } else if (['+', '-', '*', '/'].includes(elemento)) {
      // Inverti l'ordine degli operandi e dell'operazione
      const numeroB = stack.pop();
      let numeroA = stack.pop();
      const operazione = elemento;
      const espressione = ['*', '/'].includes(elemento)
        ? `((${numeroA}) ${operazione} (${numeroB}))`
        : `${numeroA} ${operazione} ${numeroB}`;
      console.log(`Operazione eseguita ${numeroA} ${operazione} ${numeroB}`);

      stack.push(espressione);
    } else {
      console.log('Elemento corrente non valido');
      return false;
    }
  }
  return stack;
}
