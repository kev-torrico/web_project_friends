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

const EditModal = () => {
  const [open, setOpen] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode();
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>My new BFF😍</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Flex alignItems={"center"} gap={4}>
            {/* left */}
            <Field.Root>
              <Field.Label>Full Name</Field.Label>
              <Input placeholder="Kevin Villca Torrico" />
            </Field.Root>
            {/* Rigth */}
            <Field.Root>
              <Field.Label>Role</Field.Label>
              <Input placeholder="Software Ingenieer" />
            </Field.Root>
          </Flex>
          <Field.Root pt={4}>
            <Field.Label>Description</Field.Label>
            <Textarea
              resize={"none"}
              overflow={"hidden"}
              placeholder="He's a software ingenieer who loves to code and build things"
            />
          </Field.Root>
        </DialogBody>
        <DialogFooter>
          <Button>Update</Button>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
export default EditModal;
