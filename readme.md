# Fest List

Korea's Festival Calendar for get list of festivals by city

# Getting Started

first of all you should registrate on [DATA.OR.KR](https://www.data.go.kr/) and get API_ADDRESS/KEY for use this API 

create and put your API_ADDRESS and API KEY as below. 
```
OPEN_KOREA_API = your_api_address
OPEN_KOREA_KEY = your_api_key
```

after that run the server as:
``` 
npm i
nodemon server.js
```
--
```
GET localhost:3004/fest?city=서울&page=1
```
available areas
```
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
```

# TODO List 
get List by date

# License 
MIT

