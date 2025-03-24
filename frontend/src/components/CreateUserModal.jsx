import { Button, Flex, HStack, RadioGroup } from "@chakra-ui/react";
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

const items = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const CreateUserModal = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
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
          <RadioGroup.Root defaultValue="male" pt={4}>
            <HStack gap="6">
              {items.map((item) => (
                <RadioGroup.Item key={item.value} value={item.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        </DialogBody>
        <DialogFooter>
          <Button>Add</Button>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
export default CreateUserModal;
