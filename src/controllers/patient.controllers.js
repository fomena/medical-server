import Patient from '../models/patient.model.js'
import getErrorMessage from './error.controller.js'

// creation d'un user       
const create = async (req, res, next) => {
    let patient = new Patient(req.body)
    const { email } = req.body;
    let tmpPatient = await Patient.findOne({ email });
    if (tmpPatient) return res.status(400).json({ message: "User already registered." });
    Patient.find().exec(async function (err, results) {

        try {


            let currentDate = new Date()
            patient.code = `A${results.length}${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear().toString().substring(currentDate.getFullYear().toString().length - 2)}`

            await patient.save()
            return res.status(201).json({
                message: "Successfully created new patient",
                patient: patient
            })

        } catch (error) {
            return res.status(400).json({

                error: getErrorMessage(error)

            })

        }
    });

}
//lecture de la liste des users 
const list = async (req, res) => {
    try {
        // let patient = await Patient.find().select('name email updated created')
        let patient = await Patient.find({}).sort('-created')
        res.json(patient)

    } catch (error) {

        return res.status(400).json({
            message: getErrorMessage(error)
        })
    }
}


// lecture d'un user par son id
const userByID = async (req, res, next, id) => {
    try {
        let patient = await Patient.findById(id)


        if (!patient) {
            return res.status(400).json({
                error: "User  not found"
            })


        }
        // console.log(patient)
        req.profile = patient
        next()
    } catch (error) {
        return res.status(400).json({
            error: "could not retrive  user"
        })
    }
}
// lecture d'un user
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    return res.json(req.profile)
}

// mise a jour
const update = async (req, res, next) => {

    let patient = req.body
    
    patient.updated = Date.now()

  

        await Patient.findOneAndUpdate({ _id: patient._id }, patient,{new: true},
            function (error, result) {
                if (error) {
                    return res.status(400).json({
                        message: getErrorMessage(error),
                    
                    })
                } else {
                    res.status(400).json({
                        message: "Successfully update  patient",
                        patient: result
                    })
                }
            }).clone().exec()
        









}
// suppresion des donnés dans une bd
const remove = async (req, res, next) => {
    try {

        let user = req.profile
        let deletePatient = await Patient.remove()
        deletePatient.hashed_password = undefined
        deletePatient.salt = undefined
        res.json(deletePatient)
    } catch (error) {
        return res.status(400).json({
            error: getErrorMessage(error)
        })
    }




}


export default {
    read,
    create,
    list,
    userByID,
    update,
    remove,

}