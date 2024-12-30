import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { Button } from "react-bootstrap";
import { EditUsers } from "../api/editRequst";
import { GetSingleUser } from "../api/getRequest";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";
import useForm from "../hooks/UseForm";
import { isInputFilled } from "../utils/IsInputFill";
import useFetchUser from "../hooks/GetSingleUser";

const initialState = {
  fullName: "",
  age: 0,
  email: "",
  position: "",
};

const UpdateUser = () => {
  const { inputRef, setFocus, loading, setLoading } = useGlobalContext();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useFetchUser(userId);
  const [editedUser, handleInputChange, resetForm, setEditedUser] =
    useForm(initialState);

  const fetchUser = async () => {
    const response = await GetSingleUser(userId);
    setEditedUser(response);
  };

  const handleEditUser = async () => {
    setLoading(true);
    await EditUsers(userId, editedUser);
    setEditedUser(initialState);
    resetForm();
    toast.success("User edited successfully!", {
      autoClose: 1000,
    });
    setTimeout(() => {
      setLoading(false);
      navigate(ROUTER.Home);
    }, 500);
  };

  useEffect(() => {
    fetchUser();
    setFocus();
  }, []);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user, setEditedUser]);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
      <h1 className="text-white my-4">Edit User</h1>
      <div className="bg-dark-subtle w-50 text-center rounded  border border-primary">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleInputChange}
            className="p-2 w-75 my-2 border border-primary rounded"
            ref={inputRef}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Position"
            name="position"
            value={editedUser.position}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={editedUser.age}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>

        <Button
          className="m-2 px-4 w-75"
          onClick={handleEditUser}
          disabled={!isInputFilled(editedUser)}
          style={{
            pointerEvents: isInputFilled(editedUser) ? "auto" : "none",
          }}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateUser;
