const db = require("../models");
const MonitorKit = db.monitorKits;

// Create and Save a new monitorKit
exports.create = (req : any) => {
  // Validate request
  // console.log(req);
  if (!req?.title) {
    return { message: "Content can not be empty!" };
  } else {
    // Create a monitorKit
    const monitorKit = new MonitorKit({
      kitId: req.kitId,
      title: req.title,
      description: req.description,
      isActive: req.isActive ? req.isActive : false,
      feeds: req.feeds,
    });

    // Save monitorKit in the database
    monitorKit
      .save(monitorKit)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => {
        return {
          message:
            err.message || "Some error occurred while creating the monitorKit.",
        };
      });
      return;
  }
};

// Find a single monitorKit with an id
exports.findOne = (req: any) => {
  // const id = req.params.id;

  return MonitorKit.findOne({ kitId: req })
    .then((data: any) => {
      // console.log(data);
      if (!data) return false;
      else return true;
    })
    .catch((err: any) => {
      return false;
    });
};

// Update a monitorKit by the id in the request
exports.update = (req : any) => {
  if (!req) {
    return {
      message: "Data to update can not be empty!",
    };
  }else{
    MonitorKit.findOneAndUpdate({ kitId: req.kitId }, req, {useFindAndModify: false})
    .then((data : any) => {
      if (!data) {
        return {
          message: `Cannot update monitorKit with. Maybe monitorKit was not found!`,
        };
      } else return { message: "monitorKit was updated successfully." };
    })
    .catch((err : any) => {
      return {
        message: "Error updating monitorKit with id=" + err,
      };
    });
    return;
  }

  // const id = req.params.id;
  
};

// Delete a monitorKit with the specified id in the request
exports.delete = (req : any, res : any) => {
  const id = req.params.id;

  MonitorKit.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data : any) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete monitorKit with id=${id}. Maybe monitorKit was not found!`,
        });
      } else {
        res.send({
          message: "monitorKit was deleted successfully!",
        });
      }
    })
    .catch((err : any) => {
      res.status(500).send({
        message: "Could not delete monitorKit with id=" + id,
      });
    });
};

// Delete all monitorKits from the database.
exports.deleteAll = (req : any, res : any) => {
  MonitorKit.deleteMany({})
    .then((data : any) => {
      res.send({
        message: `${data.deletedCount} monitorKits were deleted successfully!`,
      });
    })
    .catch((err : any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all monitorKits.",
      });
    });
};

// Retrieve all monitorKits from the database.
exports.findAll = (req : any, res : any) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  MonitorKit.find(condition)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err : any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving monitorKits.",
      });
    });
};

// Find all published monitorKits
exports.findAllPublished = (req : any, res : any) => {
  MonitorKit.find({ published: true })
    .then((data : any) => {
      res.send(data);
    })
    .catch((err : any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving monitorKits.",
      });
    });
};
