# It's my seat!

## Development

- client : react, redux, react-router
- server : mongodb, nodeJS, express, socket.io
- deploy : netlify, aws

## Prerequisites

- [React](https://reactjs-kr.firebaseapp.com/) - latest
- [react-router](https://reacttraining.com/react-router/web/guides/quick-start) - latest
- [redux](https://redux.js.org/) - latest
- [Node.js](https://nodejs.org/en/download/) - latest
- [express](https://expressjs.com/ko/) - latest
- [mongodb](https://www.mongodb.com) - latest
- [socket.io](https://socket.io/) - ^2.3.0
- [axios](https://www.npmjs.com/package/axios) - latest
- [passport.js](http://www.passportjs.org/) - ^0.4.0


## 사용자

## TODO

### 1. 계정 페이지

#### 1-1. 로그인 페이지

- 로컬 회원가입 및 로그인 또는 google 소셜 로그인을 사용해야 합니다.
- 로그인 성공하면 메인 페이지로 이동해야 합니다.
- 로그인은 하루 동안 유지 됩니다.
- 로그인이 실패하면 로그인 페이지로 다시 돌아와야 합니다.
- 로그인 하지 않은 사용자는 로그인, 회원가입 페이지 이외 어떤 페이지도 방문할 수 없습니다.

#### 1-2. 회원가입 페이지

- 사용자는 ID, passward, 이름을 입력합니다.
- ID는 email 형식으로 입력하며 중복시 중복 알림을 띄웁니다.
- passward는 중복체크 하여 다를시 두 passward가 다름을 알립니다.
- 회원가입 완료시 로그인 페이지로 이동합니다.

#### Resoures

- [React](https://reactjs-kr.firebaseapp.com/)
- [passport.js](http://www.passportjs.org/)
- [express](https://expressjs.com/ko/)
- [cookie-session](https://expressjs.com/en/resources/middleware/cookie-session.html)
- [express-session](https://expressjs.com/en/resources/middleware/session.html)
- [connect-flash](https://www.npmjs.com/package/connect-flash)

### 2. 메인 페이지

#### 2-1. 좌석

- 현재 고객이 앉거나 앉지 않은 의자 배치현황을 보여줘야 합니다.
- 의자에 앉은 고객을 클릭시 카페 이용 만료시간을 보여줘야 합니다.
- 이용 시간 만료시 자동으로 고객이 없는 의자 표시로 바뀌어야 합니다.
- 남은 의자의 갯수를 알려줘야 합니다.
- 좌석 선택시 메뉴를 선택하지 않았다면 메뉴선택 화면으로 이동해야 합니다.
- 메뉴를 선택하고 좌석을 선택했다면 결제화면으로 이동해야 합니다.

#### Resoures

- [axios](https://www.npmjs.com/package/axios)
- [ajax](https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started)

#### 2-2. 메뉴

- 카페 메뉴와 잔여좌석을 보여줘야합니다.
- 좌석을 선택하고, 메뉴를 선택하면 좌하단에 선택사항을 보어줘야합니다.
- 결제 버튼을 누르면 결제창으로 이동합니다.

#### 2-3 결제

- 결제가 완료되면 좌석이 확정 및 관리자에게 주문이 들어가야 합니다.
- 좌석 만료의 초기값은 2시간 입니다.
- 결제 자체에 대한 과정은 생략합니다.



## 관리자

## TODO

### 1. 주문확인

- 들어온 주문을 확인해야 합니다.
- 주문에는 주문자, 주문 메뉴명, 주문 시간 (몇 분전), 완료 버튼이 있어야 합니다.
- 완료 버튼 클릭시 주문은 사라져야 합니다.

#### Resources

- [React](https://reactjs-kr.firebaseapp.com/)
- [socket.io](https://socket.io/)
- [mongodb](https://www.mongodb.com/)

### 2. 배치현황

- 현재 고객이 앉거나 앉지 않은 의자 배치 현황을 보여줘야 합니다.
- 앉은 고객을 클릭시 카페 이용 만료시간을 보여줘야 합니다.
- 관리자는 카페 이용 만료 시간을 연장할 수 있습니다.
- 이용 시간 만료시 자동으로 의자는 고객이 없는 의자 바뀌어야 합니다.
- 남은 의자의 갯수를 알려줘야 합니다.

### 3. 배치조정

- 카페 의자의 배치를 조정해야합니다.
- 카페 구조 범위 조절이 가능해야 합니다. (10x10, 13x13 등등...)

#### Resources

- [react-dnd](https://react-dnd.github.io/)
- [react-sortablejs](https://www.npmjs.com/package/react-sortablejs)

### 4. 메뉴 조정

- 관리자는 메뉴를 바꿀 수 있어야 합니다.

### 3. Extra

#### 3.1 이메인 인증 후 회원가입

- 사용자는 이메일 인증 후 회원가입이 가능합니다

#### Resources

- [nodemailer](https://victorydntmd.tistory.com/113)

#### 3.2 관리자와 사용자간 실시간 대화

- 관리자는 사용자와 웹을 통해 대화하여 좌석 만료시간을 늘려야 합니다.

#### Resources

- [socket.io](https://socket.io/)
