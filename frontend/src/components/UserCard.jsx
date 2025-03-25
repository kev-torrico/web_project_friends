import { Avatar, Box, Card, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";
import { Toaster, toaster } from "./ui/toaster";

const UserCard = ({ user, setUsers }) => {
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id)); //Filter the one the is deleted
      setTimeout(() => {
        toaster.create({
          title: "Success",
          description: "Friend deleted successfully",
          type: "success",
          duration: 4000,
        });
      }, 100);
    } catch (error) {
      toaster.create({
        title: "An error has occurred",
        type: "error",
        description: error.message,
        duration: 6000,
      });
    }
  };
  return (
    <>
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
              <EditModal user={user} setUsers={setUsers} />
              <IconButton
                variant={"ghost"}
                color={"red"}
                size={"sm"}
                aria-label="See menu"
                onClick={handleDeleteUser}
              >
                <Toaster />
                <BiTrash size={20} />
              </IconButton>
            </Flex>
          </Flex>
        </Card.Header>
        <Card.Body>
          <Card.Description>{user.description}</Card.Description>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default UserCard;
