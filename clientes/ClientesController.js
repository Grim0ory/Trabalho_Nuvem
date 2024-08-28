const express = require("express");
const router = express();

router.get("/cliente/novo", (req,res)=>{
    res.render("admin/clientes/novo");
});


module.exports = router;