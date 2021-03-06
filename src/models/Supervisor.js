import request from 'helpers/request';
import toastr from 'toastr';
import BranchModel from 'models/Branch';

const Supervisor = {
  profile: {},

  supervisorList: {
    supervisor: [],
    loading: true,

    fetch: () => {
      Supervisor.supervisorList.loading = true;
      return request({
        url: 'api/v1/branch/fetch-users',
        params: {
          ids: BranchModel.branchList.branchIDs,
        },
      }, true).then((res) => {
        Supervisor.supervisorList.supervisor = res.data.data.data;
        return Promise.resolve('Fetch completed');
      });
    },
  },
  addSupervisor: (data) => {
    return request({
      method: 'POST',
      url: 'api/v1/branch/user',
      data,
    }, true).then((res) => {
      $('#myModal').remove(),
      $('.modal-backdrop').remove();
      $('.modal-open').removeClass();
      toastr.success(res.data.message);
      window.location.reload();
    }).catch((error) => {
      toastr.warning(error.response.data.message);
    });
  },
};

export default Supervisor;
