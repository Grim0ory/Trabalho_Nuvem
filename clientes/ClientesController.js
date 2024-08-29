const express = require("express");
const Cliente = require("./Cliente");
const router = express();

router.get("/cliente/lista", (req,res)=>{
    Cliente.findAll().then(clientes=>{
        res.render("admin/clientes/lista", {clientes: clientes});
    });
});


router.get("/cliente/novo", (req,res)=>{
    res.render("admin/clientes/novo");
});

router.post("/cliente/save", (req, res)=>{
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var data = req.body.data;
    var email = req.body.email;
    
    Cliente.findOne({
        where: {
            cpf: cpf
        }
    }).then(cliente=>{
        if(cliente == undefined){
            Cliente.create({
                nome: nome,
                cpf: cpf,
                data: data,
                email: email
            }).then(()=>{
                res.redirect("/cliente/lista");
            })
        }else{
            res.redirect("/cliente/novo");
        }
    });

});


router.get("/cliente/editar/:id", (req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/cliente/lista");
    }

    Cliente.findByPk(id).then(cliente=>{
        if(cliente != undefined){
            res.render("admin/clientes/editar", {cliente: cliente}); 
        }else{
            res.redirect("/cliente/lista");
        }
    }).catch(err=>{
        res.redirect("/cliente/lista");
    });
});

router.post("/cliente/editar", (req, res)=>{
    var id = req.body.id;
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var data = req.body.data;
    var email = req.body.email;

    Cliente.update({
        nome: nome,
        cpf: cpf,
        data: data,
        email: email
    }, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/cliente/lista");
    }).catch(err =>{
        res.redirect("/cliente/editar/" + id);
    })
});


router.post("/cliente/deletar", (req, res)=>{
    var id = req.body.id;
    
    if(id != undefined){
        if(!isNaN(id)){
            Cliente.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/cliente/lista");
            })
        }else{
            res.redirect("/cliente/lista");
        }
    }else{
        res.redirect("/cliente/lista");
    }
});

router.post("/cliente/buscar", async(req, res)=>{
    var identificador = req.body.identificador;
    
    var cliente = await Cliente.findOne({ where: { nome: identificador }});
    if(cliente == undefined){
        cliente = await Cliente.findOne({ where: { cpf: identificador }});
    }
    console.log(cliente);

    if(cliente != undefined){
        res.render("admin/clientes/buscar", {cliente: cliente});
    }
    else{
        res.redirect("/cliente/lista");
    }
});




module.exports = router;