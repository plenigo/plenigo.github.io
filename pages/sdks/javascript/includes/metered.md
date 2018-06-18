
## execute and read metered (SPA)

With normal configuration and metered [enabled](#javascript-only-checkout), the meter will count automatically on each page load. For Single Page Applications this will not work.

### control metered
Even in Single Page Applications one have to control the metered behavior. This is done with a call of the method `plenigo.countMeteredView`. It needs one parameter to identify the actual view:

```javascript
// define the config object
var config = {
  identifier: 'myActualView' // key to define the provided view
};

// execute the metered counter with given configuration
plenigo.countMeteredView(config);
```

### get metered information
Not only in Single Page Applications one wants to read the actual metered status. You can use it in your statistic tools too. To read the metered status simply call `plenigo.getMeteredViewInfo`.

```javascript

var info = plenigo.getMeteredViewInfo();

console.log(info);

// will output
info = {
  activated: true,
  browserId: "b17ef4299ec632302ab155f3b1bb9a42"
  cookieCreation: 1526971537227,
  cookieVersion: 1526980598208,
  fingerprint: "b17ef4299ec632302ab155f3b1bb9a42",
  freeAfterLogin: 10,
  freeAfterLoginTaken: 0,
  freeViews: 20,
  ignoreSearchEngines: true,
  ignoreSocialMedia: true,
  limitReached: false,
  limitReachedAfterLogin: false,
  onlyUniqueViews: true,
  period: "MONTH",
  startTime: 1525132800000,
  startWithFirstVisit: false,
  uniquelyVisitedSites: "05ee2a41,c4ca4238,c81e728d,eccbc87e,a87ff679,e1671797,a2e84d15",
  viewsTaken: 7
 };
 ```
 
