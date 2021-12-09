# Jaksimsamil Server Documentation

## Overview

- KOA 프레임워크 기반의 REST-API로 동작합니다.
- API 문서와 DB Schema는 아래를 참고해주세요.

## Usage

- Starting Server

```
npm install
npm update
node index.js
```

## Example

```
POST {your_url}/api/profile/getprofile
{
    username: 'syw5141',
}
```
## DB Schema

#### user
```
{
    username: string,
    hashedPassword: string
}
```
#### profile
```
{
    friendList: string Array,
    username: string,
    solvedBJ: problem Array,
    solvedBJ_date: solvedBJ_date,
    userBJID: string,
    goalNum: int,
    userRating: int,
    userTier: int,
    slackWebHookURL: string,
    testInfo: testInfo,
}
```

#### problem
```
{
    problem_number: string,
    problem_title: string,
    problem_level: int,
    solved_date: string
}
```

#### solvedBJ_date
```
{
    latestDate: string,
    difflatest: int,
    latestNum: int,
    presentNum: int,
    weekNum: int,
    monthNum: int,
    totalNum: int,
    solvedBJbyDate: 
    {
        int: int,
        int: int,
        ...
    },
    latestSolve: problem,
    recommend_data: problem Array[3]
}
```

#### testInfo
```
{
    inProgress: bool,
    div: string,
    testProblemData: problem Array,
    solved: bool Array,
    startTime: double
}
```
## API Table

| group   | description                            | method | URL                     | Auth      |
| ------- | -------------------------------------- | ------ | ----------------------- | --------- |
| profile | 유저가 푼 문제 조회(백준)              | GET    | api/profile/solvedBJ:id | None      |
| profile | 유저가 푼 문제 동기화(백준)            | PATCH  | api/profile/syncBJ      | None      |
| profile | 유저의 코딩 테스트 모의고사 시작       | PATCH  | api/profile/inittest    | None      |
| profile | 유저의 코딩 테스트 모의고사 상태 업데이트 | PATCH  | api/profile/updatetest | None      |
| profile | 유저의 코딩 테스트 모의고사 종료        | PATCH  | api/profile/giveuptest   | None      |
| profile | 유저 정보 수정                         | POST   | api/profile/setprofile  | JWT TOKEN |
| profile | 유저 정보 받아오기                     | POST   | api/profile/getprofile  | JWT       |
| notify  | 슬랙 메시지 전송 요청 (목표 성취 여부) | POST   | api/notify/goal         | Jwt Token |
| notify  | 슬랙 메시지 전송 요청 (문제 추천)      | POST   | api/notify/recommend    | None      |
| auth    | 로그인                                 | POST   | api/auth/login          | None      |
| auth    | 로그아웃                               | POST   | api/auth/logout         | JWT Token |
| auth    | 회원가입                               | POST   | api/auth/register       | None      |
| auth    | 로그인 확인                            | GET    | api/auth/check          | None      |

#### POST /api/profile/getprofile
request.body:
```
{
    username: "username"
}
```
response.body: profile

#### POST /api/proflie/setprofile
request.body:
```
{
    username: "username",
    userBJID: "userBJID",
    friendList: [String],
}
```
response.body: profile

#### PATCH /api/proflie/syncBJ
request.body:
```
{
    username: "username",
}
```
response.body: profile

#### PATCH /api/proflie/inittest
request.body:
```
{
    username: "username",
    div: Number
}
```
response.body: profile

#### PATCH /api/proflie/updatetest
request.body:
```
{
    username: "username",
}
```
response.body: profile

#### PATCH /api/proflie/giveuptest
request.body:
```
{
    username: "username",
}
```
response.body: profile

#### POST api/notify/slack/goal
request.body:
```
{
    username: "username",
}
```
response.body: none


#### POST api/notify/slack/recommend
request.body:
```
{
    username: "username",
}
```
response.body: none

#### POST /api/auth/register
request.body:
```
{
    username: 'username'
    password: 'userpassword'
}
```
response.body: profile

#### POST /api/auth/login
request.body:
```
{
    username: 'username'
    password: 'userpassword'
}
```
response.body: user

#### GET api/auth/check
request.body: none
response.body: user

#### POST /api/auth/logout
request.body: none
response.body: none

####