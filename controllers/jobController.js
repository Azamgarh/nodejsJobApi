const Job = require('../models/jobModel');
const { findOne, findByIdAndUpdate } = require('../models/userModel');
const getAllJobs =async (req, res)=>{
try{
 const page = parseInt(req.query.page) || 1;
        const limit = 10; // fixed 10 per page
        const skip = (page - 1) * limit;


 const allJobs = await Job.find({createdBy:req.user.userId}).populate('createdBy', 'id name email').skip(skip)
            .limit(limit);;
    if(!allJobs){
      return res.status(404).json({msg:'No job found', success:false})  
    }
const totalJobs = await Job.countDocuments({
            createdBy: req.user.userId
        });

    res.status(200).json({msg:'Job List', success:true, count:allJobs.length,currentPage: page,
            totalPages: Math.ceil(totalJobs / limit), data:allJobs, })

}
 catch(error){
return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
   

}

const getJob =async (req, res)=>{
try{
const id = req.params.id;
const job = await Job.findOne({_id:id, createdBy:req.user.userId}).populate('createdBy', 'id, name email');;
 if(!job){
      return res.status(404).json({msg:'No job found', success:false})  
    }
 res.status(200).json({msg:'Job', success:true, data:job})


}

 catch(error){
return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

}



const createJob =async (req, res)=>{
try{
const {company, position, status} = req.body;

if(!company){
    return res.status(400).json({msg:"Company name is required", success:false});
}
if(!position){
    return res.status(400).json({msg:"position  is required", success:false});
}

req.body.createdBy = req.user.id;

const job = await Job.create({company, position, status, createdBy: req.user.userId });
res.status(201).json({msg:"Job created successfully", success:true})


    }
    catch(error){
return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }


}

const updateJob =async (req, res)=>{
try{
const {company, position, status} = req.body;
const id = req.params.id;
const userId = req.user.userId;

//Find
const job = await Job.findOne({
    _id:id,
    createdBy:userId
});
if(!job){
    res.status(404).json({msg:"Job not found", success:false})
}
const updatedJob = await Job.findByIdAndUpdate({_id:id},{
    company, position, status, createdBy:userId
}, {new:true})

res.status(200).json({msg:"Job updated successfully", success:true,  data: updatedJob})
}
 catch(error){
return res.status(500).json({
            success: false,
            message: 'Internal server error', error
        });
    }


}

const deleteJob =async (req, res)=>{
try{
const jobId = req.params.id;
  const userId = req.user.userId;

 const deletedJob = await Job.findOneAndDelete({
            _id: jobId,
            createdBy: userId
        });

        if (!deletedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
res.status(200).json({msg:"Job delete successfully", success:true})
}
catch(error){
return res.status(500).json({success:false,
    message:'Internal server error'
})
}
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}