const express = require('express');
const { loginuser } = require('../Controller/controller');

const router = express.Router();
router.post('/login',loginuser);
module.exports= router;
