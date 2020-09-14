/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */

module.exports = {
  warFrequency: (emitter, oldData, newData, callback) => {
    if (oldData.warFrequency != newData.warFrequency) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'warFrequencyChange',
        previous: oldData.warFrequency,
        current: newData.warFrequency,
      });
      return callback(true);
    }
  },

  location: (emitter, oldData, newData, callback) => {
    if ((oldData.location && oldData.location.name) != newData.location.name) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'locationChange',
        previous: (oldData.location ? oldData.location : {
          name: 'unknown', id: 'unknown', isCountry: false, countryCode: 'unknown',
        }),
        current: newData.location,
      });
      return callback(true);
    }
  },

  clanLevel: (emitter, oldData, newData, callback) => {
    if (oldData.clanLevel != newData.clanLevel) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'clanLevelChange',
        previous: oldData.clanLevel,
        current: newData.clanLevel,
      });
      return callback(true);
    }
  },

  description: (emitter, oldData, newData, callback) => {
    if (oldData.description != newData.description) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'descriptionChange',
        previous: (oldData.description ? oldData.description : 'None'),
        current: (newData.description ? newData.description : 'None'),
      });
      return callback(true);
    }
  },

  type: (emitter, oldData, newData, callback) => {
    if (oldData.type != newData.type) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'typeChange',
        previous: oldData.type,
        current: newData.type,
      });
      return callback(true);
    }
  },

  isWarLogPublic: (emitter, oldData, newData, callback) => {
    if (oldData.isWarLogPublic != newData.isWarLogPublic) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'isWarLogPublicChange',
        previous: oldData.isWarLogPublic,
        current: newData.isWarLogPublic,
      });
      return callback(true);
    }
  },

  requiredTrophies: (emitter, oldData, newData, callback) => {
    if (oldData.requiredTrophies != newData.requiredTrophies) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'requiredTrophiesChange',
        previous: oldData.requiredTrophies,
        current: newData.requiredTrophies,
      });
      return callback(true);
    }
  },

  badgeUrls: (emitter, oldData, newData, callback) => {
    if (oldData.badgeUrls.medium != newData.badgeUrls.medium) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'badgeUrlsChange',
        previous: oldData.badgeUrls,
        current: newData.badgeUrls,
      });
      return callback(true);
    }
  },

  warLeague: (emitter, oldData, newData, callback) => {
    if ((oldData.warLeague && oldData.warLeague.name) != newData.warLeague.name) {
      emitter.emit('clanEvent', {
        name: newData.name,
        tag: newData.tag,
        badgeUrls: newData.badgeUrls,
        members: newData.members,
        eventType: 'warLeagueChange',
        previous: (oldData.warLeague ? oldData.warLeague : { name: 'unknown', id: 'unknown' }),
        current: newData.warLeague,
      });
      return callback(true);
    }
  },
};
