import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const AddressCard = ({
  address,
  addressIndex,
  onClickDeleteAddress,
  onClickEditAddress,
  setSelectAddress,
}) => {
  return (
    <div>
      <Card
        className="px-3 py-2 relative cursor-pointer"
        onClick={address ? () => setSelectAddress(address) : null}
      >
        <h2 className="font-bold text-lg mb-2">Address {addressIndex + 1}</h2>
        <div className="flex flex-col gap-2">
          <label>
            <span className="font-bold">First Name: </span>
            {address?.firstName}
          </label>
          <label>
            <span className="font-bold">Last Name: </span>
            {address?.lastName}
          </label>
          <label>
            <span className="font-bold">Address: </span>
            {address?.address}
          </label>
          <label>
            <span className="font-bold">City: </span>
            {address?.city}
          </label>
          <label>
            <span className="font-bold">Pincode: </span>
            {address?.pincode}
          </label>
          <label>
            <span className="font-bold">Phone: </span>
            {address?.phone}
          </label>
          <label>
            <span className="font-bold">Description: </span>
            {address?.description}
          </label>
        </div>
        <div className="absolute top-1 text-xl flex gap-3 items-center right-2">
          <CiEdit
            className="cursor-pointer"
            onClick={() => onClickEditAddress(address)}
          />
          <MdDeleteOutline
            className="cursor-pointer"
            onClick={() => onClickDeleteAddress(address._id)}
          />
        </div>
      </Card>
    </div>
  );
};

export default AddressCard;
