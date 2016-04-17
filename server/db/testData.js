'use strict';

const db = require('./index.js');
const Sequelize = require('sequelize');

const user1 = {
 username: 'thrones1',
 pw: 'a',
 score: 0,
};

const user2 = {
  username: 'thrones2',
  pw: 'a',
  score: 0,
};

const user3 = {
  username: 'thrones3',
  pw: 'a',
  score: 0,
};

const user4 = {
  username: 'thrones4',
  pw: 'a',
  score: 0,
};

const user5 = {
 username: 'thrones5',
 pw: 'a',
 score: 0,
};

const user6 = {
 username: 'thrones6',
 pw: 'a',
 score: 0,
};

const allUsers = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
];

const ep1 = {
  code: 601,
  name: 'The Red Woman',
  lock: '25 April 2016 01:00 UTC',
  release: '26 April 2016 01:00 UTC',
};

const ep2 = {
  code: 602,
  name: 'TBA',
  lock: '1 May 2016 01:00 UTC',
  release: '2 May 2016 01:00 UTC',
};

const allEps = [
  ep1,
  ep2,
];

const prediction1 = {
  pointVal: 200,
  guess: 'A',
  outcome: 'A',
};

const prediction2 = {
  pointVal: 201,
  guess: 'A',
  outcome: 'C',
};

const prediction3 = {
  pointVal: 202,
  guess: 'B',
  outcome: 'C',
};

const allPredictions = [
  prediction1,
  prediction2,
  prediction3,
];

const char1 = {
  name: 'Jon Snow',
};

const char2 = {
  name: 'Arya Stark',
};

const char3 = {
  name: 'Daneryes Targaryen',
};

const allCharacters = [
  char1,
  char2,
  char3,
];

const status1 = {
  status_condition: 'Alive',
};

const status2 = {
  status_condition: 'Dead',
};

const status3 = {
  status_condition: 'Injured',
};

const allStatuses = [
  status1,
  status2,
  status3,
];

// create arrays of each db entry for dummy data
let createdUsers;
let createdEpisodes;
let createdPredictions;
let createdCharacters;
let createdStatuses;

function initializeData() {
  return db.sequelize.sync({ force: true })
    .then(() =>
      Sequelize.Promise.map(allUsers, user =>
        db.User.create(user))
    ).then((users) => {
      createdUsers = users;
      return Sequelize.Promise.map(allEps, ep => db.Episode.create(ep));
    }).then((episodes) => {
      createdEpisodes = episodes;
      return Sequelize.Promise.map(allPredictions, prediction => db.Prediction.create(prediction));
    }).then((predictions) => {
      createdPredictions = predictions;
      return Sequelize.Promise.map(allCharacters, char => db.Character.create(char));
    }).then((characters) => {
      const createdCharacters = characters;
      return Sequelize.Promise.map(allStatuses, status => db.Status.create(status));
    }).then((statuses) => {
      const createdStatuses = statuses;
      /*
        At this point all promises have resolved, and
        we have 4 arrays with all our ORM dummy data.
        Next, we need to create associations. This will
        be hard coded for time's sake.

        This can and should be cleaned up to use the
        procedure defined near the end of
        http://docs.sequelizejs.com/en/latest/docs/associations/
      */
      return Sequelize.Promise.all([
        createdUsers[0].addPrediction(createdPredictions[0]),
        createdUsers[1].addPrediction(createdPredictions[0]),
        createdUsers[2].addPrediction(createdPredictions[0]),
        createdUsers[3].addPrediction(createdPredictions[1]),
        createdUsers[4].addPrediction(createdPredictions[1]),
        createdUsers[5].addPrediction(createdPredictions[1]),
        createdCharacters[0].addEpisode(createdEpisodes[0]),
        createdCharacters[0].addEpisode(createdEpisodes[1]),
        createdCharacters[1].addEpisode(createdEpisodes[2]),
        createdCharacters[0].addStatus(createdStatuses[0]),
        createdCharacters[1].addStatus(createdStatuses[0]),
        createdCharacters[2].addStatus(createdStatuses[2]),
      ]);
    });
}

module.exports = initializeData;
