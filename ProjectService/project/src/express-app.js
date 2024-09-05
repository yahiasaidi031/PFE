const express = require('express');
const cors  = require('cors');
const { project } = require('./api');
const HandleErrors = require('./utils/error-handler')
var path = require('path');


module.exports = async (app,channel) => {
    console.log(path.join(process.cwd(), 'uploads'));
    
    app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //api
    project(app, channel);

    // error handling
    app.use(HandleErrors);
    
}