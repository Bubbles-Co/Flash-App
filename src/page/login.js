import React, { useState } from "react";
import { Form, FormField, Button, Box } from "grommet";
import { Trigger } from "grommet-icons";
import { useCookies } from "react-cookie";

function Login(props) {
  const [formErrors, setFormErrors] = useState({});

  const [cookies, setCookie] = useCookies(["jwtToken"]);

  let { from } = props.location.state || {
    from: { pathname: "/dashboard" }
  };

  const validateEmail = value => {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!re.test(String(value).toLowerCase())) {
      return "invalid email address.";
    }
  };

  const validatePassword = value => {
    if (value.length < 2) {
      return "password must be at least 10 characters.";
    }
  };

  const logUserIn = async value => {
    try {
      const res = await fetch("http://localhost:4000/sign-in", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(value)
      });
      if (res.status === 200) {
        const { token, ...options } = await res.json();
        setCookie("jwtToken", token, { ...options });
        props.history.push(from);
      } else {
        console.log(res);
        throw "Invalid Credentials";
      }
    } catch (err) {
      setFormErrors({ email: "invalid credentials.", password: "" });
    }
  };

  const onSubmit = async ({ value }) => {
    await logUserIn(value);
  };

  return (
    <Box
      direction="column"
      align={props.size === "small" ? "stretch" : "center"}
      justify="center"
      background={{ color: "brand", opacity: "weak" }}
      pad={{ left: "xlarge", right: "xlarge", vertical: "xlarge" }}
      elevation="medium"
      basis="full"
      gap="medium"
    >
      <Box
        direction="column"
        align="center"
        justify="between"
        pad={{ vertical: "xlarge" }}
      >
        <Trigger size="xlarge" />
      </Box>

      <Form onSubmit={onSubmit} errors={formErrors}>
        <FormField
          name="email"
          label="Email"
          validate={validateEmail}
          required={true}
          type="email"
        />
        <FormField
          name="password"
          label="Password"
          validate={validatePassword}
          required={true}
          type="password"
        />
        <Box
          direction="column"
          align="center"
          justify="between"
          pad={{ left: "xlarge", right: "xlarge", vertical: "large" }}
        >
          <Button type="submit" primary label="Submit" />
        </Box>
      </Form>
    </Box>
  );
}

export default Login;
