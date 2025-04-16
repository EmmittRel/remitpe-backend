const Job = require('../models/Jobportals');


// Get all jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('category');
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Create a new job vacancy
exports.createJob = async (req, res) => {
    const job = new Job({
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        category: req.body.category,
        salary: req.body.salary,
        company: req.body.company,
        image: req.body.image,
        location: req.body.location,
        deadline: req.body.deadline
    });


    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        // const job = await Job.findById(req.params.id);
        // if (job) {
        //     await job.remove();
        const result = await Job.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.json({ message: 'Job Position deleted' });
        } else {
            res.status(404).json({ message: 'Job Position not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update a job
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            job.title = req.body.title || job.title;
            job.content = req.body.content || job.content;
            job.author = req.body.author || job.author;
            job.category = req.body.category || job.category;
            job.salary = req.body.salary || job.salary;
            job.company = req.body.company || job.company;
            job.image = req.body.image || job.image;
            job.deadline = req.body.deadline || job.deadline;
            const updatedJob = await job.save();
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job Position not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get a single job by ID (public)
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('category');
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
