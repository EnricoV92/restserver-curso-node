
const path = require('path');
const { v4:uuidv4 } = require('uuid');

const uploadFile =  (files, validExt = ['png', 'jpg', 'jpeg', 'gif'], dir = '') => {

    return new Promise ( (resolve, reject) => {

        const { myFile } = files;
        const splitName = myFile.name.split('.');
        const ext = splitName[ splitName.length - 1 ];
        
        // validat ext
        
        if(!validExt.includes(ext)) {
            return reject(`La extension ${ ext } no es permitida`)
        }
        
        const newNameFile = uuidv4() + '.' + ext;
        const uploadPath = path.join(__dirname ,'../uploads', dir, newNameFile);
        
        // Use the mv() method to place the file somewhere on your server
        myFile.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(newNameFile);
        });
    });
}
    
module.exports = {
    uploadFile
}