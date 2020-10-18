const { ENGINE_METHOD_ALL } = require('constants');

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

//const {Client} = require('pg');
var connect = "postgres://postgres:psql99@localhost/news";
var client = new pg.Client(connect);
client.connect();
//assign dust engine to .dust files
app.engine('dust', cons.dust);

//set default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req, res){
    /*pg.connect(connect, function(err, client){
        if(err){
            return console.error('error fetching client from pool', err);
        }*/
        var query = client.query('SELECT * FROM public.news', function(queryCommandErr, result){
            res.render('index', {news: result.rows});
            //done();
            //res.send(result.rows);
        });
            /*if(queryCommandErr){
                lastError = queryCommandErr;
                return console.error('error running query', queryCommandErr);
            }*/
            
        //});
    //});
});

app.post('/add',function(req,res){
    var query = client.query("INSERT INTO news(title, category, content) VALUES($1,$2,$3)",
    [req.body.title, req.body.category, req.body.content]);
    res.redirect('/');
});

app.delete('/delete/:id', function(req,res){
    var query = client.query("DELETE FROM news WHERE id = $1",
    [req.params.id]);
    res.send(200);
    //res.redirect('/');
});

app.post('/edit', function(req, res){
    var query = client.query("UPDATE news SET title=$1, category=$2, content=$3 WHERE id=$4",
    [req.body.title, req.body.category, req.body.content, req.body.id]);
    res.redirect('/');
});
//server
app.listen(3000, function(){
    console.log('server started on port 3000');
});