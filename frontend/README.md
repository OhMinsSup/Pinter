프론트 엔드

  - react
  - redux
      -logger
      -saga
  - sass

# 리듀서 적용~~~
타입스크립트로 리듀서 작성 상당히 삽질을 했지만 이정도면 괜찮은 것같다. 그래도 실제 
적용될 때 작동하는지 확인해봐야 알 것 같다.

#회원가입 폼 제작
회원가입을 폼을 만들었지만 아직 api 연동과 redux 연동은 하지 않고 일단 ui만 만들었다. 아마 몇일 뒤면 만들어질  것 같다.
근데, 문제가 발생했다. router에서 url 이동이 안되는 것이다. 이게 무슨 말이냐면 내가 

```typescript
    <React.Fragment>
      <Switch>
        <Route exact={true} pate="/" component={Home} />
        <Route pate="/register" component={Register} />
      </Switch>
      <Core />
    </React.Fragment>
```
이 코드에서 내가 /register url을 입력하면 저 url에 해당되는 page로 이동해야하는데, 이동이 되지 않는다. 한번 조금 조사해보니 컴포넌트 자체가 생성되지 않는 것 같다. 왜냐하면 
Home 컴포넌트가 만들어져서 register는 생성이 안된다..... 아 이 문제 어떻게 해결해야 할까? 이거 라이브러리 문제가 같은데.....