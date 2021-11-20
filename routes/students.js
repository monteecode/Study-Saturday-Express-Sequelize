const router = require('express').Router();
const { restore } = require('sinon');
const Student = require("../db/models/student")
 
router.get('/', async (req, res, next) => {
    try{
        const students = await Student.findAll();
        res.send(students)
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const student = await Student.findByPk(req.params.id)
        if(student){
    
            res.send(student)
        } else {
        res.status(404).send("student not found")
    }
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        let student = await Student.create(req.body)
        res.status(201).send(student)
    }catch(err){
        next(err)
    }
})

router.put('/:id', async (req, res, next) =>{
    try{
        let updatedStudent = await Student.update(req.body, {
            where: {id: req.params.id},
            returning: true,
            plain: true
        })
        res.send(updatedStudent[1])
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const deleteStudent = Student.destroy({where: {id: req.params.id}})
        res.status(204).send()
    }catch(err){
        next(err)
    }
})

module.exports = router;
