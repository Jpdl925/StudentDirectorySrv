import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Center,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Avatar,
  useToast,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useEffect, useState } from "react";
import StudentForm from "./StudentForm";

export interface Student {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
} 

const StudentTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();


    const [currentData, setCurrentData] = useState<Student>({} as Student);
    const [data, setData] = useState<Student[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState("");

    const toast = useToast();

    const fetchData = () => {
        setIsLoading(true);
        axios
        .get(BASE_URL+"Student")
        .then((res) => {
            setData(res.data);
            console.log(res);
            console.log(data);
        })
        .catch(error => {
            console.log(error);
            setError(error);
            
        })
        .finally(() => {
            setIsLoading(false)
        })
        console.log(data);
    }

    useEffect(() => {
        fetchData();
    }, [])
    

    const handleAdd = () => {
        onOpen();
        setCurrentData({} as Student)
    }

    const getStudent = (id: number) => {
      axios
        .get(BASE_URL + "Student/" + id)
        .then((res) => {
          setCurrentData(res.data);
          onOpen();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteStudent = (id:number) => {
      axios
      .delete(BASE_URL+"Student/"+id)
      .then(() => {
        toast({
          title: 'Student Deleted.',
          description: "Student Deleted Succesfully.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        fetchData();
      })
      .catch(error => {
        console.log(error);
        
      })
    }



  return (
    <>
      <Box m={32} shadow={"md"} rounded={"md"}>

      

        <Flex justifyContent={"center"}>
          <Heading margin={5} textAlign={"center"} fontSize={45}>
            Student List
          </Heading>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="green">
            <Thead>
              <Tr>
                <Th textAlign={"center"}>Student ID</Th>
                <Th>Student Name</Th>
                <Th>Address</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
              </Tr>
            </Thead>

            <Tbody>
            {data.map((student:Student) => (
                <Tr key={student.id}>
                    <Td textAlign={'center'}>{student.id}</Td>
                    <Td>{student.name}</Td>
                    <Td>{student.address}</Td>
                    <Td>{student.email}</Td>
                    <Td>{student.phone}</Td>
                    <Td>
                    <HStack justifyContent={'space-evenly'}>
                      <EditIcon
                        onClick={() => getStudent(student.id)}
                        boxSize={23}
                        color={"orange.200"}
                      />

                      <Popover>
                        <PopoverTrigger>
                        <DeleteIcon boxSize={23} color={"red.400"} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Are you sure you want to Delete?
                          </PopoverBody>
                          <PopoverFooter>
                            <Button colorScheme="red" variant={'outline'} onClick={() => deleteStudent(student.id)}>Delete</Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                  </Td>
                </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>

        {data.length == 0 && (
            <Heading margin={10} textAlign={'center'}>No Data</Heading>
        )}

        <Flex justifyContent={"end"}>
          <Button onClick={handleAdd} margin={10}>Add Student</Button>
        </Flex>

        {isOpen && (
            <StudentForm currentData={currentData} isOpen={isOpen} onClose={onClose} fetchStudent={fetchData}/>
        )}


      </Box>
    </>
  );
};

export default StudentTable;
