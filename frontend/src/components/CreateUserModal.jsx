import { Button, Flex, HStack, IconButton, RadioGroup } from "@chakra-ui/react";
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
import { Field, Input, Textarea } from "@chakra-ui/react";
import { MdLibraryAdd } from "react-icons/md";
import { BASE_URL } from "../App";
import { Toaster, toaster } from "./ui/toaster";

const items = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const CreateUserModal = ({ setUsers }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });

  const handleCreateUser = async (e) => {
    e.preventDefault(); //prevent page refresh
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      toaster.create({
        title: "Yayy! 🎉",
        type: "success",
        description: "Friend created successfully.",
        duration: 4000,
      });
      setTimeout(() => {
        setOpen(false);
        setUsers((prevUsers) => [...prevUsers, data]);
      }, 1000);
      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "",
      });
    } catch (error) {
      toaster.create({
        title: "An error has occurred",
        type: "error",
        description: error.message,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <IconButton
            variant="outline"
            size="sm"
            borderColor="none"
            px={4}
            minH="38.4px"
          >
            <MdLibraryAdd />
          </IconButton>
        </DialogTrigger>
        <form>
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
                      setInputs({ ...inputs, name: e.target.value })
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
                      setInputs({ ...inputs, role: e.target.value })
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
                    setInputs({ ...inputs, description: e.target.value })
                  }
                />
              </Field.Root>
              <RadioGroup.Root pt={4}>
                <HStack gap="6">
                  {items.map((item) => (
                    <RadioGroup.Item
                      key={item.value}
                      value={item.value}
                      onChange={(e) =>
                        setInputs({ ...inputs, gender: e.target.value })
                      }
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={(e) => {
                  handleCreateUser(e);
                }}
                setIsLoading={setIsLoading}
              >
                Add
              </Button>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </form>
      </DialogRoot>
      <Toaster />
    </>
  );
};
export default CreateUserModal;
