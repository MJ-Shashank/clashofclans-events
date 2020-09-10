<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://clashforever.online/clashforever.png" alt="Project logo"></a>
</p>

<h3 align="center">clash-of-clans</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/MJ-Shashank/clashofclans-events)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/MJ-Shashank/clash-of-clan/blob/master/LICENSE)

</div>

---

<p align="center"> A Simple JavaScript Clash Of Clan Event based library that tracks Donation, Player Join and Left, Clan Activities.
    <br> 
</p>

## Installation

You can install `clashofclans-events` using npm:

```
npm install clashofclans-events
```

## Step 1: Configuration

There are 2 arguments options and events, `options : { ratelimit, tokens, sync }` and `events : { donationEvent, clanEvent, playerJoin, playerLeft, playerPromote, playerDemote }`. 
Note: Set `true` only if events are required.

```
const Client = require('clashofclans-events');

const Coc = new Client({
    ratelimit: 10,  // default is 10 events/sec
    tokens: ['<token>'],
    sync: 120      // default sync of clans in seconds
}, {
    playerJoin: true,   // default all events are false
    playerLeft: true,
    donationEvent: true,
    clanEvent: true,
    playerPromote: true,
    playerDemote: true
});
```

## Step 2: Initialization 

Initialize the tracker by calling `init()` function and pass `{ Array.<string> }` tags. 

```
Coc.init(['<tag1>', '<tag2>', ...]);
```


You can Add/Delete clans from/to tracker.

```
// Add a clan
Coc.add('<tag>');

// Delete a clan
Coc.delete('<tag>');
```

## Step 3: Listeners/Events

### List of Events

- [donationEvent](#donationEvent)
- [clanEvent](#clanEvent)
- [playerJoin](#playerJoin)
- [playerLeft](#playerLeft)
- [playerPromote](#playerPromote)
- [playerDemote](#playerDemote)
- [error](#error)

####  'donationEvent' <a name = "donationEvent"></a>

This event listens to troops recieved and donated from players in clan.

```
Coc.on('donationEvent', (message) => {
    console.log(message); 
});
```

Output:

```
{ name: 'Indian Hounds',
  tag: '#V88CRPU',
  badgeUrls:
   { small:
      'https://api-assets.clashofclans.com/badges/70/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png',
     large:
      'https://api-assets.clashofclans.com/badges/512/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png',
     medium:
      'https://api-assets.clashofclans.com/badges/200/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png' },
  members: 44,
  type: 'open',
  donated:
   [ { name: '♠️Shey_xoOR♠️',
       tag: '#GCG0LV90',
       troops: 20,
       league: [Object] },
     { name: 'merdo',
       tag: '#280RQ28UR',
       troops: 20,
       league: [Object] } ],
  received:
   [ { name: 'el solitario',
       tag: '#LCCPP8J9Y',
       troops: 50,
       league: [Object] },
     { name: 'rudra', tag: '#LLQQPJQJC', troops: 5, league: [Object] } ],
  mismatch: [ { troops: 5 } ] }
```

####  'clanEvent' <a name = "clanEvent"></a>

This event listens to Clan activities ie change of description, location, required trophies, clan level promote, clan entry, war frequecy, war-log visbility, war league, badge change.

`eventType` : `descriptionChange, locationChange, requiredTrophiesChange, clanLevelChange, typeChange, warFrequencyChange, isWarLogPublicChange, warLeagueChange, badgeUrlsChange`

```
Coc.on('clanEvent', (message) => {
    console.log(message); 
});
```

Output:

```
{ name: 'Indian Hounds',
  tag: '#V88CRPU',
  badgeUrls:
   { small:
      'https://api-assets.clashofclans.com/badges/70/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png',
     large:
      'https://api-assets.clashofclans.com/badges/512/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png',
     medium:
      'https://api-assets.clashofclans.com/badges/200/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png' },
  members: 44,
  type: 'open',
  eventType: 'requiredTrophiesChange',
  previous: 1000,
  current: 2000
```

####  'playerJoin' <a name = "playerJoin"></a> and 'playerLeft' <a name = "playerLeft"></a>

This event listens to player join/leave of clan.

```
Coc.on('playerJoin', (message) => {
    console.log(message); 
});

Coc.on('playerLeft', (message) => {
    console.log(message); 
});
```

Output:

```
{ clan:
   { name: 'Indian Hounds',
     tag: '#V88CRPU',
     badgeUrls:
      { small:
         'https://api-assets.clashofclans.com/badges/70/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png',
        large:
         'https://api-assets.clashofclans.com/badges/512/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png',
        medium:
         'https://api-assets.clashofclans.com/badges/200/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png' },
     members: 44,
     type: 'open' },
  tag: '#LQPYGVGPC',
  name: 'Grey Ninja',
  role: 'member',
  expLevel: 82,
  league:
   { id: 29000012,
     name: 'Crystal League I',
     iconUrls:
      { small:
         'https://api-assets.clashofclans.com/leagues/72/kSfTyNNVSvogX3dMvpFUTt72VW74w6vEsEFuuOV4osQ.png',
        tiny:
         'https://api-assets.clashofclans.com/leagues/36/kSfTyNNVSvogX3dMvpFUTt72VW74w6vEsEFuuOV4osQ.png',
        medium:
         'https://api-assets.clashofclans.com/leagues/288/kSfTyNNVSvogX3dMvpFUTt72VW74w6vEsEFuuOV4osQ.png' } },
  trophies: 2465,
  versusTrophies: 2068,
  clanRank: 15,
  previousClanRank: 0,
  donations: 0,
  donationsReceived: 0 }
```

####  'playerPromote' <a name = "playerPromote"></a> and 'playerDemote' <a name = "playerDemote"></a>

This event listens to player promotion/demotion of clan.

```
Coc.on('playerPromote', (message) => {
    console.log(message); 
});

Coc.on('playerDemote', (message) => {
    console.log(message); 
});
```

Output:

```
{ clan:
   { name: 'Indian Hounds',
     tag: '#V88CRPU',
     badgeUrls:
      { small:
         'https://api-assets.clashofclans.com/badges/70/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png',
        large:
         'https://api-assets.clashofclans.com/badges/512/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png',
        medium:
         'https://api-assets.clashofclans.com/badges/200/oaygM0AU0VupNHITpoIcnWW9a6YMG-houO7GUmuYGlg.png' },
     members: 44,
     type: 'open' },
  tag: '#LQPYGVGPC',
  name: 'Grey Ninja',
  role: 'member',
  expLevel: 82,
  league:
   { id: 29000012,
     name: 'Crystal League I',
     iconUrls:
      { small:
         'https://api-assets.clashofclans.com/leagues/72/kSfTyNNVSvogX3dMvpFUTt72VW74w6vEsEFuuOV4osQ.png',
        tiny:
         'https://api-assets.clashofclans.com/leagues/36/kSfTyNNVSvogX3dMvpFUTt72VW74w6vEsEFuuOV4osQ.png',
        medium:
         'https://api-assets.clashofclans.com/leagues/288/kSfTyNNVSvogX3dMvpFUTt72VW74w6vEsEFuuOV4osQ.png' } },
  trophies: 2465,
  versusTrophies: 2068,
  clanRank: 15,
  previousClanRank: 0,
  donations: 0,
  donationsReceived: 0,
  previous: 'coLeader',
  current: 'admin' }
```

####  'error' <a name = "error"></a>

This event listens to any error that occurs on API request ie Maintainance Break, Invalid Token, Invalid Tag etc.,

```
Coc.on('error', (message) => {
    console.log(message); 
});
```

Output:

```
{ tag: 'GGQ2UYJL', statusCode: 403, statusMessage: 'Forbidden' }
```


