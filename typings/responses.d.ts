interface IGetTopUserResponse {

  id: string;

  user_id: string;

  photo: string;

  first_name: string;

  last_name: string;

  money: number;

  birzha: {

    balance: number;

    balance_set: string;

    verified: string;

  };

}

interface IGetTopGroupResponse {
  
  id: number;

  group_id: string;

  photo: string;

  name: string;

  money: number;

}

interface IGetTransactionHistoryUserResponse {

  id: number;

  pay_id: string;

  first_name: string;

  last_name: string;

  photo: string;

  unix_time: string;

  info: {

    type: string;

    type_store: string;

    money: number;

    user_id: string;

    unix_time: number;

  };

}

interface IGetMinersGroupResponse {
  
  id: number;

  group_id: string;

  user_id_miner: string;

  mine_info: {

    money_mined_all_time: number;

    last_mine_to_this_group: string;

    count_request: string;

    time_mined_for_this_group: number;

  };

}

export interface IGetTopResponse {

  response: {

    all_money: number;

    online: string;

    items: Array<IGetTopUserResponse>;

  };

}

export interface IGetGroupTopResponse {
  
  response: {

    money_group_all_count: number;

    online_users_count: string;

    count: number;

    items: Array<IGetTopGroupResponse>;

  };

}

export interface IGetGroupDataResponse {
  
  response: {

  group_id: string;

  photo: string;

  money: string;

  name: string;

  ban: string;

  };

}

export interface IGetGroupMinersResponse {
  
  response: {

    group_id: string;

    money: string;

    count: number;

    miners: Array<IGetMinersGroupResponse>;

  }

}

export interface IGetUserDataResponse {

  response: {

    user_id: string;

    balance: string:

    first_name: string;

    last_name: string;

    photo: string;

    banned: string;

    shop: {
      
      tetris: string;

      tetris_count: string;

      game_mouse: string;

      game_mouse_count: string;

      gamepad: string;

      gamepad_count: string;

      vr_box: string;

      vr_box_count: string;

      portable_console: string;

      portable_console_count: string;

      console: "0", 
      console_count: string;

      game_pc: string;

      game_pc_count: string;

    };

    birzha: {

      balance: string;

      balance_set: string;

    };

    last_mined: {

      date: string;

      group_id: string;

    };

  };

}

export interface ISendPaymentResponse {

  response: {

    user_id: string;

    amout: number;

    user_id_to: string;

  };

}

export interface IGetTransactionHistoryResponse {

  response: {

    count: number;

    count_day: string;

    items: Array<IGetTransactionHistoryUserResponse>;

  };

}

export interface IGetMerchantResponse {

  response: {

    count_trans_day: number;

   };

}

