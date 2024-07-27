import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { Student } from "./StudentTable";

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  fetchStudent: () => void;
  currentData?: Student;
}

const StudentForm = ({
  fetchStudent,
  currentData,
}: StudentFormProps) => {
  const toast = useToast();
  const [student, setStudent] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || "",
    address: currentData?.address || "",
    email: currentData?.email || "",
    phone: currentData?.phone || "",
  });

  
  const onSave = () => {
    if(currentData?.id)
    {
      editStudent()
    }
    else{
      addStudent()
    }
      
  }

  const editStudent = () => {
    axios
    .put(BASE_URL+'Student/'+currentData?.id,student)
    .then(() => {
      fetchStudent();
      toast({
        title: 'Student Updated.',
        description: "Student Updated Succesfully.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
    .catch(error => {
      console.log(error);
      
    })
  }

  const addStudent = () => {
    axios
      .post(BASE_URL + "Student", student)
      .then((res) => {
        console.log(res);
        fetchStudent();
        toast({
          title: "Student Added.",
          description: "Student Added Succesfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(student);
  };

  return (
    <>
       <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                value={student.name}
                onChange={(e) =>
                  setStudent({ ...student, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="123 Ez St.."
                value={student.address}
                onChange={(e) =>
                  setStudent({ ...student, address: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="JohnDoe@gmail.com.."
                value={student.email}
                onChange={(e) =>
                  setStudent({ ...student, email: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                placeholder="911.."
                value={student.phone}
                onChange={(e) =>
                  setStudent({ ...student, phone: e.target.value })
                }
              />
            </FormControl>



            <Flex margin={5} paddingBottom={5} justifyContent={'center'}>

            <Button onClick={onSave} colorScheme="green" mr={3}>
              Save
            </Button>
            </Flex>
    </>
  );
};

export default StudentForm;
