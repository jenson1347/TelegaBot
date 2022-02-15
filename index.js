const TelegramApi = require('node-telegram-bot-api');
const token ='5266118697:AAGkMkCfEkAjW158rroDICiFwv_pyr4oNSQ';
const bot = new TelegramApi(token, {polling: true});
const cron = require("node-cron");
const shell = require("shelljs");



var date; 


cron.schedule('* * * * * *', function () {
  date = new Date();
})

let chatID = [999999];
bot.setMyCommands(
      [
      {command: '/start', description: 'Джентмельмен устраиваться на работу'},
      {command: '/end', description: 'Джентмельмен заканчивает работать'}
      ]
      )
const optionsYes = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
      {text: 'Да, будет', callback_data: 'yes'},
      ]
    ]
  })
}
const optionsNo = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
      {text: 'Я тоже', callback_data: 'no'}
      ]
    ]
  })
}

function removeID (arr,Id) {
  let index = 0;
  index = arr.indexOf(Id);
  [arr[0], arr[index]] = [arr[index], arr[0]];
  arr.shift();
  for (let i = 0; i < arr.length; i++) {
  }
}


let pleasureWords = ["Ты секси", "Я тебя люблю", "Хочу от тебя детей"];
var week = 
  [
    'https://cdn.otkritkiok.ru/posts/big/kartinka-khoroshego-voskresenya-70560.jpg',
    'https://smartminds.ru/wp-content/uploads/2019/11/foto-1-ponedelnik-vnov-prishel-pust-proydet-on-horosho.jpg',
    'https://smartminds.ru/wp-content/uploads/2019/11/foto-1-pust-segodnyashniy-vtornik-prineset-vam-tolko-horoshie-vesti.jpg',
    'https://klike.net/uploads/posts/2020-08/1596431670_3.jpg',
    'https://mywanderlust.ru/images/thursday/thurs16.jpg',
    'https://iecards.ru/wp-content/uploads/images/stories/virtuemart/product/khoroshej-pyatnitsy-i-vykhodnykh-kartinka-prikolnaya.jpg',
    'https://bonnycards.ru/images/dni-nedeli/small/s-subbota0054.jpg'
]

let maxIndex = pleasureWords.length;
let minIndex = 0;
function getRandomInt(minIndex, maxIndex) {
  min = Math.ceil(minIndex);
  max = Math.floor(maxIndex);
  return Math.floor(Math.random() * (max - min)) + min;
}
function checkID (arr, elem) {
  var flag;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]===elem) {
       flag = true;
    }
  else {
    flag = false;
    }
}
return flag;
}

  cron.schedule('*/30 * * * *', function() {
    for (let i = 0; i < chatID.length; i++) {
       bot.sendMessage(chatID[i], pleasureWords[getRandomInt(minIndex,maxIndex)]);
       console.log('Отправлено сообщение' + '. Время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    } 
  });
  cron.schedule('30 7 * * *', function() {
    
    day = date.getDay();
    for (let i = 0; i < chatID.length; i++) {
      if (chatID[i]==999999) {
        console.log('Отправленно на тестовый чат 999999' + '. Время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
      }
      else {
        bot.sendPhoto(chatID[i],week[day]);
        return;
      }
    };

  })


bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === '/start') {
    bot.sendMessage(chatId, 'Джентельмен будет отправлять тебе сообщения', optionsYes);
    return;
  }
  if (text==='/end') {
    bot.sendMessage(chatId, 'Джентмельмен идёт пить пиво', optionsNo);
    return;
  }

  if (text === 'Пошел нахуй' || text==='пошел нахуй' || text==='Пошёл нахуй'){
    bot.sendMessage(chatId, 'Сам пошёл нахуй');
    return;
  }
  if (checkID(chatID,chatId)) {
    bot.sendMessage(chatId,'Джентельмен работает');
    return;
  }
  await bot.sendMessage(chatId,'Джентельмен пьет пиво');
})

bot.on ('callback_query', async msg => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  if (data == 'no') {
    if (checkID(chatID,chatId)) {
      console.log('Количество чатов до удаления: ' + chatID.length + '. Время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
      removeID(chatID,chatId);
      console.log('Количество чатов после удаления: ' + chatID.length + '. Время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
      bot.sendMessage(chatId, 'Джентельмен идёт домой');
      return;
    }
    else {
      console.log('Количество чатов: ' + chatID.length + '. Время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
      bot.sendMessage(chatId, 'Джентельмен уже дома');
    }
}
  if (data=='yes') {
    if (!checkID(chatID,chatId)) {
      chatID.push(chatId);
      console.log('Создан чат' + '. Время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
      console.log('Количество чатов: ' + chatID.length + '. Время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
      for (let i = 0; i < chatID.length; i++) {
        console.log(chatID[i]);
      }
      bot.sendMessage(chatId, 'Джентельмен начинает работать');
      return;

  }
    else {
      console.log('Чат уже существует');
      console.log('Количество чатов: ' + chatID.length + '. Время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
      bot.sendMessage(chatId, 'Джентельмен уже работает');
      return;
    }
  }

})