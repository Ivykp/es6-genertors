const { None, Some } = require('monet');

const userList = [
  { id: 1, name: 'Jorge', secondName: None() },
  { id: 2, name: 'Frenkie', secondName: Some('Donny') },
  { id: 3, name: 'Steven', secondName: Some('George') },
];

const fetchUsers = () => new Promise(res => setTimeout(() => res(userList)), 2000);

const isValidName = name =>
  new Promise(res => setTimeout(() => res(Math.random() * 10 > 5)), 1000);

module.exports = {
  userList,
  fetchUsers,
  isValidName
};
