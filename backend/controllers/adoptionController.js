import Adoption from "../models/Adoption.js";

export const createAdoptionApplication = async (req, res) => {
  try {
    const {
      petId,
      petName,
      fullName,
      email,
      phone,
      address,
      housingType,
      hasOtherPets,
      reason,
    } = req.body;

    const userId = req.user._id || req.user.id;

    // check if the application of that very pet exist for that specific applicant
    const existingApplication = await Adoption.findOne({
      user: userId,
      petId: petId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: `You have already submitted an adoption request for ${petName}!`,
      });
    }

    // new application for new pet and user id
    const newAdoption = new Adoption({
      user: userId,
      petId,
      petName,
      fullName,
      email,
      phone,
      address,
      housingType,
      hasOtherPets,
      reason,
    });

    await newAdoption.save();

    res.status(201).json({
      message: "Adoption application submitted successfully!",
      data: newAdoption,
    });
  } catch (error) {
    // MongoServerError (Duplicate Key - Code 11000) handling
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already submitted an adoption request for this pet!",
      });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//--------------FAIZA  work---------
export const getAllAdoptionApplications = async (req, res) => {
  try {
    const applications = await Adoption.find();

    res.status(200).json({
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Admin - Approve or Reject adoption application
export const updateAdoptionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Only Approved or Rejected status is allowed
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Approved or Rejected",
      });
    }

    // Find the specific application by application ID
    const application = await Adoption.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Adoption application not found",
      });
    }

    // Change the application status
    application.status = status;

    await application.save();

    res.status(200).json({
      message: `Application ${status} successfully`,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// User - Get own adoption applications
export const getMyAdoptionApplications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const applications = await Adoption.find({
      user: userId,
    });

    res.status(200).json({
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
