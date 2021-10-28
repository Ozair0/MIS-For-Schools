const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;
  app.use(express.json({ extended: false }));
  // Define Routes

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Express GET endpoint
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/student", require("./routes/Student"));
  app.use("/api/parent", require("./routes/Parent"));
  app.use("/api/department", require("./routes/Department"));
  app.use("/api/teacher", require("./routes/Teacher"));
  app.use("/api/employee", require("./routes/Employee"));
  app.use("/api/grade", require("./routes/Grade"));
  app.use("/api/class", require("./routes/Class"));
  app.use("/api/classroom", require("./routes/ClassRoom"));
  app.use("/api/subject", require("./routes/Subject"));
  app.use("/api/timetable", require("./routes/Timetable"));
  app.use("/api/studentattendance", require("./routes/StudentAttendance"));
  app.use("/api/employeeattendance", require("./routes/EmployeeAttendance"));
  app.use("/api/library", require("./routes/Library"));
  app.use("/api/book", require("./routes/Book"));
  app.use("/api/emergencymember", require("./routes/EmergencyMembers"));
  app.use("/api/salary", require("./routes/Salary"));
  app.use("/api/examtimetable", require("./routes/ExamTimetable"));
  app.use("/api/fee", require("./routes/Fee"));
  app.use("/api/time", require("./routes/Times"));
  app.use("/api/school", require("./routes/School"));
  app.use("/api/marks", require("./routes/marks"));

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  // app.listen(port, "10.10.10.8");
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
