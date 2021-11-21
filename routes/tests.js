const router = require('express').Router();
const { restore } = require('sinon');
const Test = require('../db/models/test')
const Student = require('../db/models/student')
router.get('/', async (req, res, next) => {
    try{
        const tests = await Test.findAll()
        res.send(tests)
    } catch(error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        let test = await Test.findByPk(req.params.id)
        if(test) {
            res.send(test)
        } else {
            res.status(404).send('Test not found')
        }
    }catch(err){
        next(err)
    }
})

router.post('students/:studentId', async (req, res, next) => {
    try{
        let student = await Student.findByPk(req.params.studentId)
        let test = await Test.create(req.body)
        let studentTest = await test.setStudent(student)
        res.status(201).send(studentTest)
    //Need to find the student instance
    //use magic method
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        await Test.destroy({where: {id: req.params.id}})
        res.status(204).send()
    }catch(error){
        next(error)
    }
})

module.exports = router;
