# 
## 목차
```
1. 소개
2. 사용 방법
3. 제작 계기
4. 제작 과정 소개
5. 제작 후 느낀 점
6. 한계점
```

## 1. 소개
포켓몬 이름 리스트에서 이름을 클릭함에 따라 포켓몬 정보 카드를 보여주는 포트폴리오입니다.

## 2. 사용 방법

## 3. 제작 계기
- 외부 API의 가공되지 않은 데이터를 이용하여 완성도 있는 결과물을 보여줄 수 있다는 능력을 보여주고자 만들게 되었습니다.

## 4. 제작 과정 소개
- 객체지향 프로그래밍 방식으로 자바스크립트의 api fetching, eventListener, DOM manipulation과 CSS의 viewport, grid system을 이용하였습니다.
- 객체지향 프로그래밍 방식을 준수하여 직관적이고 재사용이 가능하게 프로그램을 작성하였습니다.
- Pokemon 외부 api를 이용하여 데이터를 fetching하고 응답을 필요에 맞게 사용하였습니다.
- 무한 스크롤링 기능을 구현하여 사용자가 효율적으로 필요한 만큼만의 데이터를 받아올 수 있게 하였습니다. 구현을 위해 Event 인터페이스, eventListener, 그리고 수학적 계산을 통해 스크롤이 맨 아래에 다다를 때 새로운 아이템을 불러오도록 하였습니다.
- DOM manipulation을 통해 DOM 요소를 필요에 맞게 추가하고 제거하여 컴포넌트가 업데이트될 때 이전 요소를 제거하고 새로운 요소를 추가하였습니다.
- CSS의 viewport 를 이용해 mobile portrait 모드, tablet portrait/landscape 모드, 그리고 desktop 모드를 지원하게 하였습니다. 지원하지 않는 mobile landscape 모드는 경고창을 띄워 사용자에게 다른 스크린 모드를 이용하도록 권고합니다.
- CSS의 grid 방식을 이용해 효과적인 페이지 레이아웃과 포켓몬 카드 레이아웃을 구현하였습니다.

## 5. 제작 후 느낀 점
- 본 프로젝트를 통해 자바스크립트의  api fetching, eventListener, DOM manipulation을 필요에 맞게 이용할 수 있는 능력, CSS의 viewport와 grid 방식으로 다양한 디바이스에 맞는 웹페이지를 보여줄 수 있게 되었습니다.

## 6. 한계점
- 각 브라우저마다 약간의 오차로 인해 수학적 계산이 뒤틀려 무한 스크롤링 기능이 구현되지 않는 일이 발생했습니다. 계산을 조정하여 문제를 해결하였습니다.
- 모바일 디바이스에서의 portrait 모드에서 경고 메세지가 정상적으로 뜨지 않는 걸 발견했습니다. 추후 점검할 예정입니다.