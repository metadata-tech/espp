function ModalNotification() {

  const className = "ModalNotification";
  let self = this;
  let formValidate;
  let userId;
  let profile;
  let dtNotification;

  this.init = function () {
    
    dtNotification = $('#dtNotification').DataTable({
      bLengthChange: false,
      bFilter: false,
      bPaginate: false,
      bInfo: false,
      autoWidth: false,
      ordering: false,
      // aaSorting: [[2, 'desc']],
      language: _DATATABLE_LANGUAGE,
      dom: "t",
      drawCallback: function () {
        $('[data-toggle="tooltip"]').tooltip();
      },
      aoColumns: [
        { mData: null, mRender: function (data, type, row, meta) { 
          const isReadNotifikasi = (row['isRead']) ? 'font-weight-500' : 'font-weight-400';
          const isReadDate = (row['isRead']) ? 'text-dark' : 'text-muted';
          return '<p class="' + isReadNotifikasi + ' my-0">' + row['notifikasi'] + '</p>' +
          '<p class="font-smaller ' + isReadDate + ' my-0">' + row['tarikhNotifikasi'] + '</p>';
        }},
      ]
    });

    
  };
  
  this.genTableNotification = function () {
    try {
      const dataNotification = [{
        notifikasi: 'Permohonan PDB perlu dikemaskini', 
        tarikhNotifikasi: '2024-12-08 10:30:55',
        isRead: true
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: true
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      },{
        notifikasi: 'Permohonan PPT perlu disahkan', 
        tarikhNotifikasi: '2024-12-10 10:30:55',
        isRead: false
      }];
      dtNotification.clear().rows.add(dataNotification).draw();
    } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
  };

  this.edit = function (_userId) {
    try {
      mzEmptyParams([_userId]);
      userId = _userId;
      self.genTableNotification();
      $("#ModalNotification").modal({ backdrop: "static", keyboard: false }).scrollTop(0);
    } catch (e) {
      toastr["error"](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
    }
  };

  this.init();
}
