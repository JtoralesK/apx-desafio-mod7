import {v2 as cloudinary} from"cloudinary"

cloudinary.config({ 
    cloud_name: 'apxschool', 
    api_key: '699922339514186', 
    api_secret: process.env.PASSWORD_CLOUDINARY 
  });

  export {cloudinary}