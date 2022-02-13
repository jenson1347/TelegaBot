const TelegramApi = require('node-telegram-bot-api');
const token ='5266118697:AAGkMkCfEkAjW158rroDICiFwv_pyr4oNSQ';
const bot = new TelegramApi(token, {polling: true});
const cron = require("node-cron");
const shell = require("shelljs");
var date = new Date();
var myDay = getMyDay(date);
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

let chatID = [];
let maxIndex = pleasureWords.length;
let minIndex = 0;
function getRandomInt(minIndex, maxIndex) {
  min = Math.ceil(minIndex);
  max = Math.floor(maxIndex);
  return Math.floor(Math.random() * (max - min)) + min;
}
function checkID (chatID, elem) {
  for (let i = 0; i < chatID.length; i++) {
    if (chatID[i]===elem) {
      return true;
    }
  return false;
  }
}

  cron.schedule('* * * * * *', function() {
    console.log('Количество чатов: ' + chatID.length); 
  })

  cron.schedule('0 7 * * *', getMyDay);
  function getMyDay (date) {
    day = date.getDay();
    return day;
  }

  cron.schedule('* * * * *', async function() {
    for (let i = 0; i < chatID.length; i++) {
       await bot.sendMessage(chatID[i], pleasureWords[getRandomInt(minIndex,maxIndex)]);
    } 
  });
  cron.schedule('* * * * *', async function() {
    
    let flag = -1;

    if (myDay==0) {
        flag = 0;
    }
    if (myDay==1) {
      flag = 1;
    }
    if (myDay == 2) {
      flag = 2;
    }

    if (myDay == 3) {
      flag = 3;
    }
    if (myDay = 4) {
      myDay = 4;
    }
    if (myDay == 5) {
      flag = 5;
    }
    if (myDay == 6) {
      flag = 6;
    }
    for (let i  = 0; i < chatID.length; i++) {
     await bot.sendPhoto(chatID[i],week[flag]);
    }

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
  if (data =='no') {
  if (checkID(chatID,chatId)) {
  chatID.pop()
  bot.sendMessage(chatId, 'Джентельмен идёт домой');
  return;
}
}
  if (data=="yes") {
    if (!checkID(chatID,chatId)) {
    chatID.push(chatId);
    bot.sendMessage(chatId, 'Джентельмен начинает работать');
    return;
  }
  }

})
