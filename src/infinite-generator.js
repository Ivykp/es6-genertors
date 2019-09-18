const { range } = require('rambda');

const isEven = n => n % 2 === 0;

const isPrime = n => {
  const iter = i => i >= n ? true : (n % i === 0 ? false : iter(isEven(i) ? i + 1 : i + 2));
  return n <= 1 ? false : n === 2 ? true : iter(2);
}

const nextPrimeFrom = n => {
  const candidate = isEven(n) ? n + 1 : n + 2; // To avoid even numbers check
  return isPrime(candidate) ? candidate : nextPrimeFrom(candidate);
}

function *primeNumberGenerator() {
  let lastPrime = 2;
  while (true) {
    yield lastPrime;
    lastPrime = nextPrimeFrom(lastPrime);
  }
}

const gen = primeNumberGenerator();
// range(0, 100).forEach(_ => console.log(gen.next()));

function *numbers(n) {
  let i = 0;
  while (i < n) {
    yield i;
    i = i + 1;
  }
}

const generator = numbers(5);

for (const e of generator) {
  console.log(e);
}
