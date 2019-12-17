//	******************************	//
//	Copied from my ICS221 solution	//
//					- Corey			//
//	******************************	//

const express = require('express');
const path = require("path");
const router = express.Router();
const webpage = require('../controllers/webpage');

/* GET home page. */
router.get('/', webpage.renderIndex);

router.get('/image/daitan', (req,res)=>{
    res.sendFile(path.join(__dirname, "../../public/images/daitan2.png"));
});

//router.get('/image/background', (req,res)=>{
//    res.sendFile(path.join(__dirname, "./../../public/images/bg.png"));
//});

router.get('/image/teambold', (req,res)=>{
    res.sendFile(path.join(__dirname, "../../public/images/daitan2.png"));
});

module.exports = router;