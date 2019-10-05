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
|method|String|true          |Название метода, как оно указано в [документации к API](https://saind.ru/dev/).          |
|params|Object|false         |Параметры, необходимые для метода. (по умолчанию {})                                                 |

### Метод 'getWebhook'

`getWebhook` - получение информации об установленном вебхуке

```js
async function run () {
  const result = await ggpay.api.getWebhook() // Получаем информацию об установленном вебхуке с серверов GGPay

  console.log(result) // Выводим результат в консоль
}

run().catch(console.error)
```

|Опция |Тип   |Необходимость |Описание                                               |
|-     |-     |-             |-      
|-     |-     |-            |-                          |

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

`getUsersTop` - получение данных о таблице рейтингов пользователей GG Pay.

```js
async function run () {
  const result = await ggpay.api.getUsersTop(5) // Получаем ТОП-5 пользователей

  console.log(result)
}

run().catch(console.error)
```

|Опция |Тип    |Необходимость |Описание                                                        |
|-     |-      |-             |-                                                               |
|count |Number |false         |Количество пользователей (по умолчанию 50)                      |

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
|count|Number|false            |Кол-во переводов для отображения(по умолчанию 100)

### Метод 'getGroupsTop'

`getGroupsTop` - получение данных о таблице рейтингов групп GG Pay.

```js
async function run () {
  const result = await ggpay.api.getGroupsTop(5) // Получаем ТОП-5 групп

  console.log(result)
}

run().catch(console.error)
```

|Опция |Тип    |Необходимость |Описание                                                        |
|-     |-      |-             |-                                                               |
|count |Number |false         |Количество групп (по умолчанию 100)

### Метод 'getGroupData'

`getGroupData` - получение данных о группе.

```js
async function run () {
  const result = await ggpay.api.getGroupData(184624910) // Получаем даныне из базы данных GGPay о группе с ID 184624910 (GG Pay)

  console.log(result)
}

run().catch(console.error)
```

|Опция   |Тип   |Необходимость |Описание                                         |
|-       |-     |-             |-                                                |
|groupId |Number|true          |ID группы, о которой нужно получить данные       |  

`getGroupMiners` - получение данных о пользователе.

```js
async function run () {
  const result = await ggpay.api.getGroupMiners(184624910) // Получаем даныне из базы данных GGPay о майнерах в группе с ID 184624910 (GG Pay)

  console.log(result)
}

run().catch(console.error)
```

|Опция   |Тип   |Необходимость |Описание                                         |
|-       |-     |-             |-                                                |
|groupId |Number|true          |ID группы, о майнерах которой нужно получить данные|  

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
