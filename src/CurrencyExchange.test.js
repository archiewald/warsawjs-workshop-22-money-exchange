import CurrencyExchange from './CurrencyExchange';

let exchange;

beforeEach(() => {
  exchange = new CurrencyExchange([
    {code: 'EUR', buy: 4, sell: 3},
    {code: 'GBP', buy: 4.5, sell: 3.5},
  ]);
});

test('CurrencyExchange should be a class', () => {
  expect(CurrencyExchange.toString()).toContain('class');
});

describe('getCurrencyList', () => {
  test('getCurrencyList jest funkcja', () => {
    expect(typeof exchange.getCurrencyList).toEqual('function');
  });

  test('Currency Exchange.getCurrencyList returns currencies list', () => {
    expect(exchange.getCurrencyList()).toEqual(['EUR','GBP']);
  });
});

describe('getCurrentRate', () => {
  test('getCurrentRate jest funkcja', () => {
    expect(typeof exchange.getCurrentRate).toEqual('function');
  });

  test('returns exchange rate for given currency', () => {
    expect(exchange.getCurrentRate('EUR')).toEqual({buy:4, sell:3});
  });
});

describe('constructor error handling', () => {
  test('Must be an array', () => {
    expect(() => {
      new CurrencyExchange('not an array');
    }).toThrow();
    expect(() => {
      new CurrencyExchange(undefined);
    }).toThrow();
  });
  test('Each should have right data', () => {
    expect(() => {
      new CurrencyExchange([
        {code: 'EUR', buy: '4.5', sell: 3},
        {code: 'GBP', buy: 4.5, sell: 3.5},
      ]);
    }).toThrow();
    expect(() => {
      new CurrencyExchange([
        {code: 'EUR', sell: 3},
        {code: 'GBP', buy: 4.5, sell: 3.5},
      ]);
    }).toThrow();
    expect(() => {
      new CurrencyExchange([
        {code: 'EUR', buy: -3.5, sell: 3},
        {code: 'GBP', buy: 4.5, sell: 3.5},
      ]);
    }).toThrow();
  });
  test('Should not have duplicates', () => {
    expect(() => {
      new CurrencyExchange([
        {code: 'EUR', buy: 3.5, sell: 3},
        {code: 'EUR', buy: 4.5, sell: 3.5},
      ]);
    }).toThrow();
  });
  test('Should not be empty', () => {
    expect(() => {
      new CurrencyExchange([]);
    }).toThrow();
  });
});
