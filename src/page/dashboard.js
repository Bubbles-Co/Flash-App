import React, { useEffect, useState } from "react";
import {
  DataTable,
  Text,
  Box,
  Meter,
  Heading,
  Calendar,
  Button
} from "grommet";
import { Baby, Inspect } from "grommet-icons";
import * as R from "ramda";
import moment from "moment";

function Dashboard(props) {
  const [me, setMe] = useState({});
  const [sessionValues, setSessionValues] = useState([]);
  const [sessionRoutesCount, setSesionRoutesCount] = useState([]);
  const [dispMessage, setDispMessage] = useState("select a date range :)");
  const [range, setRange] = useState({
    startDate: moment()
      .startOf("month")
      .add(1, "days")
      .format("YYYY-MM-DD"),
    endDate: moment()
      .add(1, "days")
      .format("YYYY-MM-DD")
  });

  useEffect(() => {
    const fetchMe = async () => {
      let res = await fetch("http://localhost:4000/user/me", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        redirect: "follow",
        referrer: "no-referrer"
      });
      if (res.status === 200) {
        res = await res.json();
        setMe(res);
      }
    };
    fetchMe();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      let res = await fetch(
        `http://localhost:4000/user/me/session_stats?startDate=${
          range.startDate
        }&endDate=${range.endDate}`,
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
        setSessionValues(res);
      }
    };
    fetchSessions();
  }, [range.startDate, range.endDate]);

  useEffect(() => {
    const fetchSessionRoutesCount = async () => {
      let res = await fetch(
        `http://localhost:4000/user/me/sessions_count?startDate=${
          range.startDate
        }&endDate=${range.endDate}`,
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
        setSesionRoutesCount(res);
      }
    };
    fetchSessionRoutesCount();
  }, [range.startDate, range.endDate]);

  const handleRangeSelect = date => {
    if (date === undefined) {
      setDispMessage("Please select a date range :)");
      setSessionValues([]);
      setSesionRoutesCount([]);
      return;
    }
    const startDate = date instanceof Array ? date[0][0] : date;
    const endDate = date instanceof Array ? date[0][1] : date;
    setRange({
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate)
        .add(1, "days")
        .format("YYYY-MM-DD")
    });
    setDispMessage("no sends :(");
  };

  return (
    <Box overflow="scroll">
      <Box
        direction="column"
        align="center"
        justify="center"
        pad={{ left: "medium", right: "medium" }}
      >
        {R.isEmpty(me) ? (
          <Baby />
        ) : (
          <Heading
            margin="medium"
            color={{ dark: "light-1", light: "dark-2" }}
            alignSelf="center"
            level={props.size === "small" ? 4 : 2}
          >
            Hello! {me.name}
          </Heading>
        )}
      </Box>

      <Box
        direction={props.size === "small" ? "column" : "row"}
        align="center"
        justify="center"
        background={{ color: "brand" }}
        margin={{ left: "medium", right: "medium", vertical: "large" }}
        pad={{ left: "medium", right: "medium", vertical: "large" }}
        gap="medium"
      >
        {R.isEmpty(sessionValues) ||
        R.isEmpty(sessionRoutesCount) ||
        R.isEmpty(sessionRoutesCount[0]) ? (
          <React.Fragment>
            <Baby />
            <div>{dispMessage}</div>
          </React.Fragment>
        ) : (
          <DataTable
            columns={[
              {
                property: "value",
                header: <Text>Type</Text>,
                primary: true
              },
              {
                property: "count",
                header: "Complete",
                render: datum => (
                  <Box pad={{ vertical: "medium" }}>
                    <Meter
                      values={[
                        {
                          value:
                            (parseInt(datum.count) * 100) /
                            parseInt(sessionRoutesCount[0].count)
                        }
                      ]}
                    />
                  </Box>
                )
              }
            ]}
            data={sessionValues}
          />
        )}
        <Calendar
          size="small"
          range={true}
          // dates={[[range.startDate, range.endDate]]}
          disabled={[
            [
              moment()
                .add(2, "days")
                .format("YYYY-MM-DD"),
              moment()
                .add(30, "years")
                .format("YYYY-MM-DD")
            ]
          ]}
          onSelect={handleRangeSelect}
        />
      </Box>
      {!R.isEmpty(sessionValues) && (
        <Box align="center" justify="center" margin="medium">
          <Button
            icon={<Inspect />}
            label="inspect"
            onClick={() => {
              props.history.push(
                `/sessions/${range.startDate}/${range.endDate}`
              );
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
