import React, { useState } from "react";
import { Box, Button, Heading, Collapsible, Layer } from "grommet";
import { FormClose, User, Trigger, Add } from "grommet-icons";

function AppBar(props) {
  const [showSideBar, toggleSideBar] = useState(false);
  return (
    <React.Fragment>
      <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: "medium", right: "small", vertical: "small" }}
        elevation="medium"
        style={{ zIndex: "1" }}
        {...props}
      >
        <Box direction="row" align="center" gap="small">
          <Heading level="3" margin="none">
            FLASH
          </Heading>
          <Trigger />
        </Box>

        <Box direction="row" align="center">
          {props.size === "small" ? (
            <Button
              icon={<Add />}
              onClick={() => toggleSideBar(!showSideBar)}
            />
          ) : (
            <Button
              icon={<Add />}
              onClick={() => toggleSideBar(!showSideBar)}
              label="Add"
            />
          )}
          {/* <Button icon={<User />} onClick={() => toggleSideBar(!showSideBar)} /> */}
        </Box>
      </Box>
      <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
        <Box flex align="center" justify="center">
          {props.children}
        </Box>
        {!showSideBar || props.size !== "small" ? (
          <Collapsible direction="horizontal" open={showSideBar}>
            <Box
              flex
              width="medium"
              background="light-2"
              elevation="small"
              align="center"
              justify="center"
            >
              sidebar
            </Box>
          </Collapsible>
        ) : (
          <Layer>
            <Box
              background="light-2"
              tag="header"
              justify="end"
              align="center"
              direction="row"
            >
              <Button
                icon={<FormClose />}
                onClick={() => toggleSideBar(false)}
              />
            </Box>
            <Box fill background="light-2" align="center" justify="center">
              sidebar
            </Box>
          </Layer>
        )}
      </Box>
    </React.Fragment>
  );
}

export default AppBar;
