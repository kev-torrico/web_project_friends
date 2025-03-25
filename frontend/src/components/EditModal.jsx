import { Button, Flex, IconButton } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { Field, Input, Textarea } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { BASE_URL } from "../App";
import { Toaster, toaster } from "./ui/toaster";

const EditModal = ({ user, setUsers }) => {
  const [open, setOpen] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
  });
  const handleEditUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setUsers(
        (prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)) //we search for the updated friend and update data
      );
      toaster.create({
        title: "Success",
        description: "Friend updated succesfully",
        type: "success",
        duration: 4000,
      });
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (error) {
      toaster.create({
        title: "An error has occurred",
        type: "error",
        description: error.message,
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <IconButton
          variant="ghost"
          size={"sm"}
          aria-label="See menu"
          color={useColorModeValue("blue.900", "blue.200")} //To make the color of the edit icon iteractive
        >
          <CiEdit size={20} />
        </IconButton>
      </DialogTrigger>
      <form onSubmit={handleEditUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My new BFF😍</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex alignItems={"center"} gap={4}>
              {/* left */}
              <Field.Root>
                <Field.Label>Full Name</Field.Label>
                <Input
                  placeholder="Kevin Villca Torrico"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs((prevUsers) => ({
                      ...prevUsers,
                      name: e.target.value,
                    }))
                  }
                />
              </Field.Root>
              {/* Rigth */}
              <Field.Root>
                <Field.Label>Role</Field.Label>
                <Input
                  placeholder="Software Ingenieer"
                  value={inputs.role}
                  onChange={(e) =>
                    setInputs((prevUsers) => ({
                      ...prevUsers,
                      role: e.target.value,
                    }))
                  }
                />
              </Field.Root>
            </Flex>
            <Field.Root pt={4}>
              <Field.Label>Description</Field.Label>
              <Textarea
                resize={"none"}
                overflow={"hidden"}
                placeholder="He's a software ingenieer who loves to code and build things"
                value={inputs.description}
                onChange={(e) =>
                  setInputs((prevUsers) => ({
                    ...prevUsers,
                    description: e.target.value,
                  }))
                }
              />
            </Field.Root>
          </DialogBody>
          <DialogFooter>
            <Button
              type="submit"
              isLoading={isLoading}
              onClick={handleEditUser}
            >
              <Toaster />
              Update
            </Button>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </form>
    </DialogRoot>
  );
};
export default EditModal;
