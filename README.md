# 지정 카페

## Development

- 소비자와 관리자 앱 분리
- client : react(관리자), react-native(소비자), redux 사용
- server : mongodb, nodeJS, express, socket.io
- deploy : netlify, aws

## Prerequisites

- [React](https://reactjs-kr.firebaseapp.com/) - latest
- [React-native](https://facebook.github.io/react-native/) - latest
- [Node.js](https://nodejs.org/en/download/) - latest
- [express](https://expressjs.com/ko/) - latest
- [mongodb](https://www.mongodb.com) - latest
- [socket.io](https://socket.io/) - ^2.3.0


## 관리자

## TODO

### 1. 주문확인

- 실시간으로 들어온 주문을 확인해야 합니다.
- 주문에는 주문자, 주문 메뉴명, 주문 시간 (몇 분전), 주문완료 버튼이 있어야 합니다.
- 주문완료 버튼 클릭시 주문은 사라져야 합니다.

#### Resources

- [socket.io](https://socket.io/)
- [mongodb](https://www.mongodb.com/)
- [React-native](https://facebook.github.io/react-native/)

### 2. 배치현황

- 실시간으로 현재 고객이 앉거나 앉지 않은 의자 배치현황을 보여줘야 합니다.
- 의자에 앉은 고객을 클릭시 카페 이용 만료시간을 보여줘야 합니다.
- 이용 시간 만료시 자동으로 고객이 없는 의자 표시로 바뀌어야 합니다.
- 남은 의자의 갯수를 알려줘야 합니다.

### 3. 배치조정

- 카페 의자의 배치를 조정해야합니다.
