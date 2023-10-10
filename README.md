#  :star: CRUD project
> **CRUD** :  **C**onference & **R**eview for **U** ! **D**eveloper.
>
> 개발자를 위한 컨퍼런스와 컨퍼런스에 대한 리뷰를 공유하는 웹 사이트입니다.
>
> 
![image](https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/07adf958-a965-4684-bd04-d39287e15268)


## About Project :point_down:
> [프로젝트 배포 주소](http://101.101.208.109:8000)
>
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

 ## How To Start?
 - **config/config.json**
   ```
   {
      "development": {
          "username": "user",
          "password": "q1w2e3r41234!",
          "database": "project1",
          "host": "101.101.208.109",
          "dialect": "mysql"
      },
      "sessionSecretKey": "my1secret2key3@"
    }

- **module install**
  ```
  npm install
- **start**
  ```
  node app.js
- **localhost: 8000 사용**
   

---

## 페이지 상세 내역
![image](https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/e2bdd6ad-8a96-4019-8078-ce157be75e92)

---
## 화면 구성
|메인페이지|메인페이지| 
|:---:|:---:| 
|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/07adf958-a965-4684-bd04-d39287e15268" width="6000" height="500">|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/1fd801c8-eadc-4dee-a509-fda1a9489f87" width="6000" height="500">| 

|로그인|회원가입| 
|:---:|:---:| 
|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/a885f1e0-72e6-4bd5-bf3e-1c9998e0fa4f" width="6000" height="500">|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/22928f44-7fc1-401c-a891-c6d732a7c2a4" width="6000" height="500">| 

|행사캘린더|행사목록| 
|:---:|:---:| 
|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/0ac40644-02e9-4067-83b7-d99ee30ae9e9" width="6000" height="500">|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/2f7f2fed-805d-4513-97cb-ecbf2a8e7aa5" width="6000" height="500">| 

|행사상세 페이지|행사상세 페이지| 
|:---:|:---:| 
|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/f1519446-cc7c-43c4-94d0-c5884481210e" width="6000" height="500">|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/0f8f6564-710e-4b30-8c95-3e88ab91e1e6" width="6000" height="500">| 

|행사등록 페이지|행사등록 페이지| 
|:---:|:---:| 
|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/427030e5-5c9c-4100-a4d6-bbacba12d7e3" width="6000" height="500">|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/5e1b60b3-4b4e-4f4e-88cb-9b948e9ead70" width="6000" height="500">| 

|리뷰목록|리뷰상세| 
|:---:|:---:| 
|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/8ebf39fc-a461-4bad-83c7-f1333ca431b3" width="6000" height="500">|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/7587fdaa-67a0-4c9c-b2b0-cc624000f2ee" width="6000" height="500">| 

|마이페이지|관리자페이지| 
|:---:|:---:| 
|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/2776e79a-5b87-4e6b-a57a-cf3bde8a9a83" width="6000" height="500">|<img src="https://github.com/sesac-ydp5-pullAmen/Dev_Conference_Info_Service/assets/113359008/b1dfa0cf-58a3-4f6e-a128-dff7a96a0bfa" width="6000" height="500">| 

