const monggose  = require('mongoose');

const jobModel = new monggose.Schema({

    company:{
        type:String,
        required:[true, "Company is required"],
        maxlength:50
    },
    position:{
        type:String,
        required:[true, "Position is required"],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview', 'declined', 'pending'],
        default:'pending'
    },
    createdBy:{
        type:monggose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']

    }


},
{
    timestamps:true
})
module.exports = monggose.model("Job", jobModel);