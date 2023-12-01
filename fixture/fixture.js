import * as base from '@playwright/test'
import { API } from '@utils/ApiHandler'
/**
 * API fixture file
 * @module API fixture file to initiate API instances
 */

/**
 * @typedef {object} APITestArgs - API test args
 * @property {API} api - api instance
 */
/** @type {base.Fixtures<APITestArgs, {}, base.PlaywrightTestArgs, base.PlaywrightWorkerArgs>} */

const extension = {
  api: async ({ request }, use) => {
    const api = new API(request)
    await use(api)
  }
}
export const test = base.test.extend(extension)
export { expect } from '@playwright/test'
