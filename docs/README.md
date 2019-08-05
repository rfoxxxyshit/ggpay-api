# Начало работы с GGPay API

## Подключение библиотеки

В новом JavaScript файле произведите подключение установленной библиотеки GGPay API.

```js
const GGPayAPI = require('ggpay-api')
const ggpay = new GGPayAPI(/* options = {} */)
```

|Опция |Тип   |Описание                                                                                  |
|-     |-     |-                                                                                         |
|token |String|[Ваш GGPay Token для взаимодействия с API](https://saind.ru/api/method/token.php)|
|userId|Number|Цифровой идентификатор (ID) пользователя, который будет являться "ботом"                  |

## Использование Callback API

```js
async function run () {
  await ggpay.updates.start(/* options = {}, */ (data) => {
    console.log(data)
  }).catch(console.error)

  ggpay.updates.onTransfer((event) => {
    console.log(event)
  }).catch(console.error)
}

run().catch(console.error)

```

## Методы API

### Метод 'call'

`call` - вызов любого метода с любыми параметрами, может пригодиться для нововведений в API.

```js
async function run () {
  const result = await ggpay.api.call('method.get', { method: method.Name, data: '123123' })

  console.log(result)
}

run().catch(console.error)
```

|Опция |Тип   |Необходимость |Описание                                                                                             |
|-     |-     |-             |-                                                                                                    |
|method|String|true          |Название метода, как оно указано в [документации к API](https://vk.com/@gg_pay-api-gg-pay).          |
|params|Object|false         |Параметры, необходимые для метода. (по умолчанию {})                                                 |

### Метод 'sendPayment'

`sendPayment` - отправка GG-монет пользователю.

```js
async function run () {
  const result = await ggpay.api.sendPayment(1, 1) // Отправляем 1 GG-копейку пользователю с @id1 (Павел Дуров).

  console.log(result)
}

run().catch(console.error)
```

|Опция |Тип   |Необходимость |Описание                                               |
|-     |-     |-             |-                                                      |
|toId  |Number|true          |ID пользователя, которму необходимо отправить GG-монеты|
|amount|Number|true          |Количество GG-монет, необходимое для отправки.         |

### Метод 'getUserData'

`getUserData` - получение данных о пользователе.

```js
async function run () {
  const result = await ggpay.api.getUserData(1) // Получаем даныне из базы данных GGPay о пользователе с @id1 (Павел Дуров)

  console.log(result)
}

run().catch(console.error)
```

|Опция   |Тип   |Необходимость |Описание                                         |
|-       |-     |-             |-                                                |
|targetId|Number|true          |ID пользователя, о котором нужно получить данные.|

### Метод 'getUsersTop'

`getUsersTop` - получение данных о таблице рейтингов пользователей VK Point.

```js
async function run () {
  const result = await ggpay.api.getUsersTop(5, true) // Получаем ТОП-5 ВИП пользователей

  console.log(result)
}

run().catch(console.error)
```

|Опция |Тип    |Необходимость |Описание                                                        |
|-     |-      |-             |-                                                               |
|count |Number |false         |Количество пользователей (по умолчанию 50)                      |
|vip   |Boolean|false         |Возвращает топ VIP пользователей, если true (по умолчанию false)|

### Метод 'getTransactionHistory'

`getTransactionHistory` - получение истории переводов пользователя.

```js
async function run () {
  const result = await ggpay.api.getTransactionHistory(1) // Получаем историю переводо пользователя с @id1 (Павел Дуров)

  console.log(result)
}

run().catch(console.error)
```

|Опция   |Тип   |Необходимость |Описание                                                              |
|-       |-     |-             |-                                                                     |
|targetId|Number|false         |ID пользователя для получения истории переводов (по умолчанию ID бота)|

### Метод 'getMerchant'

`getMerchant` - получение информации о том, сколько отправлено монет GG Pay пользователю (переводы)

```js
async function run () {
  const result = await ggpay.api.getMerchant(1) // Получаем информацию о том, сколько было переведено GG-монет пользователю с @id1 (Павел Дуров)
  
  console.log(result)
}

run().catch(console.error)
```

|Опция   |Тип   |Необходимость |Описание                                                              |
|-       |-     |-             |-                                                                     |
|targetId|Number|true         |ID пользователя для получения кол-ва отправленных монет|

### Метод 'generateLink'

`generateLink` - генерация ссылки на перевод.

```js
function run () {
  const result = ggpay.api.generateLink(100, false) // Генерируем ссылку для перевода 100 VK Points без фиксации.

  console.log(result)
}

run()
```

|Опция   |Тип    |Необходимость |Описание                                                   |
|-       |-      |-             |-                                                          |
|amount  |Number |false         |Количество GG-монет для перевода. (по умолчанию не указано)|
|fixation|Boolean|false         |Является ли фиксированной ссылка. (по умолчанию false)     |
