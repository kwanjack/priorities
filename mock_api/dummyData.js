let dummyTasks = [
  { id: '0', name: 'Overwatch' },
  { id: '1', name: 'Smash' },
  { id: '2', name: 'Workout' },
  { id: '3', name: 'Guitar' },
  { id: '4', name: 'Programming' },
  { id: '5', name: 'Tennis' },
  { id: '6', name: 'Basketball' },
  { id: '7', name: 'Cleaning' },
  { id: '8', name: 'Wim Hof' },
  { id: '9', name: 'Reading' },
  { id: '10', name: 'Magic' },
  { id: '11', name: 'Coffee' },
  { id: '12', name: 'Light Jog' },
  { id: '13', name: 'Anime' },
  { id: '14', name: 'Youtube' },
];

let dummyPriorities = [
  {
    id: '0',
    name: 'Productivity',
    ranking: ["12", "4", "2", "8", "7", "3", "10", "11", "9", "5", "6", "13", "0", "1", "14"]
  },
  {
    id: '1',
    name: 'Lazy',
    ranking: ["13", "14", "0", "1", "12", "11", "3", "2", "8", "6", "5", "4", "10", "9", "7"]
  },
  {
    id: '2',
    name: 'Long Term',
    ranking: ["4", "3", "10", "2", "1", "8", "0", "6", "5", "11", "12", "9", "7", "13", "14"]
  },
  {
    id: '3',
    name: 'Health',
    ranking: ["8", "2", "6", "12", "5", "7", "3", "4", "9", "10", "11", "13", "14", "1", "0"]
  }
];

module.exports = { dummyTasks, dummyPriorities };