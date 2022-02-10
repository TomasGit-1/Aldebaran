var fs = require('fs');
// const fileUpl = require('express-fileupload');

const fileUpload = (req  , path ,file ) => {
    let uploadPath;
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, 0744);
        }
        if(!req.files || Object.keys(req.files).length === 0 ){
            console.log('No file were uploaded');
        }
        uploadPath = path+file.name;
        file.mv(uploadPath, function(err) {
            if (err){
                console.log(err);
            }else{
                console.log("File uploaded")
            }
        });
        return 200;
    } catch (error) {
        console.log(error);
        
    }
};

const RandomName = () => {
    return Math.random().toString(36).substring(2, 12);
    // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
const RandomName2 = () => {
    return Math.random().toString(36).substring(2, 12);
}
module.exports = {
    RandomName,
    RandomName2

};
