import { isPositiveNumber, hasDuplicates } from './utils';

export default class CurrencyExchange {
  constructor(data, buyCantorFee = 1.3, sellCantorFee = 1.3){
    this.buyCantorFee = buyCantorFee;
    this.sellCantorFee = sellCantorFee;
    if(!Array.isArray(data)){
      throw new Error('Should be an array!');
    }

    if(data.length===0){
      throw new Error('Should not be empty!');
    }

    if(data.some(item => {
      return !(
        typeof (item.code) === 'string'
        && isPositiveNumber(item.buy)
        && isPositiveNumber(item.sell)
      );
    })){
      throw new Error('Wrong data!');
    }

    if(hasDuplicates(data.map(x => x.code))){
      throw new Error('Has duplicates!');
    }

    this.currencies = data.map(item => item.code);
    this.rates=[];
    data.forEach(item => {
      this.rates[item.code] = {
        buy: item.buy,
        sell: item.sell,
      };
    });
  }

  getCurrencyList(){
    return this.currencies;
  }

  getCurrentRate(code){
    return this.rates[code];
  }

  buy(code, amount){
    this.validateBuyOrSell(code, amount);
    return this.rates[code].buy * amount * this.buyCantorFee;
  }

  sell(code, amount){
    this.validateBuyOrSell(code, amount);
    return this.rates[code].sell * amount * this.sellCantorFee;
  }

  validateBuyOrSell(code, amount) {
    if (!this.getCurrencyList().some(item => item === code)) {
      throw new Error('No such currency!');
    }
    if (!isPositiveNumber(amount)) {
      throw new Error('Amount must be positive number');
    }
  }

  // exchange(fromCode, fromAmount, ToCode) {
  //   return 
  // }

}