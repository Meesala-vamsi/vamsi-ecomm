import React, { useEffect, useState } from "react";
import CommonForm from "../Utils/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, fetchAllAddress, updateAddress } from "@/store/addressSlice";
import AddressCard from "./addressCard";
import { toast } from "react-toastify";

const addressFormControls = [
  {
    label: "Firstname",
    name: "firstName",
    componentType: "input",
    type: "text",
    placeholder: "Enter your firstname",
  },
  {
    label: "Lastname",
    name: "lastName",
    componentType: "input",
    type: "text",
    placeholder: "Enter your lastname",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

const initialAddressFormData = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  pincode: "",
  description: "",
  city: "",
};

const Address = ({ setSelectAddress }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [getCurrentId, setCurrentId] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const [dataSubmitType, setDataSubmitType] = useState("post");

  const handleAddress = (event) => {
    event.preventDefault();
    if (dataSubmitType === "post") {
      dispatch(
        addAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((response) => {
        if (response?.payload?.status === "success") {
          dispatch(fetchAllAddress(user?.id));
          setFormData(initialAddressFormData);
          toast.success(response?.payload?.message);
        } else {
          console.log(response);
        }
      });
    } else {
      dispatch(
        updateAddress({ userId: user?.id, addressId: getCurrentId, formData })
      ).then((response) => {
        if (response?.payload?.status === "success") {
          dispatch(fetchAllAddress(user?.id));
          setFormData(initialAddressFormData);
          setCurrentId(null);
          toast.success(response?.payload?.message);
        } else {
          console.log(response);
        }
      });
    }
  };

  //useEffect handling fetching the addresses on page reloading...
  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  //deleting the address
  const onClickDeleteAddress = (addressId) => {
    dispatch(deleteAddress({ userId: user?.id, addressId })).then(
      (response) => {
        if (response?.payload?.status === "success") {
          dispatch(fetchAllAddress(user?.id));
          toast.success(response?.payload?.message);
        } else {
          toast.error(response?.payload?.message);
        }
      }
    );
  };
  //editing the address
  const onClickEditAddress = (addressData) => {
    setCurrentId(addressData?._id);
    setDataSubmitType("edit");
    setFormData({
      ...formData,
      address: addressData?.address,
      city: addressData?.city,
      pincode: addressData?.pincode,
      phone: addressData?.phone,
      firstName: addressData?.firstName,
      lastName: addressData?.lastName,
      description: addressData?.description,
    });
  };

  return (
    <div>
      <Card>
        <div className="px-7 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          {addressList && addressList.length > 0
            ? addressList.map((eachAddress, index) => (
                <AddressCard
                  key={eachAddress._id}
                  address={eachAddress}
                  addressIndex={index}
                  onClickDeleteAddress={onClickDeleteAddress}
                  onClickEditAddress={onClickEditAddress}
                  setSelectAddress={setSelectAddress}
                />
              ))
            : null}
        </div>
        <CardHeader className="flex-flex-col gap-4">
          <CardTitle className="pl-6">Add Address</CardTitle>
          <CardContent>
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Address"
              formControls={addressFormControls}
              onSubmit={handleAddress}
            />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Address;
