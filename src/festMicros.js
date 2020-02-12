const axios = require("axios");
const date = require("date-and-time");
const { strip_html_tags } = require("./helperFuncs");

const host = process.env.OPEN_KOREA_API;
const opnKey = process.env.OPEN_KOREA_KEY;

const festByDate = async (code, page) => {
  try {
    var plusWeek = date.addDays(new Date(), 7);
    plusWeek = date.format(plusWeek, "YYYYMMDD");
    var response = await axios.get(host + "/searchFestival", {
      params: {
        ServiceKey: opnKey,
        eventStartDate: date.format(new Date(), "YYYYMMDD"),
        eventEndDate: plusWeek,
        areaCode: code,
        listYN: "Y",
        MobileOS: "ETC",
        MobileApp: "ROUND",
        arrange: "O",
        numOfRows: 20,
        pageNo: page,
        _type: "json"
      }
    });
    if (
      response &&
      response.data &&
      response.data.response.body &&
      response.data.response.body.items &&
      response.data.response.body.items.item
    ) {
      let newArray = response.data.response.body.items;
      if (newArray.item && !newArray.item.length) {
        let item = newArray.item;
        item = await makeItem(item);
      } else {
        for (let i = 0; i < newArray.item.length; i++) {
          let item = newArray.item[i];
          item = await makeItem(item);
        }
      }
      newArray.info = {
        numOfRows: response.data.response.body.numOfRows,
        pageNo: response.data.response.body.pageNo,
        totalCount: response.data.response.body.totalCount
      };
      return newArray;
    }
    return null;
  } catch (err) {
    console.log("ERROR festByDate: ", err);
    return null;
  }
};

const festDetailCommons = async contentId => {
  try {
    var response = await axios.get(host + "/detailCommon", {
      params: {
        serviceKey: opnKey,
        MobileOS: "ETC",
        MobileApp: "ROUND",
        contentId: contentId,
        defaultYN: "Y",
        firstImageYN: "Y",
        areacodeYN: "Y",
        catcodeYN: "Y",
        addrinfoYN: "Y",
        mapinfoYN: "Y",
        overviewYN: "Y"
      }
    });
    if (
      response &&
      response.data &&
      response.data.response.body &&
      response.data.response.body.items &&
      response.data.response.body.items.item
    ) {
      let newArray = response.data.response.body.items.item;
      return newArray.overview;
    }
    return null;
  } catch (err) {
    console.log("ERROR getFestList: ", err);
  }
};

const festDetailIntro = async (contentId, typeId) => {
  try {
    var response = await axios.get(host + "/detailIntro", {
      params: {
        serviceKey: opnKey,
        MobileOS: "ETC",
        MobileApp: "ROUND",
        contentId: contentId,
        contentTypeId: typeId
      }
    });
    if (
      response &&
      response.data &&
      response.data.response.body &&
      response.data.response.body.items &&
      response.data.response.body.items.item
    ) {
      var newArray = {};
      response = response.data.response.body.items.item;
      if (response.eventhomepage) {
        newArray.web_url = strip_html_tags(response.eventhomepage);
      }
      if (response.usetimefestival) {
        newArray.price = strip_html_tags(response.usetimefestival);
      }
      newArray.subevent = response.subevent;
      newArray.place_type = response.eventplace;
      if (response.playtime)
        newArray.playtime = strip_html_tags(response.playtime);
      return newArray;
    }
    return null;
  } catch (err) {
    console.log("ERROR getFestList: ", err);
  }
};

const festDetailInfo = async (contentId, typeId) => {
  try {
    var response = await axios.get(host + "/detailInfo", {
      params: {
        serviceKey: opnKey,
        MobileOS: "ETC",
        MobileApp: "ROUND",
        contentId: contentId,
        contentTypeId: typeId
      }
    });
    return response.data.response.body.items;
  } catch (err) {
    console.log("ERROR getFestList: ", err);
  }
};

const festDetailImages = async (contentId, firstimage) => {
  try {
    var newArray = [];
    var response = await axios.get(host + "/detailImage", {
      params: {
        serviceKey: opnKey,
        MobileOS: "ETC",
        MobileApp: "ROUND",
        contentId: contentId,
        imageYN: "Y",
        subImageYN: "Y"
      }
    });
    if (
      response &&
      response.data &&
      response.data.response.body &&
      response.data.response.body.items &&
      response.data.response.body.items.item
    ) {
      response = response.data.response.body.items.item;
      for (let i = 0; i < response.length; i++) {
        if (response[i].originimgurl) {
          newArray.push({ url: response[i].originimgurl });
        }
      }
      return newArray;
    }
    return newArray;
  } catch (err) {
    console.log("ERROR getFestList: ", err);
  }
};

const getFestList = async (code, page) => {
  try {
    var festArray = null;
    festArray = await festByDate(code, page);
    if (!festArray && !festArray.item) {
      return null;
    }
    return festArray;
  } catch (err) {
    console.log("ERROR getFestList: ", err);
  }
};

const makeItem = async item => {
  if (item.addr1) {
    item.address = item.addr1;
    delete item.addr1;
  }
  if (item.tel) {
    item.tel_number = item.tel;
    delete item.tel;
  }
  item.place_name = item.title;
  delete item.title;

  item.address_map = {
    point: {
      longitude: item.mapx,
      latitude: item.mapy
    }
  };
  item.festDetailIntro = await festDetailIntro(
    item.contentid,
    item.contenttypeid
  );
  item.images = await festDetailImages(item.contentid);
  if (item.images && item.firstimage) {
    item.images.push({ url: item.firstimage });
    delete item.firstimage;
  }
  if (item.mapx) delete item.mapx;
  if (item.mapy) delete item.mapy;
  if (item.addr2) delete item.addr2;
  if (item.cat1) delete item.cat1;
  if (item.cat2) delete item.cat2;
  if (item.cat3) delete item.cat3;
  if (item.createdtime) delete item.createdtime;
  if (item.mlevel) delete item.mlevel;
  if (item.modifiedtime) delete item.modifiedtime;
  if (item.readcount) delete item.readcount;
  if (item.sigungucode) delete item.sigungucode;
  if (item.areacode) delete item.areacode;
  if (item.firstimage2) delete item.firstimage2;
  delete item.contentid;
  delete item.contenttypeid;
  return item;
};

module.exports = {
  festByDate,
  getFestList,
  festDetailCommons,
  festDetailIntro,
  festDetailInfo,
  festDetailImages
};
