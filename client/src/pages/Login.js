import React, { useState } from "react";
import { FormLabel, FormControl, Button, Alert, Input } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function Login() {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ email: "", password: "" });
  };

  return (
    <section>
      <div className="loginContainer">
        <form onSubmit={handleFormSubmit} id="contact" action="" method="post">
          <h3>Login</h3>
          {error && (
            <Alert status="error" mb={4}>
              <Alert.Icon />
              <Alert.Title>The email address or password you entered is invalid</Alert.Title>
            </Alert>
          )}
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              isRequired
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              isRequired
            />
          </FormControl>

          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="solid"
            colorScheme="green"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}