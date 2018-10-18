app.get("/survey", function(req, res) {

    res.render(survey.html);
  });

app.get("/", function(req, res) {

    res.render(index.html);
  });