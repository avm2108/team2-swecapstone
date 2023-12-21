const functions = require("firebase-functions");
const crypto = require("crypto");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const express = require("express");
const cors = require("cors");
const {GoogleToken} = require("gtoken");
const { getAuth } = require("firebase-admin/auth");
const { userInfo } = require("os");

initializeApp();
const db = getFirestore();
const auth = getAuth();
db.settings({ignoreUndefinedProperties: true});


// security api --------------------------------------------->
const security = express();
security.use(cors({origin: true}));

security.get("/", async (req, res) => {
  const key = "-----BEGIN PRIVATE KEY-----\n" +
  "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD0owYQXzM2ygEG\n" +
  "hj2+lueqx2Xy687Mrvrf4ugKApMFnTUixuiQsJSGhlVnxZwE13LBjHjTEvyl7e7d\n" +
  "GqyxXMMfVxfecRxlKCVNvHHwrdAaAKgNMnVuRl8p4hFNzxLKrh/xeId/5aUoDUX5\n" +
  "Q0vhIFBelYsM/C65s32re9702NSvVGSCJ25ClArrL6+PmCjYLFxd01bWpXXLlEzh\n" +
  "r+c8p8s2x8ExKA3sK54xLwLrKx9iT4vHBVf8oPfHyJiyBWm8c3FVjxDD0SFrQrzQ\n" +
  "9MmkvJz1UZCZSqLf6Y0frBQj8cXPybN2SsE7PTZojp4IHm0B3+aA4ki+Nl1iu2YK\n" +
  "gIlY6ltNAgMBAAECggEAbgXFq+ZM77aw+GC2czmGLmnoQXTpOGf332o65oma2rsF\n" +
  "00K3BJ/N5KSU04ttrEXDUCXfjzpqUyvrshgVk9z+ymEOlJW1ag9Am7IFYnOhdJhX\n" +
  "/Dt10ecnVHxeQOrA7lOafSyycAR1n0o87qpj/XddffRuqaPfVdhSTCX1M5QzLzh5\n" +
  "qIlRESzo1IwOIscGUKlJa+5uhwEdxjksARxLWBUbH587+c/hFFNhygjrcrowIuC1\n" +
  "vONyhPrc6i3HaV0cORXYciG+FdISyGXZY3+nwLkROO0IQR7qPPLBkxWtUhagZ+8l\n" +
  "aRYe3ii9XfjAguSG8Rz58rN9OHpl+Gr/KXp+BjgnpwKBgQD/OabugKCUtWDfrx99\n" +
  "gIuqq/PxtyF3K2BxPoUsKEmv93SFwk6JEq94EFRHDZCm1Uh8HG7dDsg00PkebvBf\n" +
  "YdSYeTHkauWEdxIhhuw+0XfndYM9d6jVnekYD8YcXmu4gsIcHDNsMmUVyRExtHjj\n" +
  "/k1SmJJ0WDGZFp6B0kyc6meObwKBgQD1YSSSM4f6ncPqHN5mxfDnXEdQDpqOnFIU\n" +
  "2JxCTgWvv+banZm6u4HjmA+M5LCHYpZcoKMSEeskFa+F3487NUSdC0xyjS3yj/9Y\n" +
  "LYgXM3G3s3k/uyV1Gfhx2ZBrzYg4Em2lmk6Sej2pD7AXCvY/FPzW9BTJWLYhAxKZ\n" +
  "N2KSvl9QAwKBgCbbpjjFyK0beGZWCVtYSOtxRrDUivnT1tknBauVbrKl4E3FKaPg\n" +
  "/movQkWXISDldCXBRnfNmlnAP02M4ngDMxULzrbSN6OVZWNJYYqm5bSNxa+EGmZ7\n" +
  "plONg0IqdggfkGIrQQEGIzHP7Rg+O/GqdCdRJ2sjSlnegb+OPy/c2GttAoGALERV\n" +
  "I6b2PgkeIesJWEMXXbWxC8lGqrmauTYGopOOxRD6pa/O3vgay6NQEtvi2Nm5RIaa\n" +
  "RJVE9WKQIredEFJgyXATX4sGof7GUvML3RujxT80fYHWlRSVVHyqaDhQ/cSdUUXQ\n" +
  "LO6ulwREgTOyDtlLb7/izBwb50K1pTxvpQeBDF8CgYBSSPHRQVt34nCX1c9v512m\n" +
  "YvMv0lRDBCS7tzO0A00UFW+vLKyW+hlZ23KWkZcXrYqmq2CEV5siknGMjPp3z8T9\n" +
  "HKkt9M5oerAv3JbZM4/4ArkR1ZSalFM1mI6mnwz+GUvCGOtv4Mwu0jiobPpF4nFp\n" +
  "v6UW4oEh/PA6Sgtkk3EIdQ==\n-----END PRIVATE KEY-----\n";

  const gtoken = new GoogleToken({
    email: "scooper-df18f@appspot.gserviceaccount.com",
    scope: ["https://www.googleapis.com/auth/firebase.messaging"],
    key: key,
    eagerRefreshThresholdMillis: 5 * 60 * 1000,
  });

  gtoken.getToken((err, tokens) => {
    if (err) {
      res.send("err");
      return;
    }
    res.status(200).json(tokens.access_token);
  });
});

exports.security = functions.https.onRequest(security);

const key = express();
key.use(cors({origin: true}));

// Generates key
key.get("/", async (req, res) => {
  const key = crypto.randomUUID();
  const response = [{
    key: key,
  }];
  res.json(response).status(200);
});

key.get("/:id", async (req, res) => {
  const randomKey = crypto.randomUUID();
  const id = req.params.id;
  const keyRef = db.collection("student").doc(id);
  await keyRef.set( {
    guardian: {
      key: randomKey,
    },
  }, {merge: true});
  res.status(200).json([{
    key: randomKey,
  }]);
});

// Updates parent key
key.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const keyRef = db.collection("student").doc(id);
    await keyRef.set({
      guardian: {
        key: data.guardian.key,
      },
    }, {merge: true});
    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

exports.key = functions.https.onRequest(key);

const app = express();
app.use(cors({origin: true}));

// search user
app.get("/:id", async (req, res) => {
  
});

// create user
app.post("/", async (req, res) => {
  const auth = getAuth();
  const email = req.body.email;
  const displayName = req.body.displayName;
  const id = req.body.id;
  auth.createUser({
    email: email,
    password: "qwerty",
    displayName: displayName,
  }).then(async (userRecord) => {
    const parentRef = db.collection("student").doc(id);
    await parentRef.set({
      guardian: {
        uuid: userRecord.uid,
      }
    }, {merge: true});
    res.status(200).send("User account created");
  }).catch((err) => {
    res.status(400).send("Error creating user", err);
  });
});

// update user
app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const parentRef = db.collection("student").doc(id);
    await parentRef.set({
      guardian: {
        uuid: data.guardian.uuid,
      }
    }, {merge: true});
    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// delete user
app.delete("/:id", async (req, res) => {
  
});

// get all users
app.get("/", async (req, res) => {
  
});

exports.user = functions.https.onRequest(app);

const student = express();
student.use(cors({origin: true}));

// search student
student.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userRef = db.collection("student");
    const snapshot = await userRef.where("guardian.uuid", "==", id).get();
    if (snapshot.empty) {
      res.status(400).send("No matching student.");
      return;
    }

    snapshot.forEach(doc => {
      res.status(200).json([doc.data()]);
    });
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// create student
student.post("/", async (req, res) => {
  const data = req.body;
  const studentRef = await db.collection("student").doc(data.id).set(data);
  res.status(200).send(studentRef.id);
});

// update student
student.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const parentRef = db.collection("student").doc(id);
    await parentRef.update({
      status: data.status,
      position: data.position,
    });
    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// delete student
student.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const studentRef = db.collection("student");
  const snapshot = await studentRef.where("id", "==", id).get();
  if (snapshot.empty) {
    res.status(400).json("No matching student. Delete Unsuccessful!");
    return;
  }

  await db.collection("student").doc(id).delete();
  res.status(200).json(["Delete successful!"]);
});

// get all students
student.get("/", async (req, res) => {
  try {
    const promises = [];
    const userRef = db.collection("student");
    const snapshot = await userRef.get();
    if (snapshot.empty) {
      console.log("No matching documents");
      return;
    }

    snapshot.forEach((doc) => {
      promises.push(doc.data());
    });
    res.status(200).json(promises);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});
exports.student = functions.https.onRequest(student);

const parent = express();
parent.use(cors({origin: true}));

parent.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const parentRef = db.collection("student");
    const queryRef = await parentRef.where("guardian.name", "==", name).get();
    const studentpickUpQueue = []

    if (queryRef.empty) {
      res.status(400).send("No matching documents");
    }

    queryRef.forEach(doc => {
      studentpickUpQueue.push(doc.data());
    });
    res.status(200).json(studentpickUpQueue);
  } catch (error) {
    res.status(400).json({message: err.message});
  }
});

// update parent
parent.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const parentRef = db.collection("student").doc(id);
    await parentRef.update({
      guardian: {
        email: data.guardian.email,
        key: data.guardian.key,
        name: data.guardian.name,
        phone: data.guardian.phone,
        relation: data.guardian.relation,
        uuid: data.guardian.uuid,
        vehicle: {
          color: data.guardian.vehicle.color,
          licensePlate: data.guardian.vehicle.licensePlate,
          make: data.guardian.vehicle.make,
          model: data.guardian.vehicle.model,
          year: data.guardian.vehicle.year,
        }
      },
      position: 1000,
      scooper: data.scooper,
    });
    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

exports.parent = functions.https.onRequest(parent);

// pickup api --------------------------------------------->

const team = express();
team.use(cors({origin: true}));

team.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const studentRef = db.collection("scooperTeam");
    const queryRef = await studentRef.where("id", "==", id).get();

    if (queryRef.empty) {
      res.status(400).send("No matching documents");
    }

    queryRef.forEach(doc => {
      res.status(200).json([doc.data()]);
    });
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

team.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const parentRef = db.collection("student").doc(id);
    await parentRef.update({
      scooper: data.scooper,
    });
    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

exports.team = functions.https.onRequest(team);

const position = express();
position.use(cors({origin: true}));

position.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const studentRef = db.collection("student").doc(id);
    await studentRef.update({
      position: data.position,
    });
    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

exports.position = functions.https.onRequest(position);


// Queue manager
const queueManager = express();
queueManager.use(cors({origin: true}));

var pickUpQueue = [];
var waitingQueue = [];
var int = 1;
var count = 0;
var waitingQueueCount = int;
var queueSize = 5;

queueManager.get("/", async (req, res) => {
  if (pickUpQueue.length !== 0) {
    res.status(200).json({
      "pickupQueue": pickUpQueue,
      "waitingQueue": waitingQueue,
  });
  } else if (pickUpQueue.length == 0) {
    int = 1;
    count = 0;
    waitingQueueCount = 0;
  }
  res.status(400).send("Queue is empty.");
});

queueManager.post("/:id", async (req, res) => {
  const id = req.params.id;
  if (int <= queueSize) {
    pickUpQueue.push([id,int]);
    const studentRef = db.collection("student").doc(id);
    await studentRef.update({
      position: int,
    });  
  } else {
    waitingQueue.push([id, int]);
  }
  
  int = int + 1;
  res.status(200).send("OK");
});

queueManager.put("/:size", async (req, res) => {
  try {
    const size = req.params.size;
    queueSize = size;
    res.status(200).send("Success: Queue size updated.");
  } catch (error) {
    res.status(400).send("Unable to change queue size.");
  }
});

queueManager.delete("/", async (req, res) => {
  if (pickUpQueue.length !== 0) {
    pickUpQueue.shift();
    pickUpQueue.forEach(async (e) => {
      count = e[1];
      count --;
      e[1] = count;
      const studentRef = db.collection("student").doc(e[0]);
      await studentRef.update({
        position: e[1],
      });
    });
    if (waitingQueue.length !== 0) {
      let next = waitingQueue.shift();
      waitingQueue.forEach(async (e) => {
        waitingQueueCount = e[1];
        waitingQueueCount --;
        e[1] = waitingQueueCount;
      });
      pickUpQueue.push([next[0], next[1] - 1]);
      studentRef = db.collection("student").doc(next[0]);
      await studentRef.update({
        position: next[1] - 1
      });
      int = int - 1;
    } else if (waitingQueue.length == 0) {
      if (pickUpQueue.length < queueSize) {
        int = count + 1;
      }
    }
    res.status(200).send("OK");
  }
  res.status(400).send("Queue is empty.");
});

exports.queueManager = functions.https.onRequest(queueManager);

exports.school = functions.https.onRequest( async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(200).send("OK");
  }

  try {
    const school = await db.collection("school").add(req.body);
    await db.collection("school").doc(school.id).update({id: school.id});
    res.status(200).json("OK");
  } catch (err) {
    res.send("error: ", err);
  }
});

const scoop = express();
scoop.use(cors({origin: true}));

scoop.get("/", async (req, res) => {
  try {
    const scoopRef = db.collection("scoopRequest");
    const snapshot = await scoopRef.get();
    const list = [];
  
    snapshot.forEach(doc => {
      list.push(doc.data());
    });
  
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

scoop.post("/", async (req, res) => {
  try {
    let data = req.body;
    const scoopRef = db.collection("scoopRequest").doc();
    const result = await scoopRef.set({
      id: data.id,
      date: data.date,
      time: data.time,
      note: data.note,
      status: false,
      student: data.student,
    });
    res.status(200).send(scoopRef.id);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

scoop.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const scoopRef = db.collection("scoopRequest").doc(id);
    await scoopRef.update({
      status: data.status,
    });
    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

scoop.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const scoopRef = db.collection("scoopRequest");
    const queryRef = await scoopRef.where("id", "==", id).get();
    const list = [];
    if (queryRef.empty) {
      res.status(400).send("No matching documents.");
    }

    queryRef.forEach(doc => {
      list.push(doc.data());
    });
    res.status(200).json(list);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

exports.scoop = functions.https.onRequest(scoop);

exports.listen = functions.https.onRequest( async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(200).send("OK");
  }

  try {
    const arrivalStatusRef = db.collection("student");
    const snapshot = await arrivalStatusRef.where("position", "!=", 1000).get();

    if (snapshot.empty) {
      res.status(400).send("No matching documents.");
    }

    snapshot.forEach(doc => {
      res.status(200).json([doc.get("position")]);
    });
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// location api --------------------------------------------->
exports.location = functions.https.onRequest( async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(200).send("OK");
  }

  try {
    const id = req.body;
    const schoolRef = db.collection("school");
    const query = await schoolRef.where("id", "==", id.id).get();
    if (query.empty) {
      console.log("No such document!");
    }
    query.forEach((doc) => {
      res.status(200).json([doc.data()]);
    });
  } catch (err) {
    res.send("error: ", err);
  }
});
