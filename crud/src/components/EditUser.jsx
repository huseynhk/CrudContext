import { EditUsers } from "../api/editRequst";
import { Modal, Form, Button } from "react-bootstrap";
import { useGlobalContext } from "../contexts/GlobalContext";
import useForm from "../hooks/UseForm";
import { isInputFilled } from "../utils/IsInputFill";
import { toast } from "react-toastify";

const EditUser = () => {
  const { isModalOpen, editedItem, closeModal, loading, setLoading } =
    useGlobalContext();
  const [editedUser, handleInputChange] = useForm(editedItem);

  const updateUser = async () => {
    setLoading(true);
    await EditUsers(editedUser.id, editedUser);
    setTimeout(() => {
      setLoading(false);
      closeModal();
      toast.success("User edited successfully!", {
        autoClose: 1000,
      });
    }, 500);
  };

  return (
    <>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={editedUser.fullName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={editedUser.position}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={editedUser.age}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <Button
            variant="primary"
            className="py-2 px-5"
            onClick={updateUser}
            disabled={!isInputFilled(editedUser)}
            style={{
              pointerEvents: isInputFilled(editedUser) ? "auto" : "none",
            }}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
