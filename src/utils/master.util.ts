import { Currency } from 'src/entities/currency.entity';
import { Language } from 'src/entities/language.entity';

export const createLanguageData = () => {
  const data = [
    {
      id: 1,
      name: 'English',
      code: 'en',
    },
    {
      id: 2,
      name: 'Chinese',
      code: 'zh',
    },
    {
      id: 3,
      name: 'Khmer',
      code: 'km',
    },
    {
      id: 4,
      name: 'Hindi',
      code: 'hn',
    },
  ];

  data.map(async (ln) => {
    const l = await Language.findOne({
      where: {
        code: ln.code,
      },
    });
    if (!l) {
      const newL = new Language();
      newL.name = ln.name;
      newL.code = ln.code;
      await newL.save();
    }
  });
};

export const createCurrencyData = () => {
  const data = [
    {
      id: 1,
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
    },
    {
      id: 2,
      name: 'Cambodian Riyal',
      code: 'KHR',
      symbol: '៛',
    },
    {
      id: 3,
      name: 'Indian Rupee',
      code: 'INR',
      symbol: '₹',
    },
  ];

  data.map(async (cu) => {
    const oC = await Currency.findOne({
      where: {
        code: cu.code,
      },
    });
    if (!oC) {
      const c = new Currency();
      c.name = cu.name;
      c.code = cu.code;
      c.symbol = cu.symbol;
      await c.save();
    }
  });
};
