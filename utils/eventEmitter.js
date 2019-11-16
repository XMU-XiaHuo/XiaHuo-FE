function EventEmitter() {

  const eventList = {};

  const addEvent = (eventName, cbk, time) => {
    if (!eventList[eventName]) {
      eventList[eventName] = [];
    }
    eventList[eventName].push({
      cbk,
      time,
    });
    return this;
  };

  this.on = (eventName, cbk) => {
    addEvent(eventName, cbk, -1);
    return this;
  };

  this.once = (eventName, cbk) => {
    addEvent(eventName, cbk, 1);
    return this;
  };

  this.trigger = (eventName, ...args) => {
    let callbackList = eventList[eventName];
    if (callbackList) {
      for (let i = 0; i < callbackList.length; i++) {
        let cbkObj = callbackList[i];
        cbkObj.cbk.apply(this, args);
        cbkObj.time--;
        if (cbkObj.time === 0) {
          callbackList.splice(i--, 1);
        }
      }
    }
    return this;
  };
}

module.exports = EventEmitter;