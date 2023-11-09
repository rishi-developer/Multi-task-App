const axios = require("axios");
const cron = require("node-cron");
const config = require("./config");
const http = require("http");
const app = require("./app");
const updateUserDetails = require("./middleware/updateUserDetails");
const updateLunchEvent = require("./middleware/updateLunchEvent");
const updateRetention = require("./middleware/updateRetention");

require("dotenv").config();

const port = config.PORT || 5000;

cron.schedule("0 0 0 * * 0,3", function () {
  axios
    .get(
      "https://misapi.geminisolutions.com/api/Gemini/Users?key=Ks5GSWiV2tZjuF87rSIJgQ==&token=9849AE58-1CF2-4D97-8F1A-5B4D7A52BAA5",
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
    )
    .then(async (res) => {
      const { data, Result } = res;
      data.Result.map(async (s) => {
        updateUserDetails(s);
      });
    })
    .catch((err) => console.log(err.code));
});

const httpsServer = http.createServer(app);
const io = require("socket.io")(httpsServer);
io.on("connection", (socket) => {
  socket.on("add-event", (boolean) => {
    io.emit("response", boolean);
  });
  socket.on("quiz", (boolean) => {
    io.emit("quiz_response", boolean);
  });
});
cron.schedule("15 0 5 * * 1-5", function () {
  updateLunchEvent();
  io.emit("response", true);
});
cron.schedule("0 30 0 * * *", function () {
  updateRetention();
});

httpsServer.listen(port, () => console.log(`app listening on port ${port}`));
