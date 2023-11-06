/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-09-30 11:04:24
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-10-13 18:16:38
 */

$(function () {
    if (!isPC()) {
        document.body.setAttribute('id', 'phone')
    }
    showPdf()
    // init()
})

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
    var code = getQueryVariable('code');
    if (type == '5') {
        var url = '/web-reader/reader?file=' + code
    } else {
        var url = '/api?action=getDoc&code=' + code + '&type=' + type
    }
    if (!code) {
        warning('500')
    } else {
        downloadFile(url, type)
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

function init () {
    showLoading()
    var code = getQueryVariable('code');
    $.ajax({
        type: 'get',
        url: '/api?action=getDoc&code=' + code + '&type=2',
        dataType: 'json',
        success: function (res) {
            hideLoading()
            if (res.success && res.data && res.data.length) {
                showPdf()
            } else {
                warning(res.errorCode, res.errorMsg)
            }
        },
        error: function (e) {
            warning('500', '系统异常')
        }
    })
}

function phoneShow (url) {
    PDFJS.getDocument(url).then(function (pdf) {
        var numPages = pdf.numPages;
        var start = 1;
        renderPage(pdf, numPages, start);
    });

    function renderPage (pdf, numPages, current) {
        pdf.getPage(current++).then(function (page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);
            var canvas = document.createElement("canvas");
            var context = canvas.getContext('2d');
            document.getElementById('phone-pdf-view').appendChild(canvas);
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
            if (current <= numPages) return renderPage(pdf, numPages, current);
        });
    }
}

function showPdf () {
    var code = getQueryVariable('code');
    var url = '/api?action=getDoc&code=' + code + '&type=13'
    html = "<img src='" + url + "' style = 'width:860px; height:600px;' /> "
    $('#pdf_box').html(html)
    // myAjax(url, function (res) {
    //     var html = ''
    //     try {
    //         var blob = new Blob([res.response], { type: 'application/pdf;' })
    //         var src = window.URL.createObjectURL(blob);
    //         html = "<embed id='pdf_viewer' src='" + src + "' type = 'application/pdf' style = 'width:860px; height:600px;' /> "
    //     } catch (e) {
    //         html = "<embed id='pdf_viewer' src='" + url + "' type = 'application/pdf' style = 'width:860px; height:600px;' /> "
    //     } finally {
    //         $('#pdf_box').html(html)
    //     }
    // }, function (error) {
    //     warning(error.errorCode, res.errorMsg)
    //     $('.button').hide()
    // })
}

function myAjax (url, response, error) {
    var xhr = null
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            response && response(this)
        } else {
            error && error(this)
        }
    }
    xhr.send();
}