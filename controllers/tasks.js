const Task = require("../models/Tasks");

const getAllTasks = async (req,res) => {
    try{
        const allTask = await Task.find({});    
        res.status(200).json(allTask);   
    } catch (err) {
            res.status(500).json(err);
    }
};
const createTask = async (req,res) => {
    //res.send("All tasks is gotten.");
    try{
        const createTask = await Task.create(req.body);    
        res.status(200).json(createTask);   
    } catch (err) {
            res.status(500).json(err);
    }
};
const getSingleTask = async (req,res) => {
    try{
        const getsingleTask = await Task.findOne({_id: req.params.id});    
        if(!getsingleTask){
            return res.status(404).json(`_id:${req.params.id} is not exist.`)
        }
        res.status(200).json(getsingleTask);   
    } catch (err) {
            res.status(500).json(err);
    }
};
const updateTask = async (req,res) => {
    try{
        const updateTask = await Task.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {
                new: true
            }
        );
        if(!updateTask){
            return res.status(404).json(`_id:${req.params.id} is not exist.`)
        }
        res.status(200).json(updateTask);   
    } catch (err) {
            res.status(500).json(err);
    }
};
const deleteTask = async (req,res) => {
    try{
        const deleteTask = await Task.findOneAndDelete(
            {_id: req.params.id},
        );    
        if(!deleteTask){
            return res.status(404).json(`_id:${req.params.id} is not exist.`)
        }
        res.status(200).json(deleteTask);   
    } catch (err) {
            res.status(500).json(err);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};