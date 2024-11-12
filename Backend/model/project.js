const mongoose = require('mongoose');

const projectSchema  = new mongoose.Schema({
    projectName :{
       type: String,
       required: true,
       trim : true,
    },
    description: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      status: {
        type: String,
        enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
        default: 'Planning',
      },
      manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      teamMembers: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          role: {
            type: String,
            enum: ['Developer', 'Designer', 'QA', 'Intern'],
            required: true,
          },
        },
      ],
    }, {
      timestamps: true,
});

const Project = mongoose.model('Project' , projectSchema);
module.exports = Project;