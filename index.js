const express = require("express");
const datasource = require("./src/database/datasource");
const Countries = require("./src/models/contries");
const datafield_config = require("./src/models/datafield_config");
const Datafields = require("./src/models/datafield");
const Document = require("./src/models/document");
const Invitation_tokens = require("./src/models/invitation_token");
const Notifications = require("./src/models/notification");
const Organizations = require("./src/models/organization");
const Payment = require("./src/models/payment");
const Roles = require("./src/models/roles");
const socket_ids = require("./src/models/socket_ids");
const Tag = require("./src/models/tag");
const Task = require("./src/models/task");
const User = require("./src/models/user");
const RefreshToken = require("./src/models/refreshToken");
const AssociatedTag = require("./src/models/associatedTags");
const app = express();

app.get("/", async (req, res) => {
  AssociatedTag.findAll()
    .then((roles) => {
      res.send(roles);
    })
    .catch((error) => {
      console.error("Error querying roles:", error);
    });
});

datasource
  .connect()
  .then(() => {
    console.log("database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  Roles,
  Organizations,
  Payment,
  Datafields,
  Document,
  Invitation_tokens,
  Notifications,
  socket_ids,
  Task,
  User,
  Tag,
  Countries,
  datafield_config,
  RefreshToken,
  AssociatedTag,
};
