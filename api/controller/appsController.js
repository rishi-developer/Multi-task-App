const newConnection = require("../database/db");

const addAppsData = async (req, res) => {
  let pool = newConnection();
  try {
    const appData = req.body;
    await pool.query(
      "INSERT INTO app_data (name, is_selected, is_third_party,source,description,sub_description,url,webview,keyword,keywords,category,navig,size,dark_source,is_slider_list,is_banner,banner,is_required,card_name,card_message,screenshots,order_no,is_token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)",
      [
        appData.name,
        appData.isSelected,
        appData.isThirdPartyApp,
        appData.source,
        appData.description,
        appData.subDescription,
        appData.url,
        appData.webview,
        appData.Keyword,
        appData.keywords,
        appData.category,
        appData.navig,
        appData.size,
        appData.darksource,
        appData.isSliderList,
        appData.isBanner,
        appData.banner,
        appData.isRequired,
        appData.cardName,
        appData.cardMessage,
        appData.screenshots,
        appData.orderNo,
        appData.isToken,
      ]
    );
    res.send("Data added successfully");
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getAppsData = async (req, res) => {
  let pool = newConnection();
  try {
    let appData = await pool.query("SELECT * FROM app_data ORDER BY id");
    let resData = appData.rows.map((data) => {
      let screenshots = data.screenshots?.map((e) => {
        return JSON.parse(JSON.parse(JSON.stringify(e).replaceAll("\\\\", "")));
      });

      return {
        ...data,
        screenshots: screenshots,
      };
    });
    res.send(resData);
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getAppDoc = async (req, res) => {
  let pool = newConnection();
  let { id } = req.query;
  try {
    let appDoc = await pool.query("SELECT * from app_files where app_id= $1", [
      id,
    ]);

    res.json({ error: false, result: appDoc.rows });
  } catch (err) {
    res.json({ error: true, result: err.message });
  } finally {
    pool.end();
  }
};

const addAppDoc = async (req, res) => {
  let pool = newConnection();
  let appDocData = req.body;
  try {
    let getId = await pool.query(
      "SELECT id FROM app_data WHERE LOWER(name)=$1",
      [appDocData.name.toLowerCase()]
    );
    await pool.query(
      "INSERT INTO app_files (app_id,path,role,type,file_name,source) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        getId.rows[0].id,
        appDocData.path,
        appDocData.role,
        appDocData.type,
        appDocData.file_name,
        appDocData.source,
      ]
    );
    res.send("Data added successfully");
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

module.exports = {
  addAppsData,
  getAppsData,
  getAppDoc,
  addAppDoc,
};