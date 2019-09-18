const { Maybe, None, Some } = require('monet');
const { userList } = require('./util/users');

const secondNameRanking = [
  { secondName: 'Donny', value: 10 },
  { secondName: 'George', value: 5 }
]

const getSecondNameRanking = secondName => Maybe
  .fromNull(secondNameRanking.find(ranking => ranking.secondName === secondName))

const getUserById = id => Maybe.fromNull(userList.find(user => user.id === id))

function *getUserNameRanking(id) {
  const user = yield getUserById(id);
  const secondName = yield user.secondName;
  const ranking = yield getSecondNameRanking(secondName);
  return `${user.name} ${secondName} with Ranking: ${ranking.value}`;
}

const runnerForMonads = gen => {
  const generator = gen();

  const iter = (currentValue) => {
    const next = generator.next(currentValue)
    console.log(
      'Next iteration: ',
      JSON.stringify(next, null, 2),
      '\n=========================================='
    );
    if (next.done) {
      return Maybe.fromNull(next.value)
    } else {
      return next.value.flatMap(iter)
    }
  }
  return iter();
}

console.log('Res: ', runnerForMonads(getUserNameRanking.bind(undefined, 1)));
