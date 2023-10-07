const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Initiate
let videoStatus = 'waiting';
const clients = [];

// SSE Route
app.get('/monitorVideoStatus', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);

  // Send initial status
  res.write(`data: ${JSON.stringify({ status: videoStatus })}\n\n`);

  // Handle Close
  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
  });
});

// Get
app.get('/checkVideoStatus', (req, res) => {
  const responseData = {
    code: 200,
    data: {
      message: 'Status video berhasil didapat',
      status: videoStatus
    }
  };

  res.json(responseData);
});

// Update
app.put('/updateVideoStatus', (req, res) => {
  const newData = req.body;

  if (!newData || !newData.status) {
    const errorResponse = {
      code: 400,
      data: {
        message: 'Data tidak valid'
      }
    };
    return res.status(400).json(errorResponse);
  }

  // Save
  videoStatus = newData.status;

  // Send updates to all clients
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify({ status: videoStatus })}\n\n`);
  });

  const successResponse = {
    code: 200,
    data: {
      message: 'Status video berhasil diperbarui',
      status: videoStatus
    }
  };

  res.status(200).json(successResponse);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
