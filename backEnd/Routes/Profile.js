const express = require('express');
const UsersShema = require('../models/profile')
const router = express.Router();




router.post("/uploads", (req, resp) => {
    const { name, Location: location, Description: description } = req.body
    const { files } = req.files
    const fragments = files.name.split(".x")
    const fileExt = fragments[fragments.length - 1]
    const uniqKey = uniqKeyGenerate()
    const fileName = uniqKey + "." + fileExt
    if (['jpeg', 'jpg', 'png', 'svg'].includes(fileExt)) {
        files.mv("./uploads/" + fileName, async (err) => {
            if (err) {
                resp.json({ message: err })
            } else {
                const user = new UsersShema({
                    name,
                    location,
                    description,
                    file_name: fileName,
                    date: new Date()
                })
                try{
                    await user.save()
                    resp.json({message: 'Pushed data into Database successfully'})
                }
                catch(e){
                    resp.json({message: e})
                }
            }
        })
    }
    else{
        resp.json({message: "Please upload an image file"})
    }

})

router.get("/all", async (req, resp) => {
    try{
        const response = await UsersShema.find()
        resp.json({result: response})
    }
    catch(e){
        resp.json({message: e})
    }
})

router.get("/image/:filename", (req, resp) => {
    resp.sendFile(path.join(__dirname, `/uploads/${req.params.filename}`))
})