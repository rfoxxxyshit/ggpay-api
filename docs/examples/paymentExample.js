const GGPayAPI = require('ggpay-api') // Импортируем библиотеку.

const ggpay = new GGPayAPI({ // Создаем новый экземпляр GGPayAPI

  token: 'my-secret-token', // Укажите токен GGPay (https://saind.ru/api/method/token.php)

  userId: 1, // ID бота.

})

const { VK } = require('vk-io') // Импортируем библиотеку для работы с VK API

const vk = new VK()

vk.setOptions({

  token: 'user-or-group-secret-token',

}) // Устанавливаем токен для работы API

vk.updates.on(['new_message'], async (context, next) => { // Отлавливаем новые сообщения

  if (context.text === 'бонус') { //

    await ggpay.api.sendPayment(context.senderId, 10000)

    return context.reply('Мы отправили Вам 10 GG-монет!')

  }

  await next()

})

vk.updates.start().catch(console.error)

