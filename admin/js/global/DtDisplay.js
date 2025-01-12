function DtDisplay () {

    this.getStatus = function (statusName, statusColor) {
        if (statusName === '' || statusColor === '' || statusName === null || statusColor === null) {
            return '';
        }
        return '<div class="chip chip-tag '+statusColor+' white-text z-depth-1">'+statusName+'</div>';
    }

    this.getStatusA = function (statusName, statusColor, isBadge) {
        if (statusName === '' || statusColor === '' || statusName === null || statusColor === null) {
            return '';
        }
        if (typeof isBadge !== 'undefined' && isBadge === true) {
            return '<span class="badge '+statusColor+' z-depth-0 w-100"><i class="fa-regular fa-folder mr-1"></i>'+statusName+'</span>';
        }
        return '<span class="badge badge-pill '+statusColor+' z-depth-0 w-100 text-uppercase">'+statusName+'</span>';
        // return '<div class="chip chip-tag '+statusColor+' white-text z-depth-0 w-100 text-center">'+statusName+'</div>';
    }

    this.getUploadStatus = function (data) {
        let label = '';
        label = '<ul class="fa-ul ml-3_1 mb-0">';
        if (data.length > 0) {
            for (let j=0; j<data.length; j++) {
                label += '<li><span class="fa-li"><i class="fa-duotone fa-circle-exclamation text-danger"></i></span>' + data[j] + '</li>';
            }
        } else {
            label += '<li><span class="fa-li"><i class="fa-duotone fa-circle-check text-success"></i></span>OK</li>';
        }
        label += '</ul>';
        return label;
    }

    this.getUploadAction = function (status, isSkip) {
        const skip = typeof isSkip === 'undefined' ? false : isSkip;
        if (status === 'Mandatori') {
            return '<i class="fa-duotone fa-exclamation-triangle text-danger"></i> '+status;
        } else if (status === 'Tambah') {
            return '<i class="fa-duotone fa-file-circle-plus text-info"></i> <i>add</i>';
        } else if (status === 'Kemaskini') {
            if (skip) {
                return '<i class="fa-duotone fa-ban orange-text"></i> <i>skipped</i>';
            } else {
                return '<i class="fa-duotone fa-file-pen orange-text"></i> <i>edit</i>';
            }
        }
        return status;
    }

    this.getAction = function (type, id, row, flag, flag2) {
        const htmlEdit = '<a data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></a>';
        const htmlDelete = '<a data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular fa-trash-can fa-lg ml-1 '+id+'Remove" id="'+id+'Remove_'+row+'"></i></a>';
        if (type === 0) {
            return htmlEdit;
        } else if (type === 1) {
            return htmlEdit + htmlDelete;
        } else if (type === 2 && typeof flag !== 'undefined') {
            let htmlCheck;
            if (flag === 1) {
                htmlCheck = '<a data-toggle="tooltip" data-placement="top" title="Nyahaktif"><i class="fa-regular fa-user-xmark fa-lg ml-1 '+id+'Deactivate" id="'+id+'Deactivate_'+row+'"></i></a>';
            } else {
                htmlCheck = '<a data-toggle="tooltip" data-placement="top" title="Aktifkan"><i class="fa-regular fa-user-check fa-lg ml-1 '+id+'Activate" id="'+id+'Activate_'+row+'"></i></a>';
            }
            const htmlReset = '<a data-toggle="tooltip" data-placement="top" title="Reset Kata Laluan"><i class="fa-regular fa-unlock-keyhole fa-lg ml-1 '+id+'Reset" id="'+id+'Reset_'+row+'"></i></a>';
            if (flag2 === 1) {
                return htmlEdit + htmlCheck + htmlReset + htmlDelete;
            } else {
                return htmlEdit + htmlCheck + htmlReset;
            }
            // return htmlEdit + htmlCheck + htmlReset + htmlDelete;
        } else if (type === 3) {
            const htmlIr = '<a data-toggle="tooltip" data-placement="top" title="Isi Rumah"><i class="fa-regular fa-house-user fa-lg mr-1 '+id+'Isirumah" id="'+id+'Isirumah_'+row+'"></i></a>';
            return htmlIr + htmlEdit + htmlDelete;
        } else if (type === 4) {
            return '<a data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></a>';
        } else if (type === 5) {
            if (flag === 5 && flag2 !== null) {
                return '<a data-toggle="tooltip" data-placement="top" title="Muat Turun Data Berjaya"><i class="fa-regular fa-download fa-lg green-text '+id+'DownloadSuccess" id="'+id+'DownloadSuccess_'+row+'"></i></a>'
                + '<a data-toggle="tooltip" data-placement="top" title="Muat Turun Data Gagal"><i class="fa-regular fa-download fa-lg red-text ml-1 '+id+'DownloadFail" id="'+id+'DownloadFail_'+row+'"></i></a>';
            }
        } else if (type === 6) {
            return '<a data-toggle="tooltip" data-placement="top" title="Kemaskini Senarai Pegawai"><i class="fa-regular fa-user-pen fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></a>';
        } else if (type === 7) {
            const htmlFilter = '<a data-toggle="tooltip" data-placement="top" title="Tapis"><i class="fa-regular fa-filter fa-lg mr-1 '+id+'Filter" id="'+id+'Filter_'+row+'"></i></a>';
            if (flag) {
                return htmlFilter + '<a data-toggle="tooltip" data-placement="top" title="Tambah Pegawai"><i class="fa-regular fa-user-plus fa-lg red-text '+id+'Add" id="'+id+'Add_'+row+'"></i></a>';
            } else {
                return htmlFilter + '<a data-toggle="tooltip" data-placement="top" title="Kemaskini Pegawai"><i class="fa-regular fa-user-pen fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></a>';
            }
        } else if (type === 8) {
            if (flag) {
                return '<a data-toggle="tooltip" data-placement="top" title="Tambah Pegawai"><i class="fa-regular fa-user-plus fa-lg red-text '+id+'Add" id="'+id+'Add_'+row+'"></i></a>' + htmlDelete;
            } else {
                return htmlEdit + htmlDelete;
            }
        } else if (type === 9) {
            return '<a data-toggle="tooltip" data-placement="top" title="Tapis"><i class="fa-regular fa-filter fa-lg '+id+'Filter" id="'+id+'Filter_'+row+'"></i></a>';
        } else if (type === 10) {
            if (flag) {
                return '<a data-toggle="tooltip" data-placement="top" title="Kemaskini Pegawai"><i class="fa-regular fa-user-plus fa-lg red-text '+id+'Edit" id="'+id+'Edit_'+row+'"></i></a>' + htmlDelete;
            } else {
                return '<a data-toggle="tooltip" data-placement="top" title="Kemaskini Pegawai"><i class="fa-regular fa-user-pen fa-lg '+id+'Add" id="'+id+'Add_'+row+'"></i></a>' + htmlDelete;
            }
        } else if (type === 11) {
            if (flag) {
                return '<a data-toggle="tooltip" data-placement="top" title="Kemaskini Pegawai"><i class="fa-regular fa-user-plus fa-lg red-text '+id+'Edit" id="'+id+'Edit_'+row+'"></i></a>';
            } else {
                return '<a data-toggle="tooltip" data-placement="top" title="Kemaskini Pegawai"><i class="fa-regular fa-user-pen fa-lg '+id+'Add" id="'+id+'Add_'+row+'"></i></a>';
            }
        }
        return null;
    }

    this.getActionAddTk = function (type, id, row, flag, flag2) {
      const htmlAdd = '<a data-toggle="tooltip" data-placement="left" title="Tambah TK"><i class="fa-regular fa-circle-plus fa-lg '+id+'Add" id="'+id+'Add_'+row+'"></i></a>';
      if (type === 1) {
          return htmlAdd;
      }
    }

    this.getActionAddEe = function (type, id, row, flag, flag2) {
      const htmlAdd = '<a data-toggle="tooltip" data-placement="left" title="Tambah Pertubuhan"><i class="fa-regular fa-circle-plus fa-lg '+id+'Add" id="'+id+'Add_'+row+'"></i></a>';
      if (type === 1) {
          return htmlAdd;
      }
    }

    this.getActionPkl = function (type, id, row, flag, flag2) {
      const htmlDistribute = '<a data-toggle="tooltip" data-placement="top" title="Agih Semula"><i class="fa-regular fa-user-pen fa-lg '+id+'Distribute" id="'+id+'Distribute_'+row+'"></i></a>';
      if (type === 1) {
          return htmlDistribute;
      }
    }

    this.getActionAir = function (type, id, row, flag) {
        const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        const htmlRemove = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular mx-0 fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></button>';
        if (type === 'edit') {
            return '<div class="btn-group">' + htmlEdit + htmlRemove + '</div>';
            /* if (flag == '01') {
                return htmlEdit + htmlRemove;
            }
            else {
                return htmlEdit + htmlRemove;
            } */
        }
        else {
            return '<div class="btn-group">' + htmlView + '</div>';
            return '<div class="btn-group">' + htmlView + htmlRemove + '</div>';
        }
        return null;
    }

    this.getActionAirp = function (type, id, row, flag) {
        const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        const htmlRemove = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular mx-0 fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></button>';
        const htmlQc = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semak QC"><i class="fa-regular mx-0 fa-spell-check fa-lg '+id+'Qc" id="'+id+'Qc_'+row+'"></i></button>';
        if (type === 'edit') {
            if (flag == 1) {
                return '<div class="btn-group">' + htmlEdit + htmlRemove + '</div>';
            } else {
              return '<div class="btn-group">' + htmlEdit + htmlRemove + htmlQc + '</div>';
            }
        }
        else {
            return '<div class="btn-group">' + htmlView + '</div>';
        }
        return null;
    }

    this.getActionEksport = function (type, id, row, flag) {
        const htmlDownload = '<a title="Muat Turun"><i class="fa-regular mx-1 fa-download fa-lg '+id+'Download" id="'+id+'Download_'+row+'"></i></a>';
        const htmlProcess = '<a title="Proses Data Baru"><i class="fa-regular mx-1 fa-upload fa-lg '+id+'Process" id="'+id+'Process_'+row+'"></i></a>';
        if (flag === 1) {
            return '<div class="btn-group">' + htmlDownload + '</div>';
            //return '<div class="btn-group">' + htmlDownload + htmlProcess + '</div>';
        } else if (flag === 2) {
            return '<div class="btn-group">' + htmlDownload + '</div>';
        } else {
            return '<div class="btn-group">' + htmlProcess + '</div>';
        }
    }


    this.getActionA = function (type, id, row, flag, flag2) {
        // const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        // const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        // const htmlRemove = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular mx-0 fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></button>';
      
        const htmlEdit = '<a data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></a>';
        const htmlRemove = '<a data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular fa-trash-can fa-lg ml-1 '+id+'Remove" id="'+id+'Remove_'+row+'"></i></a>';
        const htmlView = '<a data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular fa-eye fa-lg ml-1 '+id+'View" id="'+id+'View_'+row+'"></i></a>';

        // const htmlEdit = '<span class="btn-clear '+id+'Edit" data-toggle="tooltip" data-placement="top" title="Kemaskini" id="'+id+'Edit_'+row+'"><i class="fa-regular fa-pen-to-square fa-lg"></i></span>';
        // const htmlView = '<span class="btn-clear '+id+'View" data-toggle="tooltip" data-placement="top" title="Papar" id="'+id+'View_'+row+'"><i class="fa-regular fa-eye fa-lg"></i></span>';
        // const htmlRemove = '<span class="btn-clear '+id+'Remove" data-toggle="tooltip" data-placement="top" title="Hapus" id="'+id+'Remove_'+row+'"><i class="fa-regular fa-trash-can fa-lg"></i></span>';
        if (type === 'edit') {
          if (flag == 1) {
            return '<div class="btn-group px-1">' + htmlEdit + htmlRemove + '</div>';
          } else if (flag == 2) {
            return '<div class="btn-group px-1">' + htmlEdit + '</div>';
          } else {
            return '<div class="btn-group px-1">' + htmlView + '</div>';
          }
        }
        else {
          return '<div class="btn-group px-1">' + htmlView + '</div>';
        }
    }


    this.getActionAc2 = function (type, id, row, flag, flag2, flag3=null) {
        // flag - status borang
        // flag2 - jenis tangkapan
        // flag3 - status icr
        const htmlAc1 = '<span class="btn-clear-2 font-weight-500 '+id+'Ac1" data-toggle="tooltip" data-placement="top" title="Borang AC1" id="'+id+'Ac1_'+row+'">AC1</span>';
        const htmlAc2 = '<span class="btn-clear-2 font-weight-500 '+id+'Ac2" data-toggle="tooltip" data-placement="top" title="Borang AC2" id="'+id+'Ac2_'+row+'">AC2</span>';
        const htmlEdit = '<span class="btn-clear '+id+'Edit" data-toggle="tooltip" data-placement="top" title="Kemaskini Borang AC2" id="'+id+'Edit_'+row+'"><i class="fa-regular fa-pen-to-square fa-lg"></i></span>';
        const htmlView = '<span class="btn-clear '+id+'View" data-toggle="tooltip" data-placement="top" title="Papar" id="'+id+'View_'+row+'"><i class="fa-regular fa-eye fa-lg"></i></span>';
        const htmlCheck = '<span class="btn-clear '+id+'Check" data-toggle="tooltip" data-placement="top" title="Carian ICR" id="'+id+'Check_'+row+'"><i class="fa-regular fa-magnifying-glass fa-lg"></i></span>';
        const htmlChange = '<span class="btn-clear '+id+'Change" data-toggle="tooltip" data-placement="top" title="Tukar Kaedah" id="'+id+'Change_'+row+'"><i class="fa-regular fa-right-left fa-lg"></i></span>';
        const htmlLog = '<span class="btn-clear '+id+'Log" data-toggle="tooltip" data-placement="top" title="Log Pergerakan" id="'+id+'Log_'+row+'"><i class="fa-regular fa-clock-rotate-left fa-lg"></i></span>';
        const htmlExcel = '<span class="btn-clear '+id+'Excel" data-toggle="tooltip" data-placement="top" title="Muatnaik Excel" id="'+id+'Excel_'+row+'"><i class="fa-regular fa-upload fa-lg"></i></span>';
        if (type === 1) {
            if (flag2 === 'ODE') {
              if (flag === 12 || flag === 3) {
                  return '<div class="btn-group">' + htmlView + htmlLog + '</div>';
              } else {
                  return '<div class="btn-group">' + htmlEdit + htmlLog + '</div>';
              }
            } else if (flag2 === 'ICR') {
              if (flag != 1) {
                if (flag === 12) {
                    return '<div class="btn-group">' + htmlView + htmlLog + '</div>';
                } else {
                  if (flag3 == 1 || flag3 == 3 || flag3 == 5) {
                    return '<div class="btn-group">' + htmlEdit + htmlLog + '</div>';
                  } else if (flag3 == 2) {
                    return '<div class="btn-group">' + htmlCheck + htmlChange + '</div>';
                  } else {
                    return '';
                  }
                }
              } else {
                if (flag3 == 3 || flag3 == 5) {
                  return '<div class="btn-group">' + htmlEdit + htmlLog + '</div>';
                } else if (flag3 == 2) {
                  return '<div class="btn-group">' + htmlCheck + htmlChange + '</div>';
                } else {
                  return '';
                }
              }
            } else if (flag2 === 'Excel') {
              if (flag != 1) {
                if (flag === 12 || flag === 3) {
                    return '<div class="btn-group">' + htmlView + htmlLog + '</div>';
                } else {
                    return '<div class="btn-group">' + htmlEdit + htmlLog + '</div>';
                }
              } else {
                  return '<div class="btn-group">' + htmlExcel + htmlLog + '</div>';
              }
            } else {
                return '<div class="btn-group">' + htmlView + htmlLog + '</div>';
            }
        }
        else {
            return '<div class="btn-group">' + htmlView + htmlLog + '</div>';
        }
    }

    this.getActionKotak = function (type, id, row, flag) {
        const htmlEdit = '<span class="btn-clear mzTooltip" data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></span>';
        const htmlAmend = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular mx-0 fa-memo-circle-check fa-lg '+id+'Amend" id="'+id+'Amend_'+row+'"></i></span>';
        const htmlLog = '<span class="btn-clear mzTooltip" data-toggle="tooltip" data-placement="top" title="Log"><i class="fa-regular mx-0 fa-clock-rotate-left fa-lg '+id+'Log" id="'+id+'Log_'+row+'"></i></span>';
        const htmlClose = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Tutup"><i class="fa-regular mx-0 fa-box-check fa-lg '+id+'Close" id="'+id+'Close_'+row+'"></i></span>';
        const htmlCheck = '<span class="btn-clear mzTooltip" data-toggle="tooltip" data-placement="top" title="Semak"><i class="fa-regular mx-0 fa-pen-field fa-lg '+id+'Check" id="'+id+'Check_'+row+'"></i></span>';
        const htmlPrintLabel = '<span class="btn-clear mzTooltip" data-toggle="tooltip" data-placement="top" title="Cetak Label Kotak"><i class="fa-regular mx-0 fa-print fa-lg '+id+'PrintLabel" id="'+id+'PrintLabel_'+row+'"></i></span>';
        const htmlPrintInlist = '<span class="btn-clear mzTooltip" data-toggle="tooltip" data-placement="top" title="Cetak Inlist Kotak"><i class="fa-regular mx-0 fa-print-magnifying-glass fa-lg '+id+'PrintInlist" id="'+id+'PrintInlist_'+row+'"></i></span>';
        const htmlSendPenyelia = '<span class="btn-clear mzTooltip" data-toggle="tooltip" data-placement="top" title="Hantar ke Penyelia"><i class="fa-regular mx-0 fa-circle-arrow-right fa-lg '+id+'SendPenyelia" id="'+id+'SendPenyelia_'+row+'"></i></span>';
        const htmlSendPenyeliaPenyemak = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hantar ke Penyelia"><i class="fa-regular mx-0 fa-circle-arrow-right fa-lg '+id+'SendPenyeliaPenyemak" id="'+id+'SendPenyeliaPenyemak_'+row+'"></i></span>';
        const htmlSendPenguasaDaerah = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hantar ke Penguasa Daerah"><i class="fa-regular mx-0 fa-circle-arrow-right fa-lg '+id+'SendPenguasaDaerah" id="'+id+'SendPenguasaDaerah_'+row+'"></i></span>';
        const htmlSendProsesan = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hantar ke Prosesan"><i class="fa-regular mx-0 fa-circle-arrow-right fa-lg '+id+'SendProsesan" id="'+id+'SendProsesan_'+row+'"></i></span>';
        const htmlAgih = '<span class="btn-clear mzTooltip" data-toggle="tooltip" data-placement="top" title="Agih"><i class="fa-regular mx-0 fa-user-pen fa-lg '+id+'Agih" id="'+id+'Agih_'+row+'"></i></span>';
        const htmlComplete = '<span class="btn-clear mzTooltip" data-toggle="tooltip" data-placement="top" title="Pengarkiban"><i class="fa-regular mx-0 fa-box-archive fa-lg '+id+'Complete" id="'+id+'Complete_'+row+'"></i></span>';
        if (type === 1) {
            if (flag === 1) {
                return '<div class="btn-group mx-2">' + htmlEdit + htmlPrintLabel + htmlPrintInlist + htmlSendPenyelia + '</div>';
            } else if (flag === 6) {
                return '<div class="btn-group mx-2">' + htmlCheck + htmlEdit + htmlLog + htmlPrintLabel + htmlPrintInlist + '</div>';
            } else if (flag === 2) {
                return '<div class="btn-group mx-2">' + htmlCheck + htmlLog + htmlPrintInlist + '</div>';
            } else if (flag === 3) {
                return '<div class="btn-group mx-2">' + htmlCheck + htmlLog + htmlPrintInlist + '</div>';
            } else if (flag === 4) {
                return '<div class="btn-group mx-2">' + htmlCheck + htmlLog + htmlPrintInlist + '</div>';
            } else if (flag === 5) {
                return '<div class="btn-group mx-2">' + htmlCheck + htmlLog + htmlPrintInlist + '</div>';
            } else if (flag === 7) {
                return '<div class="btn-group mx-2">' + htmlCheck + htmlLog + htmlPrintInlist + '</div>';
            } else if (flag === 99) {
                return '<div class="btn-group mx-2">' + htmlPrintLabel + '</div>';
            }  else {
                return '';
            }
        } else if (type === 2) {
          if (flag === 8) {
              return '<div class="btn-group mx-2">' + htmlCheck + htmlLog + htmlPrintInlist + '</div>';
          } else if (flag === 9 || flag === 10 || flag === 11 || flag === 12) {
              return '<div class="btn-group mx-2">' + htmlAgih + htmlLog + htmlPrintInlist + '</div>';
          } else if (flag === 14) {
              return '<div class="btn-group mx-2">' + htmlComplete + htmlLog + htmlPrintInlist + '</div>';
          } else if (flag === 15) {
              return '<div class="btn-group mx-2">' + htmlLog + htmlPrintLabel + htmlPrintInlist + '</div>';
          } else if (flag === 99) {
              return '<div class="btn-group mx-2">' + htmlPrintLabel + '</div>';
          } else {
              return '';
          }
        } else if (type === 3) {
            return '<div class="btn-group mx-2">' + htmlLog + htmlPrintLabel + htmlPrintInlist + '</div>';
      }
        else {
            return '';
        }
    }

    this.getActionBorang = function (type, id, row, flag) {
        const htmlAc1 = '<span class="btn-clear font-weight-500 text-info" data-toggle="tooltip" data-placement="top" title="Borang AC1" '+id+'Ac1" id="'+id+'Ac1_'+row+'">AC1</span>';
        const htmlAc2 = '<span class="btn-clear font-weight-500 text-default" data-toggle="tooltip" data-placement="top" title="Borang AC2" '+id+'Ac2" id="'+id+'Ac2_'+row+'">AC2</span>';
        if (type === 'edit') {
            return '<div class="btn-group">' + htmlAc1 + htmlAc2 + '</div>';
        }
        else {
            return '<div class="btn-group"></div>';
        }
    }

    this.getActionBorangKotak = function (type, id, row, flag) {
        const htmlEdit = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" data-trigger="hover" title="Kemaskini"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></span>';
        const htmlView = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" data-trigger="hover" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></span>';
        const htmlRemove = '<span class="btn-clear" title="Hapus"><i class="fa-regular mx-0 fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></span>';
        const htmlSemak = '<span class="btn-clear" title="Disemak"><i class="fa-regular mx-0 fa-circle-check fa-lg '+id+'Semak" id="'+id+'Semak_'+row+'"></i></span>';
        const htmlPinda = '<span class="btn-clear" title="Pindaan"><i class="fa-regular mx-0 fa-circle-xmark fa-lg '+id+'Pinda" id="'+id+'Pinda_'+row+'"></i></span>';
        const htmlTiada = '<span class="btn-clear" title="Tiada Borang Fizikal"><i class="fa-regular mx-0 fa-circle-xmark fa-lg '+id+'Tiada" id="'+id+'Tiada_'+row+'"></i></span>';
        const htmlSilap = '<span class="btn-clear" title="Kesilapan ID"><i class="fa-regular mx-0 fa-circle-exclamation fa-lg '+id+'Silap" id="'+id+'Silap_'+row+'"></i></span>';
        if (type === 'edit') {
            if (flag === 1) {
                return '<div class="btn-group">' + htmlPinda + '</div>';
            } else if (flag === 2 || flag === 3 || flag === 4) {
                return '<div class="btn-group">' + htmlSemak + '</div>';
            } else if (flag === null || flag === 0) {
                return '<div class="btn-group">' + htmlPinda + htmlSemak + '</div>';
            } else {
                return '';
            }
        } else if (type === 'editProsesan') {
            if (flag === 1) {
                return '<div class="btn-group">' + htmlTiada + htmlSilap + '</div>';
            } else if (flag === 3) {
                return '<div class="btn-group">' + htmlSilap + htmlSemak + '</div>';
            } else if (flag === 4) {
                return '<div class="btn-group">' + htmlTiada + htmlSemak + '</div>';
            } else if (flag === null || flag === 0) {
                return '<div class="btn-group">' + htmlTiada + htmlSilap + htmlSemak + '</div>';
            } else {
                return '';
            }
        }
        else {
            return '<div class="btn-group">' + htmlRemove + '</div>';
        }
    }

    this.getActionSectionAc2 = function (type, id, row) {
        const htmlEdit = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></span>';
        const htmlView = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></span>';
        const htmlRemove = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular mx-0 fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></span>';
        if (type === 'edit') {
            return '<div class="btn-group">' + htmlEdit + htmlRemove + '</div>';
        }
        else {
            return '<div class="btn-group">' + htmlView + '</div>';
        }
    }

    this.getActionQc = function (type, id, row, flag, flag2, flag3) {
        const htmlEdit = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></span>';
        const htmlCheckPenyelia = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semakan Penyelia"><i class="fa-regular mx-0 fa-pen-field fa-lg '+id+'CheckPenyelia" id="'+id+'CheckPenyelia_'+row+'"></i></span>';
        const htmlCheckPenyemak = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semakan Penyemak"><i class="fa-regular mx-0 fa-pen-field fa-lg '+id+'CheckPenyemak" id="'+id+'CheckPenyemak_'+row+'"></i></span>';
        const htmlView = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></span>';
        const htmlResult = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini Kod Respon"><i class="fa-regular mx-0 fa-clipboard fa-lg '+id+'Result" id="'+id+'Result_'+row+'"></i></span>';
        const htmlSend = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hantar"><i class="fa-regular mx-0 fa-circle-arrow-right fa-lg '+id+'Send" id="'+id+'Send_'+row+'"></i></span>';
        const htmlRemove = '<span class="btn-clear" data-toggle="tooltip" data-placement="top" title="Pohon Tukar TK"><i class="fa-regular mx-0 fa-shop-slash fa-lg '+id+'Replace" id="'+id+'Replace_'+row+'"></i></span>';
        // Penyemak - Isi Rumah
        if (type === 1) {
            if (flag === '1') {
                return '<div class="btn-group">' +htmlRemove + '</div>';
            } else if (flag === '2') {
                return '<div class="btn-group">' +htmlRemove+htmlResult + '</div>';
            } else if (flag === '3') {
                //if (flag2 === 1 ) {
                   return '<div class="btn-group">' + htmlResult + htmlEdit + '</div>';
                //} else {
                    //return '<div class="btn-group">' + htmlResult + htmlSend + '</div>';
                //}
            }
            else {
                return '<div class="btn-group">' + htmlView + '</div>';
            }
        }
        // Penyelia - Isi Rumah
        else if (type === 2) {
            if (flag === '4') { return '<div class="btn-group">' + htmlCheckPenyelia + '</div>'; }
            else { return '<div class="btn-group">' + htmlView + '</div>'; }
        }
        else { return null; }
    }

    this.getActionRkl = function (type, id, row, flag, flag2, flag3) {
        const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini RKL"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        const htmlCheckPenyelia = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semakan Penyelia"><i class="fa-regular mx-0 fa-pen-field fa-lg '+id+'CheckPenyelia" id="'+id+'CheckPenyelia_'+row+'"></i></button>';
        const htmlCheckPenyemak = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semakan Penyemak"><i class="fa-regular mx-0 fa-pen-field fa-lg '+id+'CheckPenyemak" id="'+id+'CheckPenyemak_'+row+'"></i></button>';
        const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        const htmlResult = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini Kod Respon"><i class="fa-regular mx-0 fa-clipboard fa-lg '+id+'Result" id="'+id+'Result_'+row+'"></i></button>';
        const htmlResultView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kod Respon"><i class="fa-regular mx-0 fa-clipboard fa-lg '+id+'Result" id="'+id+'Result_'+row+'"></i></button>';
        const htmlSend = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hantar"><i class="fa-regular mx-0 fa-circle-arrow-right fa-lg '+id+'Send" id="'+id+'Send_'+row+'"></i></button>';
        const htmlLocation = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini Alamat"><i class="fa-regular mx-0 fa-location-dot fa-lg '+id+'Location" id="'+id+'Location_'+row+'"></i></button>';
        const htmlAddIr = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Tambah IR Baru"><i class="fa-regular mx-0 fa-circle-plus fa-lg '+id+'AddIr" id="'+id+'AddIr_'+row+'"></i></button>';
        const htmlRemove = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular mx-0 fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></button>';
        // Pembanci - Isi Rumah
        if (type === 1) {
            if (flag === 1) {
                if (flag3) { return '<div class="btn-group">' + htmlResult + htmlRemove; } else { return '<div class="btn-group">' + htmlResult; }
            }
            else if (flag === 2 || flag === 9) {
                if ((flag2 >= 1 && flag2 <= 5) || flag2 == 9 || flag2 == 10) { 
                  return '<div class="btn-group">' + htmlResult + htmlEdit + '</div>'; 
                } else if (flag2 >= 6 && flag2 <= 8) { 
                  return '<div class="btn-group">' + htmlResult + htmlEdit + '</div>'; 
                  // return '<div class="btn-group">' + htmlResult + htmlSend + htmlEdit + '</div>'; 
                }
                else { 
                  return '<div class="btn-group">' + htmlResult + '</div>'; 
                }
            }
            else {
                return '<div class="btn-group">' + htmlView + '</div>';
            }
        }
        // Penyelia - Isi Rumah
        else if (type === 2) {
            if (flag === 3 || flag === 10 || flag === 11) { return '<div class="btn-group">' + htmlCheckPenyelia + '</div>'; }
            else { return '<div class="btn-group">' + htmlView + '</div>'; }
        }
        // Penyemak - Isi Rumah
        else if (type === 5) {
            if (flag === 5) { return '<div class="btn-group">' + htmlCheckPenyemak + '</div>'; }
            else { return '<div class="btn-group">' + htmlView + '</div>'; }
        }
        // Pembanci - Pertubuhan
        else if (type === 3) {
            if (flag === 1) {
                if (flag3) { return '<div class="btn-group">' + htmlResult + htmlRemove; } else { return '<div class="btn-group">' + htmlResult; }
            }
            else if (flag === 2 || flag === 9) {
                if (flag2 == 11) { return '<div class="btn-group">' + htmlResult + htmlEdit + '</div>'; }
                else if (flag2 >= 12 && flag2 <= 60) { return '<div class="btn-group">' + htmlResult + htmlSend + '</div>'; }
                else { return '<div class="btn-group">' + htmlResult + '</div>'; }
            }
            else { return '<div class="btn-group">' + htmlView + '</div>'; }
        }
        // Penyelia - Pertubuhan
        else if (type === 4) {
            if (flag === 3) { return '<div class="btn-group">' + htmlResultView + htmlCheckPenyelia + '</div>'; }
            else { return '<div class="btn-group">' + htmlView + '</div>'; }
        }
        // Penyemak - Pertubuhan
        else if (type === 6) {
            if (flag === 5) { return '<div class="btn-group">' + htmlCheckPenyemak + '</div>'; }
            else { return '<div class="btn-group">' + htmlView + '</div>'; }
        }
        else { return null; }
    }

    this.getActionPlb = function (type, id, row, flag, flag2, flag3) {
        const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini PLB"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        const htmlCheckPenyelia = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semakan Penyelia"><i class="fa-regular mx-0 fa-pen-field fa-lg '+id+'CheckPenyelia" id="'+id+'CheckPenyelia_'+row+'"></i></button>';
        const htmlCheckPenyemak = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semakan Penyemak"><i class="fa-regular mx-0 fa-pen-field fa-lg '+id+'CheckPenyemak" id="'+id+'CheckPenyemak_'+row+'"></i></button>';
        const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        const htmlResult = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini Kod Respon"><i class="fa-regular mx-0 fa-clipboard fa-lg '+id+'Result" id="'+id+'Result_'+row+'"></i></button>';
        const htmlRemove = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular mx-0 fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></button>';
        const htmlSend = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hantar"><i class="fa-regular mx-0 fa-circle-arrow-right fa-lg '+id+'Send" id="'+id+'Send_'+row+'"></i></button>';
        const htmlLog = '<span class="btn-clear '+id+'Log" data-toggle="tooltip" data-placement="top" title="Log Pergerakan" id="'+id+'Log_'+row+'"><i class="fa-regular fa-clock-rotate-left fa-lg"></i></span>';
        const htmlNote = '<span class="btn-clear '+id+'Note" data-toggle="tooltip" data-placement="top" title="Catatan Penyelia" id="'+id+'Note_'+row+'"><i class="fa-regular fa-note-sticky fa-lg"></i></span>';
        
        /* Penyemak PLB */
        if (type == 85) {
            if (flag === 1) {
                if (flag3) { return '<div class="btn-group">' + htmlResult + htmlRemove; } else { return '<div class="btn-group">' + htmlResult; }
            } else if (flag === 2 || flag === 4) {
              if ((flag2 >= 1 && flag2 <= 5) || flag2 == 8 || flag2 == 9 || flag2 == 10) { 
                if (flag === 4) {
                  return '<div class="btn-group">' + htmlResult + htmlEdit + htmlLog + htmlNote + '</div>';
                } else {
                  return '<div class="btn-group">' + htmlResult + htmlEdit + htmlLog + '</div>';
                }
              } else if (flag2 == 6 || flag2 == 7) { 
                if (flag === 4) {
                  return '<div class="btn-group">' + htmlResult + htmlSend + htmlLog + htmlNote + '</div>'; 
                } else {
                  return '<div class="btn-group">' + htmlResult + htmlSend + htmlLog + '</div>'; 
                }
              }
              else { 
                return '<div class="btn-group">' + htmlResult + '</div>'; 
              }
            } else {
                return '<div class="btn-group">' + htmlView + htmlLog + '</div>';
            }
        } 
        /* Penyelia PLB */
        else if (type == 84) {
            if (flag >= 2) {
                if (flag === 3) {
                    return '<div class="btn-group">' + htmlResult + htmlCheckPenyelia + htmlLog + '</div>';
                } else {
                    return '<div class="btn-group">' + htmlView + htmlLog + '</div>';
                }
            }
            else {
                return '<div class="btn-group">' + htmlView + '</div>';
            }
        }
        else {
          return '<div class="btn-group">' + htmlView + '</div>';
        }
    }

    this.getActionPlbFasa2 = function (type, id, row, flag, flag2) {
        const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Penyesuaian PLB"><i class="fa-regular mx-0 fa-pen-to-square fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        const htmlCheckPenyelia = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semakan Penyelia"><i class="fa-regular mx-0 fa-pen-field fa-lg '+id+'CheckPenyelia" id="'+id+'CheckPenyelia_'+row+'"></i></button>';
        const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        const htmlResult = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Kemaskini Kod Respon"><i class="fa-regular mx-0 fa-clipboard fa-lg '+id+'Result" id="'+id+'Result_'+row+'"></i></button>';
        const htmlRemove = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hapus"><i class="fa-regular mx-0 fa-trash-can fa-lg '+id+'Remove" id="'+id+'Remove_'+row+'"></i></button>';
        const htmlSend = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Hantar"><i class="fa-regular mx-0 fa-circle-arrow-right fa-lg '+id+'Send" id="'+id+'Send_'+row+'"></i></button>';
        const htmlLog = '<span class="btn-clear '+id+'Log" data-toggle="tooltip" data-placement="top" title="Log Pergerakan" id="'+id+'Log_'+row+'"><i class="fa-regular fa-clock-rotate-left fa-lg"></i></span>';
        const htmlNote = '<span class="btn-clear '+id+'Note" data-toggle="tooltip" data-placement="top" title="Catatan Penyelia" id="'+id+'Note_'+row+'"><i class="fa-regular fa-note-sticky fa-lg"></i></span>';
        
        /* Pembanci PLB */
        if (type == 88) {
            if (flag == 1 || flag == 2) {
              return '<div class="btn-group">' +  htmlEdit + htmlLog + '</div>';
            } else if (flag == 4) {
              return '<div class="btn-group">' +  htmlEdit + htmlLog + htmlNote + '</div>';
            } else {
              return '<div class="btn-group">' +  htmlView + htmlLog + '</div>';
            }
        } 
        /* Penyelia PLB */
        if (type == 89) {
            if (flag == 3 || flag == 5) {
              return '<div class="btn-group">' +  htmlCheckPenyelia + htmlLog + '</div>';
            } else {
              return '<div class="btn-group">' +  htmlView + htmlLog + '</div>';
            }
        } 
        else {
          return '<div class="btn-group">' + htmlView + '</div>';
        }
    }


    this.getActionPlbPadanan = function (type, id, row, flag) {
        const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Padanan PLB"><i class="fa-regular mx-0 fa-spell-check fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        const htmlLog = '<span class="btn-clear '+id+'Log" data-toggle="tooltip" data-placement="top" title="Log Pergerakan" id="'+id+'Log_'+row+'"><i class="fa-regular fa-clock-rotate-left fa-lg"></i></span>';
        const htmlReview = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Semak Padanan"><i class="fa-regular mx-0 fa-user-check fa-lg '+id+'Review" id="'+id+'Review_'+row+'"></i></button>';
        
        if (flag === 6) {
          if (type == 90) {
            return '<div class="btn-group">' + htmlEdit + htmlLog + '</div>'; 
            // return '<div class="btn-group">' + htmlView + htmlLog + '</div>';
          } else {
            return '<div class="btn-group">' + htmlEdit + htmlLog + '</div>'; 
          }
        } else if (flag === 8) {
          if (type == 90) {
            return '<div class="btn-group">' + htmlReview + htmlLog + '</div>'; 
          } else {
            return '<div class="btn-group">' + htmlView + htmlLog + '</div>'; 
          }
        } else {
          return '<div class="btn-group">' + htmlView + htmlLog + '</div>'; 
        }
    }

    this.getActionAirPadanan = function (type, id, row, flag) {
        const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Padanan"><i class="fa-regular mx-0 fa-spell-check fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar Padanan"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        
        if (type === 'edit') {
          return '<div class="btn-group">' + htmlEdit + htmlView + '</div>'; 
        } else {
          return '<div class="btn-group">' + htmlView + '</div>'; 
        }
    }

    this.getActionAir2 = function (type, id, row, flag) {
        const htmlEdit = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Penyesuaian"><i class="fa-regular mx-0 fa-spell-check fa-lg '+id+'Edit" id="'+id+'Edit_'+row+'"></i></button>';
        const htmlView = '<button class="btn-clear" data-toggle="tooltip" data-placement="top" title="Papar"><i class="fa-regular mx-0 fa-eye fa-lg '+id+'View" id="'+id+'View_'+row+'"></i></button>';
        
        if (type === 'edit') {
          return '<div class="btn-group">' + htmlEdit + '</div>'; 
        } else {
          return '<div class="btn-group">' + htmlView + '</div>'; 
        }
    }

    this.getListComma = function (data, ref, refName) {
        if (Object.keys(ref).length > 0 && data !== null) {
            let arr = data.split(',');
            let str = '';
            for (let i=0; i<arr.length; i++) {
                str += ref[arr[i]][refName];
                if (i < arr.length-1) {
                    str += ', ';
                }
            }
            return str;
        }
        return null;
    }
    
    this.getListArray = function (data) {
        if (data.length === 0 || data[0] === null) {
            return null;
        }
        let label = '<ul class="pl-3 mb-1">';
        for (const row of data) {
            label += '<li>' + row + '</li>';
        }
        return label + '</ul>';
    }

    this.getListArrayRef = function (data, ref, refName) {
        let newArr = [];
        if (data === null) {
            return null;
        }
        for (const row of data) {
            if (row !== null) {
                newArr.push(row);
            }
        }
        if (newArr.length === 0) {
            return null;
        } else if (newArr.length === 1) {
            return newArr[0] === null ? null : ref[newArr[0]][refName];
        }
        let label = '<ul class="pl-3 mb-1">';
        for (const row of newArr) {
            if (row !== null) {
                label += '<li>' + ref[row][refName] + '</li>';
            }
        }
        return label + '</ul>';
    }

    this.getListArrayObj = function (data, id, ref, refName) {
        let newArr = [];
        for (const row of data) {
            if (row[id] !== null) {
                newArr.push(row[id]);
            }
        }
        if (newArr.length === 0) {
            return null;
        } else if (newArr.length === 1) {
            if (typeof ref[newArr[0]] == 'object') {
                return ref[newArr[0]][refName];
            } else {
                return null;
            }
        }
        let label = '<ul class="pl-3 mb-1">';
        for (const row of newArr) {
            label += '<li>' + ref[row][refName] + '</li>';
        }
        return label + '</ul>';
    }
}