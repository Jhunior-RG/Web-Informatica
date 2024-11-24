export const proxy = (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send("URL missing");
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => {
        res.setHeader("Content-Type", "application/pdf");
        res.send(Buffer.from(data));
      })
      .catch(err => res.status(500).send(err.message));
  }
