import * as Params from './params';

import * as Responses from './responses';

declare class Updates {

  /**

   * Constructor

   * @param token GGPay Token

   * @param userId VK User ID

   */

  constructor(token: string, userId: number);

  /**

   * Callback API options

   * @param options Start webhook params

   */

  public start(options: Params.IUpdatesStartParams): Promise<void>;

  /**

   * @param callback Callback

   */

  public onTransfer(callback: Function): void;

}

declare class API {

  /**

   * Constructor

   * @param token GGPay Token

   * @param userId VK User ID

   */

  constructor(token: string, userId: number);

  /**

   * @param method GGPay API метод

   * @param params GGPay API параметры

   */

  public call(method: string, params?: object): Promise<any>;

  /**

   * @param toId ID получателя

   * @param amount Количество GGPay монет

   */

  public sendPayment(toId: number, amount: number): Promise<Responses.ISendPaymentResponse>;

  /**

   * @param targetId ID того, о ком надо получить данные

   */

  public getUserData(targetId: number): Promise<Responses.IGetUserDataResponse>;

  /**

   * @param count Количество пользователей для вывода

   * @param vip Является ли топ VIP?

   */

  public getUsersTop(count?: number, vip?: boolean): Promise<Responses.IGetTopResponse | Responses.IGetVipTopResponse>;

  /**

   * @param targetId ID пользователя для получения транзакций

   */

  public getTransactionHistory(targetId?: number): Promise<Responses.IGetTransactionHistoryResponse>;

  /**

   * @param amount - Количество GGPay

   * @param fixation - Является ли сумма GGPay монет фиксированной?

   */

  public generateLink(amount?: number, fixation?: boolean): string;

  

  /**

  * @param targetId - ID пользователя для получения кол-ва отправленных монет

  */

  public getMerchant(targetId: number): Promise<Responses.IGetMechantResponse>;

}

declare class VKPoint {

  public updates: Updates;

  public api: API;

  /**

   * Constructor

   * @param options GGPay params

   */

  constructor(options: Params.IVKPointParams);

}

export default VKPoint;

export { VKPoint };

