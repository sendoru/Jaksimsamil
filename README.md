# Jaksimsamil

![license badge](https://img.shields.io/github/license/FacerAin/OSS-Jaksimsamil)

## Project Overview

> **Jaksaimsamil Algorithm Study Helper Service**
>
> 작심삼일 알고리즘 문제풀이 도우미 서비스<br/>
>
> > 알고리즘 문제 풀이 스터디를 꾸준히 할 수 있게 돕는 웹 서비스입니다.
> > <br> [링크](http://facerain.dcom.club)에서 직접 사용해 보세요!

![그림1](https://i.imgur.com/gwX8n0U.png)

![그림2](https://i.imgur.com/EhgBOCS.png)

## Features

#### ver 1.0.0
- 회원가입/로그인 제공
- Online Judge 연동 가능 (Baekjoon)
- 나의 학습 현황 한눈에 보기
- 추천 문제 제공
- Slack 알리미

#### ver 1.1.0 (2021.12.09)
- solved.ac 연동 기능
- 나의 현재 실력 보기
- 사용자 실력 맞춤형 문제 추천
- 실전형 코딩 테스트 모의고사 제공

## Upcoming Features

#### 기능 측면
- 개선된 코딩 테스트 모의고사 (ICPC 및 Codeforces 스타일 점수 책정)
- 백준 동기화 속도 개선
- 사용자의 강점/단점을 분석해 알고리즘 분류 별 문제 추천
- 친구 추가 및 친구와의 경쟁 (코딩 테스트 모의고사와 연동)
- 더욱 편리한 Slack 연동 및 타 메신저 지원
- 비밀번호 변경 등 미구현된 계정 관리 기능 추가

#### UI/UX 측면
- 다크 모드 지원
- 개선된 반응형 웹 디자인 (모바일 지원)

## Usages

#### 회원

1. 로그인하여 서비스에 접속 할 수 있습니다.
2. 서비스가 처음이라면, 회원가입을 하세요.
   <br>

#### 설정

1. 백준 아이디를 등록하고 동기화하세요.
2. 슬랙 HOOK URL을 등록하세요.
3. 일일 목표량을 등록하세요.

#### 유의사항

완전한 서비스를 이용하기 위해서는, 먼저 <a href=solved.ac>solved.ac</a>에서 백준 계정과 solved.ac를 연동해 주세요. <br>
연동하지 않아도 서비스를 이용할 수는 있지만, 개인 실력에 맞춰 문제가 제공되지 않고 이미 푼 문제를 다시 추천할 수도 있습니다.

## Getting Started

### 1. Clone

```
git clone http://khuhub.khu.ac.kr/2019103980/Jaksimsamil.git
```

### 2. Install MongoDB

#### 2-1. Ubuntu, WSL

```
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start
```

#### 2-2. Windows

https://www.mongodb.com/try/download/community 에서 Windows용 mongodb를 다운로드 할 수 있습니다.

### 3. Set Serverfile

```
cd jaksimsamil-server
touch .env
---TYPE THIS IN FILE----
SERVER_PORT= ###
MONGO_URL= ###
JWT_SECRET= ###
```

### 4. Start Node Server

```
cd jaksimsamil-server
sudo npm install
npm start
```

[링크](/jaksimsamil-server/README.md)에서 API 제공 목록 및 DB Schema를 볼 수 있습니다.
<br>

### 5. Set Front-end page

```
cd ..
cd jaksimsamil-page
sudo npm install
npm start #Start React
```

## Contributing

컨트리뷰션은 언제나 환영입니다. 다음 절차를 지켜주세요!

1. Fork the Project
2. Create your Feature Branch
3. Commit our changes
4. Push to Branch
5. Open a Pull Request

## License

- MIT LICENCE

## Contact

- sendol39@gmail.com
- sendol39@khu.ac.kr
