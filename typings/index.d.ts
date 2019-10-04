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

   * @param groupId ID группы, о которой необходимо получить информацию

   */

  public getGroupData(groupId: number): Promise<Responses.IGetGroupDataResponse>;

  /**

   * @param groupId ID группы, майнеров которой необходимо получить

   */

  public getGroupMiners(groupId: number): Promise<Responses.IGetGroupMinersResponse>;

  /**

   * @param count Количество пользователей для вывода

   */

  public getUsersTop(count?: number): Promise<Responses.IGetTopResponse;

  /**

   * @param count Количество групп для вывода

   */

  public getGroupsTop(count?: number): Promise<Responses.IGetGroupTopResponse;


  /**

   * @param targetId ID пользователя для получения транзакций
   * @param count Кол-во переводов от юзера и юзеру

   */

  public getTransactionHistory(targetId?: number): Promise<Responses.IGetTransactionHistoryResponse>;

  /**

   * @param amount - Количество GGPay монет

   * @param fixation - Является ли сумма GGPay монет фиксированной?

   */

  public generateLink(amount?: number, fixation?: boolean): string;


}

declare class GGPay {

  public updates: Updates;

  public api: API;

  /**

   * Constructor

   * @param options GGPay params

   */

  constructor(options: Params.IGGPayParams);

}

export default GGPay;

export { GGPay };

