const express = require('express');
const router = express.Router();

const{getAllJobs, getJob, createJob,updateJob,deleteJob} = require('../controllers/jobController');


router.post("/createJob", createJob);
router.get("/getAllJob", getAllJobs);
router.get("/getJob/:id", getJob);
router.patch("/updateJob/:id", updateJob);
router.delete("/deleteJob/:id", deleteJob);


module.exports = router;