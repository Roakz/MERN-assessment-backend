const photoModel  = require("../database/schemas/photoSchema")

const { authenticateUser } = require ("./usersController")

// Need to ensure user validation before any crud can be implemented.
// const userValidation = require("../controllers/authController")

// Photo gallery
// searches model for all and if no error, getPhotos will return the images
async function getPhotos(req, res) {
    //finds all photo objecst from the database
    const photos = await photoModel.find()
        //returns a server error if an error occurs
        // if (err) {
        //     res.status(500);
        //     res.json({
        //         error: err.message
        //     });
        // }
        //resolves by sending photos
        res.send(photos);
}

// Create
const addPhoto = (req, res) => {
    // Destructures elements of a photo from req.body
    const { name, idNumber, location, category, description, fileRef } = req.body
    // Creates a new photo item with destructured parameters
    const photo = new photoModel( { name, idNumber, category, description, location, description, fileRef })
    // Saves photo to database
    photo.save(function(err) {
        //if no error
        if (err) {
            res.status(500).json('Something went wrong.')
            //otherwise return server error
        } else {
            res.status(201).json('Photo successfully saved!')
        }
    })
}

//Searches database for object ID and returns and renders that photo
//deconstructs id from the params and renders the restult
const showPhoto = (req, res) => {
    //obtains the id though the params
    let { id } = req.params
    //identify the selected photo via photo variable
    let photo = photoModel.findById(id)
        //accounting for an error or not
        if (err) {
            res.status(404)
            res.send("Photo not found")
        } else {
            res.render("/:id", { photo })
        }
}


// Edit a photo - this function is new to me.
const editPhoto = (req, res) => {
    photoModel.findOneAndUpdate(
        { _id: req.params.photo_id },
        req.body,
        { new: true, runValidators: true},
        (err, editedPhoto) => {
            if (err) {
                res.status(401).json(message)
            } else {
                res.status(200).json({ message: 'Photo details successfully updated!' })
            }
        }
    )
}

//Deleting a photo by looking for the id. Sends through the status 204 (No content)
//if successful and 500 (server error) if an error.

const deletePhoto = (req, res) => {
    Photo.findByIdAndDelete({_id: req.params.photo_id}, err => {
        if (err) {
            res.status(500).json('Something went wrong')
        } else {
            res.status(200).json({ message: 'Photo has been deleted' })
        }
    })
}


//ANOTHER delete option, but makes less sense to me personally
// const deletePhoto = function(req, res) {
//     if (req.error) {
//         res.status(req.error.status)
//         res.send(req.error.message)
//     } else {
//         deletePhotoObject(req.params.id).exec((err) => {
//             if (err) {
//                 res.status(500)
//                 res.json({ error: err.message })
//             }
//             res.sendStatus(204)
//         })
//     }
// }

// exporting the modules
module.exports = {
    getPhotos,
    addPhoto,
    showPhoto,
    editPhoto,
    deletePhoto
}