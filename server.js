// Configurando servidor
const express = require('express');
const server = express();

// Configurando servidor para aprensentar aqruivos extras

// Configurando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
	express: server
});

// Configurando apresentação da pagina
server.get('/', function (req, res){
	return res.render('index.html');
});

// Escohendo porta
server.listen(3000);