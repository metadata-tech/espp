function ModalConfirmAction() {
    let self = this;
    let id;
    let id2;
    let action;
    let returnClass;

    this.init = function () {
        $('#btnMcaSubmit').off('click').on('click', function () {
            self.actionConfirm(id, action);
        });
    };

    this.action = function (_id, _returnClass, _action, _id2) {
        if (typeof _id === 'undefined' || _id === '') {
            toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
            return false;
        }
        id = _id;
        if (typeof _id2 === 'undefined' || _id2 === '') {
            id2 = '';
        } else {
            id2 = _id2;
        }
        action = _action;
        returnClass = typeof _returnClass !== 'undefined' ? _returnClass : '';
        $('#modal_confirm_action').modal({backdrop: 'static', keyboard: false});
    };

    this.actionConfirm = function () {
        if (action == 3) {
            returnClass.sendToPenyelia(id);
        }
        if (action == 4) {
            returnClass.sendToQc(id);
        }
        if (action == 5) {
            returnClass.sendToPenyemak(id);
        }
        if (action === 6) {
            returnClass.lulus(id);
        }
        if (action == 9) {
            returnClass.pindaanPembanci(id);
        }
        if (action == 10) {
            returnClass.pindaanPenyelia(id);
        }
        if (action == 11) {
            returnClass.tutupKotak(id);
        }
        if (action === 12) {
            returnClass.qcTukarTk(id);
        }
        if (action === 80) {
            returnClass.actionPenentuanSaizSampel(id);
        }
        if (action === 81) {
            returnClass.actionSemakanKedua(id);
        }
        if (action === 82) {
            returnClass.actionValidasiAsas(id);
        }
        if (action === 83) {
            returnClass.actionValidasiPenyuntingan(id);
        }
        if (action === 84) {
            returnClass.actionSemakanEditspek(id);
        }
        if (action === 85) {
            returnClass.actionLulus(id);
        }
        if (action === 86) {
            returnClass.actionSemakanValidasiAsas(id);
        }
        if (action === 90) {
            returnClass.actionTukarKaedahOde(id);
        }
        if (action === 91) {
            returnClass.actionPadanan(id, id2);
        }
        if (action === 100) {
            returnClass.actionProcessImport(id);
        }
        if (action === 20) {
            returnClass.actionPadan(id);
        }
        if (action === 21) {
            returnClass.actionTidakPadan(id);
        }
        if (action === 22) {
            returnClass.actionTidakPadanSelesai(id);
        }
        if (action === 23) {
            returnClass.actionTidakPadanFasa2(id);
        }
        // returnClass.action(id);
        $('#modal_confirm_action').modal('hide');
    };

    this.init();
}