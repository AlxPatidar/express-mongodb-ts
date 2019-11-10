import app from "./app";

const port = process.env.PORT;

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`server started at http://localhost:${port}`);
});