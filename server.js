import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API = "https://api.oh.xyz";

app.post("/characters", async (req,res)=>{
  const r = await fetch(API+"/api/v1/characters", {
    headers:{ "X-API-Key": req.body.apiKey }
  });
  res.json(await r.json());
});

app.post("/room", async (req,res)=>{
  const r = await fetch(API+"/api/v1/rooms", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "X-API-Key": req.body.apiKey
    },
    body: JSON.stringify({
      character_id:req.body.character_id
    })
  });
  res.json(await r.json());
});

app.post("/chat", async (req,res)=>{
  const r = await fetch(API+"/api/v1/text", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "X-API-Key": req.body.apiKey
    },
    body: JSON.stringify({
      room_id:req.body.room_id,
      character_id:req.body.character_id,
      message:req.body.message
    })
  });
  res.json(await r.json());
});

app.listen(3000, ()=>console.log("running"));

