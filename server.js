// Configurando servidor
const express = require('express');
const server = express();

// Configurando servidor para aprensentar aqruivos extras
server.use(express.static('public'));

// Habilitando body do formulario
server.use(express.urlencoded( { extended: true } ));

// Configurando conexão com o banco de dados
const { Pool } = require('pg');
const db = new Pool({
	user: 'postgres',
	password: '071627',
	host: 'localhost',
	post: 5432,
	database: 'doe'
});


// Configurando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
	express: server,
	noCache: true,
});



// Configurando apresentação da pagina
server.get('/', (req, res) => {
	db.query("SELECT * FROM donates", (err, result) => {
		const donors = result.rows;

		return res.render('index.html', { donors });
	});
});

// Pegando dados do formulario e cadastrando na lista de donors
server.post('/', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const blood = req.body.blood;


	// Colocando valores dentro do banco de dados
	const query = 
		`INSERT INTO donates ("name", "email", "blood")
		VALUES ($1, $2, $3)`;
	const values = [name, email, blood]
	
	db.query(query, values, (err) => {
		// Se ocorre um erro
		if(err) return res.send('Erro no banco de dados.')

		// Redirecionando para pagina inicial
		return res.redirect('/');
	});

});

// Ligando o servidor e permitindo acesso a porta 3000
server.listen(3000);