const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const app = express();
const PORT = 8080;
const SELECT_ALL_USERS = 'SELECT * FROM users';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hkt'
});



connection.connect(err => {
    if(err){
        return err;
    }
});

app.use(cors());

//root
app.get('/', (req, res)=>{
    res.send('go to /users to see users')
});

// add username and password
app.get('/users/add', (req, res) => {
    const {username, password} = req.query;
    const INSERT_USERS = `INSERT INTO users(username, password) VALUES('${username}', '${password}')`
    connection.query(INSERT_USERS, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send('added user')
        }
    });
});

//Login validation
app.get('/users/validation', (req,res)=>{
    const {username, password}=req.query;
    const FIND_USER = 
    `
    SELECT *
    FROM users
    WHERE username='${username}' AND password='${password}'
    `
    connection.query(FIND_USER, (err, results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results // return username
            })
        }
    });
});

// Search for HKT contorl staff details
app.get('/users/hktcs_details', (req,res)=>{
    const {username}=req.query;
    const FIND_USER = 
    `
    SELECT *
    FROM hktcontrolstaffs
    WHERE username='${username}'
    `
    connection.query(FIND_USER, (err, results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results // return username
            })
        }
    });
});

//Search for engineering team details
app.get('/users/et_details', (req,res)=>{
    const {username}=req.query;
    const FIND_USER = 
    `
    SELECT *
    FROM engineeringteams
    WHERE username='${username}'
    `
    connection.query(FIND_USER, (err, results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results // return username
            })
        }
    });
});

// Search for all users
app.get('/users', (req, res)=>{
    connection.query(SELECT_ALL_USERS, (err, results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data: results // return all user info
            })
        }
    });
});

// Search for work items with condition (specific search)
app.get('/workitems/find', (req, res)=>{
    const {field, keyword}=req.query;
    const SELECT_ALL_WI = 
    `
    SELECT * 
    FROM workitems
    WHERE ${field}='${keyword}'
    `
    connection.query(SELECT_ALL_WI, (err, results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data: results // return all user info
            })
        }
    });
});

// search for all orders
app.get('/orders', (req, res)=>{
    const SELECT_ALL_ORDERS = `SELECT * FROM orders;`;
    connection.query(SELECT_ALL_ORDERS, (err, results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data:results // return all order info
            })
        }
    });
});

// search for orders with condition (general search)
app.get('/orders/find', (req, res)=>{
    const {field, keyword}=req.query;
    const SELECT_ORDERS = 
    `
    SELECT * 
    FROM orders
    WHERE ${field} LIKE '${keyword}%'
    `
    connection.query(SELECT_ORDERS, (err, results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data:results
            })
        }
    })
})

// search for orders with condition (specific search)
app.get('/orders/findThe', (req, res)=>{
    const {field, keyword}=req.query;
    const SELECT_ORDERS = 
    `
    SELECT * 
    FROM orders
    WHERE ${field} LIKE '${keyword}'
    `
    connection.query(SELECT_ORDERS, (err, results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data:results
            })
        }
    })
})

// insert quotation
app.get('/quotations/insert', (req,res)=>{
    const {order_number, remarks, submition_date}=req.query;
    
    const INSERT_QUOTATIONS = 
    `
    INSERT INTO quotations
    (order_number, remarks, submition_date) VALUES
    ('${order_number}', '${remarks}', '${submition_date}')
    `
    connection.query(INSERT_QUOTATIONS, (err, results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data:results
            })
        }
    })
})

// insert work item case
app.get('/itemcase/insert', (req,res)=>{
    const {quotation_id, work_item, item_amount}=req.query;
    const INSERT_ITEMCASE = 
    `
    INSERT INTO quotations
    (quotation_id, work_item_id, item_amount) VALUES
    ('${quotation_id}', '${work_item}', '${item_amount}')
    `
    connection.query(INSERT_ITEMCASE, (err, results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.json({
                data:results
            })
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
});