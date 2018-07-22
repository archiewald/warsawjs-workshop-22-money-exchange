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

describe('Buy currency', () => {
  test('Given amount and code should return buy price', () => {
    expect(exchange.buy('EUR', 100)).toEqual(100 * 4 * 1.3);
    expect(new CurrencyExchange([
      {code: 'EUR', buy: 4, sell: 3},
    ], 1.8).buy('EUR', 100)).toEqual(100 * 4 * 1.8);
  });

  test.each([['YEN', 100],
    ['EUR', -100],
    [undefined,undefined]
  ])('Must throw an error for [%p,%p]',(code, amount) => {
    expect(()=> {
      exchange.buy(code,amount);
    }).toThrow();
  });
});

describe('Sell currency', () => {
  test('Given amount and code should return buy price', () => {
    expect(exchange.sell('EUR', 100)).toEqual(100 * 3 * 1.3);
    expect(new CurrencyExchange([
      {code: 'EUR', buy: 4, sell: 3},
    ], undefined, 1.8).sell('EUR', 100)).toEqual(100 * 3 * 1.8);
  });

  test.each([['YEN', 100],
    ['EUR', -100],
    [undefined,undefined]
  ])('Must throw an error for [%p,%p]',(code, amount) => {
    expect(()=> {
      exchange.sell(code,amount);
    }).toThrow();
  });
});

describe('Exchange currency', () => {
  test(`Given [from currency ,from amount, currency to buy]
  should return price`, () => {
    exchange.exchange('EUR','GPB', 100).toEqual(4*1.3/1.3*3.5);
  });
});
