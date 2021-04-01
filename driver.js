'use strict';

const io = require('socket.io-client')
const host = 'http://localhost:3000'
const caps = io.connect(host)

caps.on('newPickup', pickUpItem)
caps.on('relayMessage', notified)

function pickUpItem(payload) {
  console.log(`***PACKAGE FOR ${payload.customerName} NEEDS TO BE PICKED UP`)
  setTimeout(() => {
    caps.emit('in-transit', payload)
  }, 1000)
}

function notified(payload){
  caps.emit('delievered', payload)
}

module.exports = {
  pickUpItem: pickUpItem,
}

// setTimeout(() => {
//   // will take 3 seconds to complete
// }, 3000)

// setInterval(() => {
//   // will execute every 5 seconds
// }, 5000);

console.log('DRIVER TURNED ON...')