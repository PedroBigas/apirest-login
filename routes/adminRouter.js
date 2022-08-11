const express = require("express");
const router = express.Router();

const auth = require('../controllers/authController')

router.get('/', auth, (req,res) => {

    if(req.user.admin){

       res.send('Esse dado so pode ser visto pelo Admin')

} else {
    res.status(401).send('Not Admin: Acesso negado');
}

})

module.exports = router;