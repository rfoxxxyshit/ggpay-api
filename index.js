const Koa = require('koa')
const koaBody = require('koa-body')
const request = require('./utils/request')

class Updates {
  constructor (token, userId) {
    this.token = token
    this.userId = userId

    this.isStarted = true

    this.transferCallback = null
  }

  async start ({ url, port = 8181, path = '/' }) {
    if (!url) {
      return new Error('param `url` is required')
    }

    this.app = new Koa()
    this.app.use(koaBody())
    this.app.listen(port)

    if (!/^(?:https?)/.test(url)) {
      url = `http://${url}`
    }

    let params = {
      access_token: this.token,
      url: `${url}:${port}${path}`,
    }

    let result = await request(`http://saind.ru/dev/method/callback.set.php?${Object.entries(params).map(e => e.join('=')).join('&')}`)

    if (!result.error) {
      this.isStarted = true

      this.app.use((ctx) => {
        ctx.status = 200

        this.transferCallback(ctx.request.body)
      })
    } else {
      this.isStarted = false
    }
  }

  onTransfer (callback) {
    if (!this.isStarted) return
    this.transferCallback = callback
  }
}

class API {
  /**
   * @param {String} token - GGPay Token
   * @param {Number} userId - VK User ID
   */
  constructor (token, userId) {
    this.token = token
    this.userId = userId
  }

  async call (method, params = {}) {
    if (!method) {
      throw new Error('param `method` is required')
    }

    params = Object.assign(params)

    const result = await request(`http://saind.ru/dev/method/${method}.php?${Object.entries(params).map(e => e.join('=')).join('&')}`)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getWebhook () {
    const params = {
      access_token: this.token
    }

    const result = await this.call('callback.get', params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async sendPayment (toId, amount) {
    if (typeof toId !== 'number') {
      throw new Error(`expected \`toId\` to be number, got ${typeof toId}`)
    }

    if (typeof amount !== 'number') {
      throw new Error(`expected \`amount\` to be number, got ${typeof amount}`)
    }

    const params = {
      user_id: toId,
      money: amount,
      user_token_bank: this.token
    }

    const result = await this.call('users.merchantSend', params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getUserData (targetId) {
    if (typeof targetId !== 'number') {
      throw new Error(`expected \`targetId\` to be number, got ${typeof targetId}`)
    }

    const params = {
      user_id: targetId,
    }

    const result = await this.call('users.getInfo', params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getUsersTop (count = 50) {
    if (typeof targetId !== 'number') {
      throw new Error(`expected \`targetId\` to be number, got ${typeof targetId}`)
    }

    const params = {
      access_token: this.token,
      count: count
    }

    let result = await this.call(`users.getTop`, params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getTransactionHistory (targetId = this.userId, count = 100) {
    if (typeof targetId !== 'number') {
      throw new Error(`expected \`targetId\` to be number, got ${typeof targetId}`)
    }

    const params = {
      access_token: this.token,
      user_id: targetId,
      count: count
    }

    let result = await this.call(`users.historyTransaction`, params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }
  
  async getGroupsTop (count = 100) {
    if (typeof count !== 'number') {
      throw new Error(`expected \`count\` to be number, got ${typeof count}`)
    }

    const params = {
      access_token: this.token,
      count: count
    }

    const result = await this.call('groups.getTop', params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getGroupData (groupId) {
    if (typeof groupId !== 'number') {
      throw new Error(`expected \`groupId\` to be number, got ${typeof groupId}`)
    }

    const params = {
      access_token: this.token,
      group_id: groupId
    }

    const result = await this.call('groups.getInfoById', params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getGroupMiners (groupId) {
    if (typeof groupId !== 'number') {
      throw new Error(`expected \`groupId\` to be number, got ${typeof groupId}`)
    }

    const params = {
      access_token: this.token,
      group_id: groupId
    }

    const result = await this.call('groups.getMinersById', params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  generateLink (amount = 0, fixation = false) {
    if (typeof amount !== 'number') {
      throw new Error(`expected \`amount\` to be number, got ${typeof amount}`)
    }

    return `vk.com/app7034787#u=${this.userId}${fixation ? '&fixed' : ''}${amount > 0 ? `&money=${amount}` : ''}`
  }
}

module.exports = class GGPay {
  constructor (options) {
    if (!options.token) throw new Error('param `token` is required')
    if (!options.userId) throw new Error('param `userId` is required')

    this.token = options.token
    this.userId = options.userId

    this.updates = new Updates(this.token, this.userId)
    this.api = new API(this.token, this.userId)
  }
}
