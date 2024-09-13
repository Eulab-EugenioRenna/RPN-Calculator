function numberToBits(num, bitCount) {
  const bits = [];
  for (let i = 0; i < bitCount; i++) {
    // Estrai il bit meno significativo e aggiungilo come true/false
    bits.push((num & 1) === 1); // true se il bit è 1, false se è 0
    num >>= 1; // Shift a destra per passare al prossimo bit
  }
  return bits.reverse(); // Inverti l'array per avere i bit nell'ordine corretto
}

function bitsToNumber(bits) {
  let num = 0;
  for (let i = 0; i < bits.length; i++) {
    num = (num << 1) | (bits[i] ? 1 : 0); // Shift a sinistra e aggiungi il bit
  }
  return num;
}


function sum2bit(a1, a0, b1, b0) {
  // Somma dei bit meno significativi (a0, b0) e calcolo del riporto
  const s0 = (a0 && !b0) || (!a0 && b0); // XOR tra a0 e b0
  const carry0 = a0 && b0; // Riporto generato dalla somma di a0 e b0

  // Somma dei bit più significativi (a1, b1) con il riporto precedente
  const s1 = a1 ^ b1 ^ carry0;
  const carry1 = (a1 && b1) || (a1 && carry0) || (b1 && carry0); // Nuovo riporto

  // Restituiamo il risultato con un eventuale riporto extra
  return [carry1, s1, s0];
}

function sum3bit(a2, a1, a0, b2, b1, b0) {
  const [carry1, s1, s0] = sum2bit(a1, a0, b1, b0);
  // Somma dei bit più significativi (a2, b2) con il riporto precedente
  const s2 = a2 ^ b2 ^ carry1;
  const carry2 = (a2 && b2) || (a2 && carry1) || b2 & carry1; // Nuovo riporto

  // Restituiamo il risultato con un eventuale riporto extra
  return [carry2, s2, s1, s0];
}

for (let x = 0; x < 7; x++) {
  for (let y = 0; y < 7; y++) {
    const a = x;
    const b = y;
    console.log(`${a} + ${b} = `);
    if (a <= 3 && b <= 3) {
      const params2bit = [...numberToBits(a, 2), ...numberToBits(b, 2)];
      console.log(params2bit)
      console.log(bitsToNumber(sum2bit(...params2bit)));
    } else {
      const params3bit = [...numberToBits(a, 3), ...numberToBits(b, 3)];
      console.log(params3bit)
      console.log(bitsToNumber(sum3bit(...params3bit)));
      console.log('----');
    }
  }
}
