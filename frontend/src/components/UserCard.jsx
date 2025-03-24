import { Avatar, Box, Card, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";

const UserCard = ({ user }) => {
  return (
    <Card.Root maxW="sm">
      <Card.Header>
        <Flex gap={"4"}>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src={user.imgUrl} />
              <Avatar.Fallback name="Avatar" />
            </Avatar.Root>
            <Box>
              <Card.Title size="sm">{user.name}</Card.Title>
              <Card.Description>{user.role}</Card.Description>
            </Box>
          </Flex>
          <Flex>
            <EditModal />
            <IconButton
              variant={"ghost"}
              color={"red"}
              size={"sm"}
              aria-label="See menu"
            >
              <BiTrash size={20} />
            </IconButton>
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Card.Description>{user.description}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default UserCard;
