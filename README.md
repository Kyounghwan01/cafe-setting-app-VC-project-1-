# It's my seat!

## Development

- client : react(관리자), react-native(소비자), redux
- server : mongodb, nodeJS, express, socket.io
- deploy : netlify, aws

## Prerequisites

- [React](https://reactjs-kr.firebaseapp.com/) - latest
- [React-native](https://facebook.github.io/react-native/) - latest
- [Node.js](https://nodejs.org/en/download/) - latest
- [express](https://expressjs.com/ko/) - latest
- [mongodb](https://www.mongodb.com) - latest
- [socket.io](https://socket.io/) - ^2.3.0
- [axios](https://www.npmjs.com/package/axios) - latest
- [passport.js](http://www.passportjs.org/) - ^0.4.0
- [passport-google-oauth20](https://www.npmjs.com/package/passport-google-oauth20) - ^1.0.0
- [iamport-react-native](https://github.com/iamport/iamport-react-native) - ^1.2.3


## 관리자

## TODO

### 1. 주문확인

- 실시간으로 들어온 주문을 확인해야 합니다.
- 주문에는 주문자, 주문 메뉴명, 주문 시간 (몇 분전), 주문완료 버튼이 있어야 합니다.
- 주문완료 버튼 클릭시 주문은 사라져야 합니다.

#### Resources

- [React](https://reactjs-kr.firebaseapp.com/)
- [socket.io](https://socket.io/)
- [mongodb](https://www.mongodb.com/)

### 2. 배치현황

- 실시간으로 현재 고객이 앉거나 앉지 않은 의자 배치현황을 보여줘야 합니다.
- 의자에 앉은 고객을 클릭시 카페 이용 만료시간을 보여줘야 합니다.
- 이용 시간 만료시 자동으로 고객이 없는 의자 표시로 바뀌어야 합니다.
- 만료연장이 가능해야 합니다.
- 남은 의자의 갯수를 알려줘야 합니다.

### 3. 배치조정

- 카페 의자의 배치를 조정해야합니다.

## 소비자

## TODO

### 1. 로그인 페이지

- 로컬 회원가입 및 로그인 또는 google 소셜 로그인을 사용해야 합니다.
- 로그인 성공하면 메인 페이지로 이동해야 합니다.
- 로그인이 실패하면 로그인 페이지로 다시 돌아와야 합니다.
- 로그인 하지 않은 사용자는 로그인, 회원가입 페이지 이외 어떤 패이지도 방문할 수 없습니다.

#### Resoures

- [React-native](https://facebook.github.io/react-native/)
- [passport.js](http://www.passportjs.org/)
- [passport-google-oauth20](https://www.npmjs.com/package/passport-google-oauth20)

### 2. 메인 페이지

#### 2-1. 좌석

- 실시간으로 현재 고객이 앉거나 앉지 않은 의자 배치현황을 보여줘야 합니다.
- 의자에 앉은 고객을 클릭시 카페 이용 만료시간을 보여줘야 합니다.
- 이용 시간 만료시 자동으로 고객이 없는 의자 표시로 바뀌어야 합니다.
- 남은 의자의 갯수를 알려줘야 합니다.
- 좌석 선택시 메뉴를 선택하지 않았다면 메뉴선택 화면으로 이동해야 합니다.
- 메뉴를 선택하고 좌석을 선택했다면 결제화면으로 이동해야 합니다.

#### Resoures

- [axios](https://www.npmjs.com/package/axios)
- [socket.io](https://socket.io/)

#### 2-2. 메뉴

- 카페 메뉴를 보여줘야합니다. 메뉴 클릭시 메뉴에 대한 상세내용을 보여줘야합니다,
- 상세내용에는 메뉴 이미지, 메뉴 이름, 메뉴 가격이 있고, 소비자는 메뉴의 갯수, 메뉴의 크기를 선택해야 합니다.
- 담기, 주문 버튼이 있어야합니다.
- 담기 버튼 클릭시 이전 메뉴 모음 페이지로 이동해야합니다.
- 주문 버튼 클릭시 좌석을 선택하지 않았다면 좌석 화면으로 이동해야 합니다.
- 좌석을 선택했다면, 결제화면으로 이동해야 합니다.

#### 2-3 결제

- 좌석 및 메뉴 선택을 완료했다면 결제를 진행합니다.
- 정상적으로 완료됬다면 좌석이 확정 및 관리자에게 주문이 들어가야 합니다.
- 좌석 만료의 초기값은 2시간 입니다.
- 결제가 취소되면 좌석이 원래대로 돌아와야 합니다.

#### Resoures

- [iamport-react-native](https://github.com/iamport/iamport-react-native)