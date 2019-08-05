export interface IUpdatesStartParams {

  /**

   * Callback API URL (Ex: 127.0.0.1)

   */

  url: string;

  /**

   * Callback API Port (Ex: 8000)

   */

  port?: number;

  /**

   * Callback API Path (Ex: '/')

   */

  path?: string;

}

export interface IGGPayParams {

  /**

   * GGPay API Key

   */

  token: string;

  /**

   * VK User ID

   */

  userId: number;

}

