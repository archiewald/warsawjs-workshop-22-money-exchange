import { isPriceFormat, hasDuplicates } from './utils';

export default class CurrencyExchange {
  constructor(data){
    if(!Array.isArray(data)){
      throw new Error('Should be an array!');
    }

    if(data.length===0){
      throw new Error('Should not be empty!');
    }

    if(data.some(item => {
      return !(
        typeof (item.code) === 'string'
        && isPriceFormat(item.buy)
        && isPriceFormat(item.sell)
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
}