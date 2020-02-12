const filter = fillable => obj => {
  const local = Object.assign({}, obj);
  Object.keys(local)
    .filter(
      v =>
        fillable.indexOf(v) === -1 ||
        local[v] === null ||
        local[v] === undefined
    )
    .forEach(v => {
      delete local[v];
    });
  return local;
};

const areaCode = area => {
  var codeIs = null;
  const areas = [
    { 서울: 1 },
    { 인천: 2 },
    { 대전: 3 },
    { 대구: 4 },
    { 광주: 5 },
    { 부산: 6 },
    { 울산: 7 },
    { 세종: 8 },
    { 경기도: 31 },
    { 강원도: 32 },
    { 충청북도: 33 },
    { 충청남도: 34 },
    { 경상북도: 35 },
    { 경상남도: 36 },
    { 전라북도: 37 },
    { 전라남도: 38 },
    { 제주도: 39 }
  ];
  for (var i = 0; i < areas.length; i++) {
    if (area == Object.keys(areas[i])) {
      codeIs = Object.values(areas[i]);
      codeIs = codeIs[0];
    }
  }
  return codeIs;
};

const strip_html_tags = str => {
  if (str === null || str === "") return false;
  else {
    str = str.toString();
  }
  return str.replace(/<[^>]*>/g, "");
};

module.exports = {
  filter,
  areaCode,
  strip_html_tags
};
