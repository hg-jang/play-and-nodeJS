# Play, And[Play, &]

## 개요
테니스 동아리 활동과 Ello Rating System에 착안하여 시작한 프로젝트입니다.<br />
Play And 라는 이름은 즐겁게 운동한 이후의 여운을 해소한다는 의미를 함축적으로 표현하였습니다.

![main](https://user-images.githubusercontent.com/48178101/127119650-2146d1e0-5aad-48b0-aa9b-d38c2ed66ba6.png)
___
## 제작자
https://github.com/gilmujjang : Admin 페이지와 Ello Rating System 담당<br />
https://github.com/Hyeon-Gwang : 메인 페이지와 Public 페이지 담당

2인 제작이며 모두 프론트엔드 개발을 하기에 백엔드는 파이어베이스를 이용하였습니다.
___
## 사용 기술
<img src="https://img.shields.io/badge/HTML-eb4d4b?style=for-the-badge&logo=HTML5&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/CSS-22a6b3?style=for-the-badge&logo=CSS3&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Next.JS-30336b?style=for-the-badge&logo=Next.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/FIREBASE-f9ca24?style=for-the-badge&logo=Firebase&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Semantic UI React-eb4d4b?style=for-the-badge&logo=Semantic UI React&logoColor=white">
___

## 특징
프론으엔드는 Next JS, 백엔드는 파이어베이스를 이용하였습니다.
기능적인 특징으로는 레이팅 책정, 랭킹 확인, 게시판, 멤버 상세정보 확인 기능이 있습니다.

![리스트_censored](https://user-images.githubusercontent.com/48178101/127119925-b2d3ef4e-b70b-4e76-8dc3-2a2ce5337a6a.jpg)
![상세_censored](https://user-images.githubusercontent.com/48178101/127119940-771c6186-3709-4028-a97b-ec19919f59ef.jpg)
___

# 레이팅 책정 방법
...

# 버전 정보
## v1
## v1
- 구글을 통한 회원가입
- 그룹 생성/가입 가능
- 그룹 멤버들의 레이팅 순위 확인 가능
- 그룹 멤버들에 한하여 멤버들의 개인기록(경기기록, 레이팅 변화, 전적) 확인 가능
- 그룹 관리자에 한하여 멤버의 경기기록 추가 가능
- 포스팅 가능
- 주의!
  - 그룹에 가입한 사람(멤버)과 관리자가 생성한 플레이어는 별도의 존재
  - 멤버는 그룹 페이지 접속 권한과 포스팅 권한만 있을뿐
  - 관리자가 그룹 내의 플레이어 정보를 생성하고 관리해주어야 함
___
**v2부터는 Hyeon-Gwang 혼자서 개인적으로 작업하였습니다.**
___
## v2(release 2021.10.11)
- redux와 redux-saga의 도입
- 전반적인 재수정으로 자잘한 오류 수정
- 구글을 통한 회원가입 삭제/임의의 이메일로 회원가입 가능
- 프로필 사진 변경과 이름 변경 가능
- 포스팅 기능 재작업과 채팅 기능 추가
- 관리자 페이지 내부를 영역별로 나누었음
- v1에 있던 멤버와 플레이어의 구분을 삭제 => 멤버가 그룹에 가입하면 가입한 멤버의 정보를 기반으로 경기 기록 관리