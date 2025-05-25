require('dotenv').config();
const functions = require('firebase-functions');
const {
  GoogleAuth
} = require('google-auth-library');
const {
  google
} = require('googleapis');

exports.askGemini = functions.https.onRequest(async (req, res) => {
  secrets: ['AKEY'],
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).send('');

  const {
    text,
    googleAccount
  } = req.body; // 接收 googleAccount

  if (!text) return res.status(400).send('缺少 text 參數');

  const specificAccountEmail = process.env.GEMAIL.toString('utf8'); // 替換為您要判斷的特定電子郵件地址

  if (googleAccount.email.toLowerCase() === specificAccountEmail.toLowerCase()) {
    // 如果是特定帳號，回傳特定的 A 字串和 B 字串
    //ANCHOR[id=ric25051809] aKey API Key
    const aKey = Buffer.from(process.env.AKEY, 'base64').toString('utf8');
    //const aKey = Buffer.from(functions.config().service.akey, 'base64').toString('utf8');
    //const aKey = functions.config().service.akey; // 定義您的特定 A 字串
    
    //ANCHOR[id=ric25051810] fId 資料夾ID
    const fId = "1WVwwzNv6bckdnKtiRK_qU9zTL5y5pVSy";
    //const fId = functions.config().service.fid; // 定義您的特定 B 字串
    return res.send({
      aKey: aKey,
      fId: fId
    }); // 回傳包含 A 字串和 B 字串的 JSON 物件
  } else {
    const aKey = ''; // 定義您的特定 A 字串
    const fId = ''; // 定義您的特定 B 字串
    return res.send({
      aKey: aKey,
      fId: fId
    }); // 回傳包含 A 字串和 B 字串的 JSON 物件
  }
  try {
    // 如果不是特定帳號，則繼續呼叫 Gemini 模型
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });

    const authClient = await auth.getClient();
    const genAI = google.aiplatform({
      version: 'v1beta1',
      auth: authClient,
    });

    const project = 'personalaihelper-db2aa';
    const location = 'us-central1';
    const modelName = `projects/${project}/locations/${location}/publishers/google/models/gemini-1.5-pro-preview-0409`;

    const result = await genAI.projects.locations.publishers.models.generateContent({
      model: modelName,
      body: {
        contents: [{
          role: 'user',
          parts: [{
            text
          }]
        }]
      }
    });

    const answer = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text || '找不到答案';
    res.send({
      answer
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gemini 發生錯誤');
  }
});