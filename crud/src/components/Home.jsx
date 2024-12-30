import { useEffect } from "react";
import { GetUsers } from "../api/getRequest";
import EditUser from "./EditUser";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { DeleteUser } from "../api/deleteRequest";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";
import DeleteModal from "./DeleteModal";
import useGetUser from "../hooks/GetUser";

const Home = () => {
  const {
    isModalOpen,
    editedItem,
    openModal,
    openDeleteModal,
    closeDeleteModal,
  } = useGlobalContext();

  const { user:users, fetchUsers } = useGetUser();

  useEffect(() => {
    fetchUsers();
  }, [isModalOpen]);

  const deleteUser = async (userId) => {
    await DeleteUser(userId);
    fetchUsers();
    toast.success("User deleted successfully!", {
      autoClose: 1000,
    });
    closeDeleteModal();
  };



  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-white my-3">User List</h1>
        <table className="table table-striped w-75 fs-4">
          <thead>
            <tr>
              <th>S.No</th>
              <th>FullName</th>
              <th>Age</th>
              <th>Email</th>
              <th>Position</th>
              <th>Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => openModal(user)}
                  >
                    Modal
                  </button>
                  <Link
                    className="btn btn-primary"
                    to={`${ROUTER.UpdateUser}/${user.id}`}
                  >
                    Page
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => openDeleteModal(user)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-info text-white"
                    to={`${ROUTER.Detail}/${user.id}`}
                  >
                    Info
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editedItem && <EditUser />}
        <DeleteModal deleteUser={deleteUser} />
      </div>
    </>
  );
};

export default Home;
