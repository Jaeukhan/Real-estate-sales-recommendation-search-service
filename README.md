# Real-estate-sales-recommendation-search-service PJT - 한재욱 백자민

# 1. 프로젝트 목표 및 개발 배경

### 개발 배경

1. 인프라 기준 매물 검색 서비스는 존재하지만, 매물 기반으로 인프라 검색을 사이트는 보지 못하였음. 선택한 매물 기준으로 사용자 맞춤형 웹 페이지를 제공 받고 싶어 프로젝트 주제를 선정함.

2. 여러가지 복잡한 UI가 아닌, 선택한 키워드를 중심으로 인프라를 제공 받고 싶어, 선택형 맞춤 매물 웹 서비스 개발.

### 프로젝트 목표

- 사용자가 선택한 교육시설 및 편의시설 정보를 확인 할 수 있는 매물 정보 서비스를 제공.

# 2. 사용한 API 및 데이터 출처

- API
  - kakao map
  - vue-chart.js
  - 국토교통부\_아파트매매 실거래 상세 자료
  - 국토교통부 연립다세대 매매 실거래 자료
  - 경기도 유치원 현황
  - 경기도 초등학교 현황
  - 경기도 중학교현황
  - 경기도 고등학교 현황
  - 경기도 주차장 정보 현황(개방표준)
  - 경기도 시장 및 마트 현황
  - 경기도 공공 도서관 현황
  - DialogFlow API(챗봇)
- 데이터
  - 국토교통부 전국 버스정류장 위치정보
  - 한국부동산원*전국주택가격동향조사*월간동향*아파트*매매가격

# 3. 역할 분담 및 개발 일정

![Untitled](readme_image/Untitled.png)

![Untitled](readme_image/Untitled%201.png)

# 4. 개발 일정

![Untitled](readme_image/Untitled%202.png)
![Untitled](readme_image/Untitled%203.png)

# 5. 화면 상세

### 메인 화면

![Untitled](readme_image/Untitled%204.png)

- 홈화면 : 게시판, 맵(매물검색), 챗봇, 로그인, 회원가입으로 nav bar 구성

### 부동산 실시간 뉴스 크롤링

![Untitled](readme_image/Untitled%205.png)

- 실시간 3개의 네이버 부동산 뉴스를 크롤링해서 화면에 노출
- 제목 클릭 시 부동산 뉴스 링크로 이동

### 챗봇 API

- 사용자 질문을 답해줄 수 있는 대화형 챗봇

### 게시판 글 등록 수정 삭제, 인기글 모아보기

![Untitled](readme_image/Untitled%206.png)

- 게시판 메인 컴포넌트 이동시 게시판 글 목록을 화면에 노출(BoardList.vue)
- 하단 인기 게시판에서 조회수 높은 기준으로 3개를 보여줌.

![Untitled](readme_image/Untitled%207.png)

- Write 버튼 클릭 시 글작성이 가능한 컴포넌트로 전환(BoardWrite.vue)
- check icon 클릭 시 게시글을 데이터베이스에 저장
- 초기화 버튼 클릭 시 전체 내용 초기화

![Untitled](readme_image/Untitled%208.png)

- 게시글 제목 클릭 시 게시글 상세 내용을 표시하는 컴포넌트로 전환(BoardDetail.vue)
- 글 수정 및 삭제 버튼을 통한 게시글 내용 수정, 게시글 삭제 처리 가능
- 댓글 입력 후 완료 버튼 클릭 시 데이터베이스에 댓글 내용 저장

### 회원가입

![Untitled](readme_image/Untitled%209.png)

- sign 네비게이션 바 클릭시 회원 가입 화면으로 전환(MemberRegist.vue)
- 사용자 정보 작성 후 sign up버튼 클릭시 사용자 정보를 데이터 베이스에 저장

### 로그인

![Untitled](readme_image/Untitled%2010.png)

- Login 네비게이션 바 클릭시 로그인 화면으로 전환(MemberLogin.vue)
- 데이터베이스에 사용자 정보가 저장되어 있다면 로그인 성공

### 회원정보 변경

![Untitled](readme_image/Untitled%2011.png)

- MYPAGE에 네비게이션 바 클릭시 사용자 정보를 수정할 수 있는 MYPAGE로 이동
- 정보 수정후 체크 아이콘 클릭시, 수정한 정보를 데이터베이스에서 변경

![Untitled](readme_image/Untitled%2012.png)

- 이름과 이메을 변경 후 화면

### 마이페이지 - 사용자 관심 키워드 선택

![Untitled](readme_image/Untitled%2013.png)

- 마이페이지 Custom keyword에서 추가 버튼 클릭시 선택할 수 있는 KEYWORD제공
- 선택한 키워드에 따라 매물 검색에서 유사도가 높은 인프라를 볼 수 있도록 구현

![Untitled](readme_image/Untitled%2014.png)

- 키워드를 선택 한 모습(자가용, 대중교통, 유치원생, 아파트, 도서관, 마트)

### 아파트, 부동산 매물 검색

![Untitled](readme_image/Untitled%2015.png)

- MAP 네비게이션 바 클릭시 매물 검색을 할 수 있는 화면으로 전환(MapList.vue)
- 시,군 정보를 각각 선택할 때 마다 DB에서 목록을 가져와 select box에 넣어줌.
- 검색 버튼 클릭 시 시, 군, 날짜 데이터를 가지고 API를 통해 매물 정보를 가져옴.
- 매물 데이터에 도로명 주소를 가지고 지도에 위치 출력
  ![Untitled](readme_image/Untitled%2016.png)
- 매물정보를 테이블에서 확인 가능, 지도 보기 클릭 시 도로명 주소를 가지고, 지도에 현위치 이동
- 자세히 보기를 통해 매물에 상세 데이터 확인 가능.
- 하트 아이콘 클릭시 관심 매물 지정.

### 관심 키워드에 따른 검색한 매물주변 인프라 검색

![Untitled](readme_image/Untitled%2017.png)

- 마이페이지에 추가한 관심 키워드 위주로 선택한 매물 주변 탐색
- 매물 중심으로 400M이내에 인프라가 존재하면 지도에 마커로 표시

### 검색한 매물 주변 매물 가격 동향 및 실시간 날씨

![Untitled](readme_image/Untitled%2018.png)

- 선택한 매물 중심으로 DB에 있는 최근 1년 가격을 불러와 매물 동향을 출력
- 선택한 매물 중심으로 api를 통해 데이터를 불러와 실시간 날씨를 출력

### 회원 탈퇴

![Untitled](readme_image/Untitled%2019.png)

- 빨간색 쓰레기 통 아이콘 클릭시 탈퇴 후 데이터에이스에서 데이터 제거.

# 6. 기능 상세

### 1) 요구사항 정의서(Usecase Diagram)

![Untitled Diagram.drawio (1).png](readme_image/Untitled_Diagram.drawio.png)

### 2) 테이블 구조도(ERD)

![Untitled](readme_image/Untitled%2020.png)

3. 클래스 다이억 그램

![1)configuration naver transport board.PNG](readme_image/configuration_naver_transport_board.png)
![2)chart comment mart news housemap.PNG](readme_image/chart_comment_mart_news_housemap.png)

# 7. 개발 후기

![lastimg.jpg](readme_image/lastimg.jpg)

- 한재욱
  - 웹 제작에 있어서 디자인 하는 것이 참 어려운 것 같다. 페어인 자민이가 미적 감각이 있는 덕분에 디자인 부분은 편하게 진행같아서 고맙다.
    DB로 사용한 데이터가 더 좋았다면 좀더 좋은 프로젝트가 되었을 것 같다. 시간은 이 항상 촉박해서 스트레스를 받았었지만, 기능이 하나 씩 구현될 때마다 재미를 느꼈던 것 같다.
- 백자민
  - 한정된 시간 안에 다양한 기능을 구현하려고 하다 보니 막막했는데, 페어와 함께 진행해서 차근차근 해 나갈 수 있었다. 시간이 부족해서 포기한 부분들이 조금 아쉬웠지만 하나의 결과물을 완성했다는 사실이 뿌듯했고, 1학기 동안 배운 지식들을 직접 프로젝트에 활용해볼 수 있어서 의미있는 시간이었다.
