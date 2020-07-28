// snippet from MyData.effect.ts
/*@Effect()
getTodo$ = this.actions$
  .ofType('INIT_DATA')
  .switchMap(payload => this.myService.getData())
  .map(responseBody => ({
     type: 'INIT_DATA_SUCCESS',
     payload: responseBody.json()
  }))
  .catch((err: Error) => Observable.of(getEventFailed(err))
);*/
