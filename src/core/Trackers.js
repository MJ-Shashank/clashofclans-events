/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */

const https = require('https');
const Events = require('events');
const { error } = require('../events/error');
const { playerJoin } = require('../events/PlayerEvent/playerJoin');
const { playerLeft } = require('../events/PlayerEvent/playerLeft');
const { donationEvent } = require('../events/DonationEvent/donationEvent');
const { playerPromote } = require('../events/PlayerEvent/playerPromote');
const { playerDemote } = require('../events/PlayerEvent/playerDemote');
const {
  badgeUrls, clanLevel, description, isWarLogPublic,
  location, requiredTrophies, type, warFrequency, warLeague,
} = require('../events/ClanEvent/clanEvent');

global.cocEvents = new Events();

const clansData = new Map();
const Tags = [];
let eventCount = 0;
const Role = ['member', 'admin', 'coLeader', 'leader'];

/**
 * Trackers class
 * @param  { Number } ratelimit
 * @param  { String } tokens
 * @param  { Number } sync
 * @param  { Boolean } donationEvent
 * @param  { Boolean } clanEvent
 * @param  { Boolean } playerJoin
 * @param  { Boolean } playerLeft
 * @param  { Boolean } playerPromote
 * @param  { Boolean } playerDemote
 */
class Trackers {
  constructor(ratelimit, tokens, sync, donationEvent, clanEvent, playerJoin, playerLeft, playerPromote, playerDemote) {
    this.ratelimit = ratelimit;
    this.tokens = tokens;
    this.sync = sync;
    this.donationEventStatus = donationEvent;
    this.clanEventStatus = clanEvent;
    this.playerJoinStatus = playerJoin;
    this.playerLeftStatus = playerLeft;
    this.playerPromoteStatus = playerPromote;
    this.playerDemoteStatus = playerDemote;
  }

  /**
   * @param  { Number } ms
   */
  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * @param  { String } tag
   */
  _tag(tag) {
    return `${tag.toUpperCase().replace(/#/g, '').replace(/O/g, '0')}`;
  }

  /**
   * @param  { String } path
   */
  async _fetch(path) {
    const options = {
      hostname: 'api.clashofclans.com',
      path,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.tokens[0]}`,
        'Content-Type': 'application/json',
      },
      timeout: 0,
    };

    let raw = '';
    return new Promise((resolve, reject) => {
      https.get(options, (req) => {
        req.on('data', (res) => {
          raw += res;
        });

        req.on('end', () => {
          resolve({ statusCode: req.statusCode, statusMessage: req.statusMessage, ...JSON.parse(raw) });
        });

        req.on('error', (err) => {
          reject(err);
        });
      });
    });
  }

  /**
   * @param  {Array.<string>} tags
   */
  async init(tags = []) {
    for (const tag of tags) {
      if (Tags.indexOf(this._tag(tag)) === -1) {
        clansData.set(this._tag(tag), undefined);
        Tags.push(this._tag(tag));
      }
    }

    await this.reset();
  }

  /**
   * Reset the timer.
   * @function reset()
   */
  async reset() {
    for (const tag of Tags) {
      await this.tracker(this._tag(tag));
      await this.sleep(100);
    }

    await this.sleep(this.sync * 1000 - ((Tags.length * 100 + eventCount * (1000 / this.ratelimit)) <= (this.sync * 1000) ? (Tags.length * 100 + eventCount * (1000 / this.ratelimit)) : 0));
    eventCount = 0;
    await this.reset();
  }

  /**
   * Add new clan to the tracker.
   * @param  { String } tag
   */
  async add(tag) {
    if (Tags.indexOf(this._tag(tag)) === -1) {
      clansData.set(this._tag(tag), undefined);
      Tags.push(this._tag(tag));
    }
  }

  /**
   * Delete a clan tag from tracker.
   * @param  { String } tag
   */
  async delete(tag) {
    if (Tags.indexOf(this._tag(tag)) !== -1) {
      clansData.delete(this._tag(tag));
      Tags.splice(Tags.indexOf(this._tag(tag)), 1);
    }
  }

  /**
   * Tracks all event activities of a clan.
   * @param  { String } tag
   */
  async tracker(tag) {
    try {
      const newData = await this._fetch(`/v1/clans/%23${this._tag(tag)}`); console.log(newData.name);
      if (newData.statusCode !== 200) {
        let tempError = new Error();
        tempError = {
          tag: this._tag(tag),
          statusCode: newData.statusCode,
          statusMessage: newData.statusMessage,
        };
        throw tempError;
      }
      const oldData = clansData.get(this._tag(tag));

      if (oldData) {
        // Donation Event

        if (this.donationEventStatus) {
          await donationEvent(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });
        }

        // Clan Events

        if (this.clanEventStatus) {
          await badgeUrls(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });

          await type(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });

          await isWarLogPublic(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });

          await description(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });

          await warFrequency(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });

          await warLeague(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });

          await requiredTrophies(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });

          await location(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });

          await clanLevel(cocEvents, oldData, newData, async (check) => {
            if (check) {
              await this.sleep(1000 / this.ratelimit);
              eventCount++;
            }
          });
        }

        // Player Promote And Demote

        if (this.playerPromoteStatus || this.playerDemoteStatus) {
          let pd = oldData.memberList.filter((f) => newData.memberList.some((s) => (f.role !== s.role && f.tag === s.tag)));

          if (pd.length > 0) {
            pd = pd.map(async (j) => {
              const currentPlayer = newData.memberList.filter((m) => m.tag === j.tag)[0];
              const previousPlayer = oldData.memberList.filter((m) => m.tag === j.tag)[0];
              if (Role.indexOf(j.role) < Role.indexOf(newData.role)) {
                if (this.playerPromoteStatus) {
                  playerPromote(cocEvents, oldData, newData, previousPlayer, currentPlayer);
                  await this.sleep(1000 / this.ratelimit);
                  eventCount++;
                }
              } else {
                // eslint-disable-next-line no-lonely-if
                if (this.playerDemoteStatus) {
                  playerDemote(cocEvents, oldData, newData, previousPlayer, currentPlayer);
                  await this.sleep(1000 / this.ratelimit);
                  eventCount++;
                }
              }
            });
          }
        }

        // Player Join and Left Event

        if (this.playerJoinStatus) {
          const join = newData.memberList.filter((f) => !oldData.memberList.some((d) => d.tag === f.tag));

          if (join.length > 0) {
            for (const player of join) {
              await this.sleep(1000 / this.ratelimit);
              playerJoin(cocEvents, player, newData);
              eventCount++;
            }
          }
        }

        if (this.playerLeftStatus) {
          const left = oldData.memberList.filter((f) => !newData.memberList.some((d) => d.tag === f.tag));

          if (left.length > 0) {
            for (const player of left) {
              await this.sleep(1000 / this.ratelimit);
              await playerLeft(cocEvents, player, newData);
              eventCount++;
            }
          }
        }
      }

      clansData.set(this._tag(newData.tag), newData);
      this.sleep(100);
    } catch (err) {
      if (err.statusCode === 503) {
        error(cocEvents, err);
        await this.sleep(1000 * 60 * 5);
      } else if (err.statusCode === 403) {
        error(cocEvents, err);
        await this.sleep(1000 * 60 * 10);
      } else {
        error(cocEvents, err);
        await this.sleep(100);
      }
    }
  }
}

module.exports = Trackers;
