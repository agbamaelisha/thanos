import request from 'helpers/request';


const Dipping = {
  dippingList: {
    stock: [],
    records: [],
    stockIDs: [],
    branchStockID: [],
    branchStockName: [],
    loading: true,


    init: () => {
      Dipping.dippingList.loading = true;
      return request({
        method: 'POST',
        url: '/api/v1/stock/fetch',
      }, true).then((res) => {
        const data = res.data.data.data;
        Dipping.dippingList.stock = res.data.data.data;
        data.forEach((item) => {
          Dipping.dippingList.stockIDs.push(item.id);
        });
        return request({
          method: 'POST',
          url: 'api/v1/stock/records/fetch',
          params: {
            'stock-ids': Dipping.dippingList.stockIDs,
            'types': ['update'],
          },
        }, true).then((res) => {
          Dipping.dippingList.records = res.data.data.data;
          return Promise.resolve('Fetch completed');
        });
      });
    },

    filter: (data) => {
      Dipping.dippingList.loading = true;
      return request({
        method: 'POST',
        url: 'api/v1/stock/records/fetch',
        data,
      }, true).then((res) => {
        Dipping.dippingList.records = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },


    addDipping: (data) => {
      return request({
        method: 'POST',
        url: 'api/v1/stock/records',
        data,
      }, true).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
    },
  },
};

export default Dipping;
