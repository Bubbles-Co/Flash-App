import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Heading
} from "grommet";
import * as R from "ramda";
import { Baby, Next, Previous, Inspect, FormNextLink } from "grommet-icons";

function DateSessions(props) {
  const [dateSessions, setDateSessions] = useState([]);

  let startDate = decodeURIComponent(props.match.params.startDate);
  let endDate = decodeURIComponent(props.match.params.endDate);
  let [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchSessionsDate = async () => {
      let res = await fetch(
        `http://localhost:4000/user/me/sessions/dates?startDate=${startDate}&endDate=${endDate}&offset=${offset}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          redirect: "follow",
          referrer: "no-referrer"
        }
      );
      if (res.status === 200) {
        res = await res.json();
        setDateSessions(res);
      }
    };
    fetchSessionsDate();
  }, [startDate, endDate, offset]);

  const goPrev = () => {
    setOffset(offset - 1);
  };

  const goNext = () => {
    setOffset(offset + 1);
  };

  return (
    <Box overflow="scroll">
      <Box direction="row" align="center" gap="small" justify="center">
        <Inspect />
        <Heading level={5}>{startDate}</Heading>
        <FormNextLink />
        <Heading level={5}>{endDate}</Heading>
      </Box>
      <Box
        direction="column"
        align="center"
        justify="center"
        pad={{ left: "medium", right: "medium" }}
      >
        {R.isEmpty(dateSessions) ? (
          <Baby />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom">
                  Date
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Finish
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Grade
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Gym
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Type
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dateSessions.map(
                ({ id, date, finish, grade, gym, type }, index) => (
                  <TableRow key={id}>
                    <TableCell scope="row">
                      <strong>{new Date(date).toLocaleDateString()}</strong>
                    </TableCell>
                    <TableCell>{finish}</TableCell>
                    <TableCell>{grade}</TableCell>
                    <TableCell>{gym}</TableCell>
                    <TableCell>{type}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
        <Box direction="row" margin={{ top: "large" }} gap="large">
          <Button disabled={offset < 1} onClick={goPrev} plain={false}>
            <Previous size="small" />
          </Button>
          <Button
            disabled={dateSessions.length !== 8}
            onClick={goNext}
            plain={false}
          >
            <Next size="small" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default DateSessions;
