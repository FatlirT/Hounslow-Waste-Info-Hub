import { Amplify, Storage } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

export default async function postImage(imageFile: File | undefined) {
  if (!imageFile) {
    return "";
  } else {
    let iurl = "";
    try {
      await Storage.put(imageFile.name, imageFile, {
        contentType: "image/png", // contentType is optional
      });
      iurl = `${process.env.NEXT_PUBLIC_IMAGE_BUCKET_URL}/public/${imageFile.name}`;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    return iurl;
  }
}
