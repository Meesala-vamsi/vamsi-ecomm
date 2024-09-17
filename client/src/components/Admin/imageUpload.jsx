
import { useEffect, useRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import axios from "axios"
import { useSelector } from "react-redux"
import { Skeleton } from "../ui/skeleton"

const ProductImageUpload = ({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
}) => {
  const inputRef = useRef();
  const { url } = useSelector((state) => state.auth);

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("image", file);
    setImageLoadingState(true);
    await axios
      .post(`${url}/admin/products/image`, data)
      .then((response) => {
        console.log(response);
        if (response?.data?.status === "success") {
          setUploadedImageUrl(response?.data?.image);
          setImageLoadingState(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (file !== null) uploadImageToCloudinary();
  }, [file]);

  const onChangeImageFile = (event) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) setFile(selectedImage);
    // setFile(event.target.value)
  };
  return (
    <div className="flex flex-col mb-3 gap-3">
      <Label htmlFor="image">Upload Image</Label>
      <Input
        type="file"
        id="image"
        className="cursor-pointer"
        ref={inputRef}
        onChange={onChangeImageFile}
      />
      {!imageLoadingState?<p className="text-green-700 font-extrabold">Uploaded</p>:""}
    </div>
  );
};

export default ProductImageUpload