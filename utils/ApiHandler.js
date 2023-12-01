import chalk from 'chalk'
import eyes from 'eyes'

/**
 * API handler class
 * @class API
 */
export class API {
  /**
   * @property {Function} constructor class constructor
   * @param {import('@playwright/test').APIRequestContext} request request passed in a constructor of the API class
   */
  constructor(request) {
    this.request = request
  }
  static inspect = eyes.inspector({
    // @ts-ignore
    maxLength: false,
    pretty: true,
    hideFunctions: false,
    stream: process.stdout
  })
  static color = {
    success: chalk.bold.hex('#0EF15D'),
    error: chalk.bold.hex('#E4271B'),
    warning: chalk.bold.hex('#FFA500'),
    info: chalk.hex('#A020F0'),
    outgoingRequest: chalk.hex('#0560fc'),
    incomingRequest: chalk.hex('#fcf805'),
    request: chalk.hex('#0560fc'),
    response: chalk.hex('#fcf805')
  }
  /**
   * Logs a request to the console based on the provided URL and data.
   * @property {Function} logRequest Logs a request to the console based on the provided URL and data.
   * @returns {Promise<void>}
   * @param {string} URL - Request URL.
   * @param {object} data - Request body.
   */

  static async logRequest(URL, data) {
    console.log(
      this.color.request(
        `\n<<<<<<<<<<<<<<<<< SENDING REQUEST <<<<<<<<<<<<<<<<<\nRequest URL: \n${this.color.info(
          URL
        )}\nRequest data: \n`
      )
    )
    this.inspect(data)
    console.log(this.color.request('<<<<<<<<<<<<<<<<< END OF REQUEST <<<<<<<<<<<<<<<<<'))
  }

  /**
   * Logs a response to the console based on the provided status and data.
   * @property {Function} logResponse Logs a response to the console based on the provided status and data.
   * @returns {Promise<void>}
   * @param {string} status - Response status.
   * @param {object} data - Response body.
   */

  static async logResponse(status, data) {
    console.log(
      this.color.response(
        `\n<<<<<<<<<<<<<<<<< RECEIVING RESPONSE <<<<<<<<<<<<<<<<<\nResponse status: \n${this.color.info(
          status
        )}\nResponse data: \n`
      )
    )
    this.inspect(data)
    console.log(this.color.response('<<<<<<<<<<<<<<<<< END OF RESPONSE <<<<<<<<<<<<<<<<<'))
  }

  async #makeRequest(endpoint, method, reqBody = null, token = null, params = null, formUrl = null) {
    API.logRequest(endpoint, reqBody)
    const res = await this.request[method](endpoint, {
      headers: token ? { Authorization: `Token ${token}`, 'Content-Type': 'application/json' } : {},
      data: reqBody ? reqBody : undefined,
      form: formUrl ? formUrl : undefined,
      params: params ? params : undefined
    })
    try {
      API.logResponse(res.status(), await res.json())
    } catch (err) {
      API.logResponse(res.status(), await res.text())
    }
    return res
  }
  async postReq(endpoint, reqBody = null, token = null, params = null, formUrl = null) {
    return this.#makeRequest(endpoint, 'post', reqBody, token, params, formUrl)
  }

  async getReq(endpoint, token = null, params = null) {
    return this.#makeRequest(endpoint, 'get', null, token, params)
  }

  async putReq(endpoint, reqBody = null, token = null, params = null, formUrl = null) {
    return this.#makeRequest(endpoint, 'put', reqBody, token, params, formUrl)
  }

  async patchReq(endpoint, reqBody = null, token = null, params = null, formUrl = null) {
    return this.#makeRequest(endpoint, 'patch', reqBody, token, params, formUrl)
  }

  async deleteReq(endpoint, token = null, params = null) {
    return this.#makeRequest(endpoint, 'delete', null, token, params)
  }
}
