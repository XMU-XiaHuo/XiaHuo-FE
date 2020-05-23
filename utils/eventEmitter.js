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
        // 执行回调函数，注入参数
        cbkObj.cbk.apply(this, args);
        // 有效次数减一
        cbkObj.time--;
        // 如果有效次数为 0，将订阅记录删除
        if (cbkObj.time === 0) {
          callbackList.splice(i--, 1);
        }
      }
    }
    return this;
  };
}

module.exports = EventEmitter;