/**
 * Created by gaoguoqing on 2019/9/21.
 *
 */
$(function () {
    var navigators = navigator
    if (!isPC()) {
        document.body.setAttribute('id', 'phone')
    }
    // init()
})

function downloadFile (url, type) {
    var elink = document.createElement('a')
    elink.style.display = 'none'
    elink.target = '_block'
    elink.href = url
    if (type === '5') {
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
    } else {
        window.open(url)
    }
}

function download (type) {
    // var fpdm = getQueryVariable('fpdm')
    // var fphm = getQueryVariable('fphm')
    // var rand = getQueryVariable('rand')
    // var kprq = getQueryVariable('kprq')
    var code = getQueryVariable('code');
    if (type == '5') {
        var url = '/web-reader/reader?file=' + code
    } else {
        var url = '/api?action=getDoc&code=' + code + '&type=' + type
    }
    // var url = '/api?action=getDo&fpdm=' + fpdm + '&fphm=' + fphm + '&rand=' + rand + '&kprq=' + kprq + '&type=' + type
    // var url = '/api?action=getDoc&code=' + code + '&type=' + type
    if (!code) {
        warning('500')
    } else {
        downloadFile(url, type)
    }
}

function init () {
    // var fpdm = getQueryVariable('fpdm')
    // var fphm = getQueryVariable('fphm')
    // var rand = getQueryVariable('rand')
    // var kprq = getQueryVariable('kprq')
    showLoading()
    var code = getQueryVariable('code');
    $.ajax({
        type: 'get',
        // url: '/api?action=getDo&fpdm=' + fpdm + '&fphm=' + fphm + '&rand=' + rand + '&kprq=' + kprq + '&type=2',
        url: '/api?action=getDoc&code=' + code + '&type=2',
        dataType: 'json',
        success: function (res) {
            hideLoading()
            if (res.success && res.data && res.data.length) {
                if (res.data[0]['fplx'] === '03') {
                    res.data[0]['fplx'] = "增值税电子专用发票"
                } else {
                    res.data[0]['fplx'] = "增值税电子普通发票"
                }

                dataShow(res.data[0])
            } else {
                warning(res.errorCode, res.errorMsg)
            }
        },
        error: function (e) {
            warning('500', '系统异常')
        }
    })
}

function dataShow (data) {
    var arr = ['fpdm', 'fphm', 'fpzt', 'gfmc', 'gfsbh', 'je', 'kprq', 'xfmc', 'xfsbh', 'fplx']
    for (var i = 0, len = arr.length; i < len; i++) {
        if ($('#' + arr[i]).length) {
            $('#' + arr[i]).html(data[arr[i]])
        }
    }
}

function getQueryVariable (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return ''
}


function isPC () {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function warning (error, msg) {
    window.location.href = 'error.html?errorCode=' + error + '&errorMsg=' + encodeURIComponent(msg)
}

function hideLoading () {
    var popup = document.getElementById('b-loading')
    if (popup) {
        popup.parentNode.removeChild(popup)
        var box = document.getElementById('box')
        box.style.display = 'block'
    }
}

function showLoading () {
    var popup = document.getElementById('b-loading')
    var top = document.getElementById('b-loading-top')
    if (popup || top) {
        hideLoading()
    } else {
        var div = document.createElement('div')
        var box = document.createElement('div')
        var logo = document.createElement('div')
        var content = document.createElement('div')
        div.setAttribute('id', 'b-loading')
        logo.setAttribute('class', 'b-loading-logo')
        box.setAttribute('class', 'b-loading-box')
        div.setAttribute('class', 'b-loading')
        content.setAttribute('class', 'b-loading-content')
        content.innerHTML = '数据加载中...'
        box.appendChild(logo)
        box.appendChild(content)
        div.appendChild(box)
        document.body.appendChild(div)
    }
}