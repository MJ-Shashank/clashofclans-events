/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
const Client = require('clashofclans-events');

(async () => {
  // Configuration of Client.
  const Coc = new Client({
    ratelimit: 10,
    tokens: ['<token>'], // replace this with your real token
    sync: 120,
  }, {
    playerJoin: true,
    playerLeft: true,
    donationEvent: true,
    clanEvent: true,
    playerPromote: true,
    playerDemote: true,
  });

  // Initialize.
  await Coc.init(['LQU2YVYR', 'Y0LCRJJQ']);

  Coc.on('donationEvent', (message) => {
    console.log(message);
  });

  Coc.on('playerJoin', (message) => {
    console.log(message);
  });

  Coc.on('playerLeft', (message) => {
    console.log(message);
  });

  Coc.on('clanEvent', (message) => {
    console.log(message);
  });

  Coc.on('playerPromote', (message) => {
    console.log(message);
  });

  Coc.on('playerDemote', (message) => {
    console.log(message);
  });

  Coc.on('error', (message) => {
    console.log(message);
  });

  // Add a new clan.
  await Coc.add('V88CRPU');
})();
