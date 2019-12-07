let dummyTasks = [
  { id: '0', name: 'Overwatch' },
  { id: '1', name: 'Smash' },
  { id: '2', name: 'Workout' },
  { id: '3', name: 'Guitar' },
  { id: '4', name: 'Programming' },
  { id: '5', name: 'Tennis' },
  { id: '6', name: 'Basketball' },
  { id: '7', name: 'Cleaning' },
  { id: '8', name: 'Breathing' },
  { id: '9', name: 'Reading' },
  { id: '10', name: 'Magic' },
  { id: '11', name: 'Coffee' },
  { id: '12', name: 'Light Jog' },
  { id: '13', name: 'Anime' },
];

let dummyPriorities = [
  {
    id: '0',
    name: 'Short Term Pleasure',
    ranking: ['0', '1', '2','3','4','5','6','7','8','9','10','11','12','13']
  },
  {
    id: '1',
    name: 'Productivity',
    ranking: ['2','1','0','3','6','12','5','4','10','11','9','7','8','13']
  }
];

module.exports = { dummyTasks, dummyPriorities };