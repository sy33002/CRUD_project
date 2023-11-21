#  :star: CRUD project
> **CRUD** :  **C**onference & **R**eview for **U** ! **D**eveloper.
>
> 개발자를 위한 컨퍼런스와 컨퍼런스에 대한 리뷰를 공유하는 웹 사이트입니다.
>
> 
![image](https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/07adf958-a965-4684-bd04-d39287e15268)


## About Project :point_down:
> [프로젝트 배포 주소](http://43.201.244.219:8001/)

* 프로젝트 기간: 2023.09.06 ~ 2023.09.22
  
* 프로젝트 주제: CRUD
  
* **주로 어떤 정보를 제공하는가? :mag:**
  1. 오직 { 개발 }에 관련된 컨퍼런스 정보 제공
  2. 지난 컨퍼런스에 대한 유저들의 리뷰 공유
     
* **왜 프로젝트를 만들게 되었는가? :sound:**
  1. 개발에 특화된 컨퍼런스, 웨비나와 같은 다양한 행사 관련 정보를 한눈에 볼 수 있는 니즈가 존재
  2. 컨퍼런스에 대한 유저의 다양한 리뷰들을 보고 싶은 니즈가 존재
  3. crud라는 프로젝트 주제에 맞추어 행사등록, 리뷰등록, 마이페이지를 통해 crud 구현

* **주요 기능 :exclamation:**
  1. 컨퍼런스 카테고리와 지역 등 옵셔널한 달력 제공
  2. 행사 리스트와 상세 보기 페이지, 찜하기 기능 제공
  3. 각 행사에 대한 사용자 리뷰 기능 제공
  4. 관리자 페이지를 통해 유저관리, 행사 관리 기능 제공
  5. 마이페이지 찜한 행사, 리뷰 관리 기능 제공
---

## 팀 소개 :point_down:
* **backend**
  
  > 김지형 (https://github.com/sy33002) : 마이페이지 & 관리자 페이지 기능 구현
  >
  > 김세은 (https://github.com/seeun0210) : 행사 달력 & 행사 상세페이지 기능 구현
  >
  > 이재민 (https://github.com/flashrifle) : 웹 배포 & DB 관리 & 리뷰 페이지 기능 구현

* **frontend**
  
  > 문석민 (https://github.com/msm0748): 행사 달력 & 행사 상세페이지 & 리뷰페이지 구현
  >
  > 최제윤 (https://github.com/lemon4974): 마이페이지 & 관리자페이지& 메인페이지 구현
    
---

## 개발 환경 :point_down:

-   개발도구 : <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=#007ACC"/>
-   버전 관리 도구: <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/>
-   커뮤니케이션 도구: <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=Discord&logoColor=white"/>
-   DB 관리 도구: <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>

## 사용 기술 :point_down:

-   언어 : <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/>
-   프레임워크 : <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
-   배포 : <img src="https://img.shields.io/badge/Naver-03C75A?style=flat&logo=Naver&logoColor=white"/>

---

## 팀 노션 :point_down:
-  https://www.notion.so/1-Project-f37b8f752d3d42e68d4c22b9ea44b9cf


---

## 사용 라이브러리

- axios: ^1.5.0

- badwords-ko: ^1.0.3

- bcrypt: ^5.1.1

- cheerio: ^1.0.0-rc.12

- cookie-parser: ^1.4.6

- cross-env: ^7.0.3

- dotenv: ^16.3.1

- ejs: ^3.1.9

- express: ^4.18.2

- express-session: ^1.17.3

- moment: ^2.29.4

- multer: ^1.4.5-lts.1

- mysql2: ^3.6.0

- nodemailer: ^6.9.5

- request-ip: ^3.3.0

- sequelize: ^6.32.1

- sequelize-cli: ^6.6.1

- sharp: ^0.32.6

---

## 페이지 상세 내역
![image](https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/e2bdd6ad-8a96-4019-8078-ce157be75e92)

---
## 화면 구성
<div align="center">
  
|메인페이지|
|:---:| 
|<img src="https://github.com/sy33002/sy33002/assets/113359008/f66c9e30-0098-4a43-a3c7-da755b2af716" width="700" height="400">

|행사캘린더|행사목록|
|:---:|:---:| 
|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/f53896d5-acf3-4c79-a0eb-03af85050b74" width="400" height="300">|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/79952c89-e541-4768-ac0e-b433a0b91ba3" width="400" height="300">| 


|행사상세 페이지|행사등록 페이지| 
|:---:|:---:| 
|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/0f7b9afa-2e6e-4808-b2e5-4aba25008c24" width="400" height="300">|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/515d1d13-511a-4f36-914e-1925250d9023" width="400" height="300">| 

|리뷰목록 및 상세 페이지|리뷰 등록 페이지|
|:---:|:---:| 
|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/0b7c41d4-a515-4538-b0a4-96ea60d04556" width="400" height="300">|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/4fad0112-98a5-4940-a433-2a29ca1a3dc0" width="400" height="300">| 

|로그인|회원가입| 
|:---:|:---:| 
|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/e48ec303-b722-482d-a195-45898e2ff597" width="400" height="300">|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/eee58ce2-c315-4607-a396-a0944b9d5044" width="400" height="300">| 

|마이페이지|관리자페이지| 
|:---:|:---:| 
|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/a4eb00b3-886a-42e3-9e52-7a3453b64281" width="400" height="300">|<img src="https://github.com/sy33002/CRUD_project/assets/113359008/b341b329-c577-46a7-b450-e3ea666ab855" width="400" height="300">| 
</div>

