import { Flex, Grid, Span, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const UserGrid = ({ users, setUsers }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/friends");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </Grid>
      {isLoading && (
        <Flex justifyContent={"center"}>
          <Spinner size="xl" />
        </Flex>
      )}
      {!isLoading && users.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text textStyle="xl">
            <Text textStyle="2xl" as={Span} fontWeight="bold" mr={2}>
              Poor you!😕
            </Text>
            No friends found.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default UserGrid;
