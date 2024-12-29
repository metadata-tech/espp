function TreeRoleMenu () {

    let refAccess;

    this.init = function () {
    };

    this.set = function (_roleId, isAccess) {
        try {
            mzEmptyParams([_roleId]);
            const selector = $('#ulRoleMenu');
            selector.html('');
            mzFetch('main/role/menuList/'+_roleId).then((res) => {
                let html = '';
                let htmlSub = '';
                let access = '';
                for (const row of res) {
                    if (isAccess) {
                        let accessArr = [];
                        for (const i of row['accessArr']) {
                            if (i !== null) {
                                accessArr.push(refAccess[i]['accessName']);
                            }
                        }
                        access = accessArr.join(', ');
                    }
                    if (row['navSecondName'] === null) {
                        if (html !== '') {
                            if (htmlSub !== '') {
                                htmlSub += '</ul>';
                                html += htmlSub;
                            }
                            html += '</li>';
                            selector.append(html);
                            html = '';
                            htmlSub = '';
                        }
                        html += '<li class="mb-2">';
                        html += '<i class="'+row['icon']+' ic-w mx-1"></i>'+row['navName'];
                    } else {
                        if (htmlSub === '') {
                            htmlSub += '<ul class="nested active pl-4">';
                        }
                        if (isAccess && access !== '') {
                            htmlSub += '<li><i class="fa-light fa-folder-open ic-w mr-1"></i>'+row['navSecondName']+' <span class="font-small font-italic">('+access+')</span></li>';
                        } else {
                            htmlSub += '<li><i class="fa-light fa-folder-open ic-w mr-1"></i>'+row['navSecondName']+'</li>';
                        }
                    }
                }
                if (html !== '') {
                    if (htmlSub !== '') {
                        htmlSub += '</ul>';
                        html += htmlSub;
                    }
                    html += '</li>';
                    selector.append(html);
                }
            }).catch(()=>{ toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); });
        } catch (e) { toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR); }
    };

    this.setRefAccess = function (_refAccess) {
        refAccess = _refAccess;
    };
}