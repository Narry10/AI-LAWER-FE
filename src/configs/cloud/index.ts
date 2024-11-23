// cloudinaryConfig.ts
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dkai33nm3',
    apiKey: '428748919648384',
    apiSecret: '0zGbJNdpBesBrOA7MZyp_YN0FMM',
  }
});

export default cld;
