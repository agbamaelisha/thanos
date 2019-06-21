import request from 'helpers/request';

const Stock = {
  profile: {},

  stockList: {
    stock: [],
    branch: [],
    stockIDs: [],
    records: [],
    loading: true,

    fetch: () => {
      Stock.stockList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
      }, true).then((res) => {
        const data = res.data.data.data;
        // Stock.stockList.stock = res.data.data.data;
        data.forEach((item) => {
          Stock.stockList.stockIDs.push(item.id);
        });
        return request({
          method: 'POST',
          url: 'api/v1/stock/records/fetch',
          params: {
            'stock-ids': Stock.stockList.stockIDs,
            'types': ['addition'],
          },
        }, true).then((res) => {
          Stock.stockList.records = res.data.data.data;
          return Promise.resolve('Fetch completed');
        });
      });
    },

    filter: (data) => {
      Stock.stockList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/fetch',
        data,
      }, true).then((res) => {
        Stock.stockList.records = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },

    addDipping: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/branch/user',
        data,
      }, true).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
    },
  },
};

export default Stock;
