var express = require('express')
var app = express()
var proxy = require('http-proxy-middleware');

app.use(express.static(__dirname + '/public'))

//代理
app.use('/api', proxy({
    target: 'https://e.xinrenxinshi.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/api': ''
    },
    headers: {
        Referer: 'https://e.xinrenxinshi.com/index'
    }
}));

app.use('/bapi', proxy({
    target: 'http://api.map.baidu.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/bapi': ''
    },
    headers: {
        Referer: 'http://api.map.baidu.com'
    }
}));

app.get('/wx', function (req, res) {
    res.send('wx');
});



app.listen(3000)