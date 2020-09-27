/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

const Trackers = require('./core/Trackers');

/**
 * @param  { Object } options={}
 * @param  { Object } events={}
 */
class Client {
  constructor(options = {}, events = {}) {
    this.ratelimit = options.ratelimit || 10;
    this.tokens = options.tokens || [];
    this.sync = options.sync || 120;
    this.donationEvent = events.donationEvent || false;
    this.clanEvent = events.clanEvent || false;
    this.playerJoin = events.playerJoin || false;
    this.playerLeft = events.playerLeft || false;
    this.playerPromote = events.playerPromote || false;
    this.playerDemote = events.playerDemote || false;
  }

  /**
   * @param  { Array.<string>} tags=[]
   */
  async init(tags = []) {
    if (!(/[0-9]+/).test(this.ratelimit) && !(/[0-9]+/).test(this.sync)) {
      throw (new Error('Enter a valid number for ratelimit/sync.'));
    }

    if (this.sync <= 120) this.sync = 120; // default cache

    if (this.ratelimit <= 0 || this.ratelimit > 1000) this.ratelimit = 10;

    if (typeof this.tokens !== 'object' || this.tokens.length === 0) {
      throw (new Error('The tokens should be of array type/tokens array is empty.'));
    }

    if (typeof tags !== 'object') {
      throw (new Error('The tags should be of array type.'));
    }

    new Trackers(this.ratelimit, this.tokens, this.sync, this.donationEvent, this.clanEvent, this.playerJoin, this.playerLeft, this.playerPromote, this.playerDemote).init(tags);
  }

  /**
   * @param  { String } tag
   */
  async add(tag) {
    new Trackers().add(tag);
  }

  /**
   * @param  { String } tag
   */
  async delete(tag) {
    new Trackers().delete(tag);
  }

  /**
   * @param  { String } eventName
   * @callback { Object }
   */
  async on(eventName, callback) {
    COCEVENTS.on(eventName, (message) => callback(message));
  }

  /**
   * @function stats reuturn details of settings
   */
  get stats() {
    return new Trackers().stats(this);
  }
}

module.exports = Client;
