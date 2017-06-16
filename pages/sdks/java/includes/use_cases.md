### Handle products that require payment

In a case where you need to handle if a user has bought a product, it can be done easily.

#### Server logic

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //We fill the request object with the appropriate get object and we get the Cookie header this way
    String cookieHeader = request.getHeader("Cookie");
    //the product id that the user wants to buy, remember that there are limits for the amount of characters
    String id = request.getParameter("id");
    //we fill the id with the correct product
    String returnPage = "news.jsp";
    //The id must not be empty
    if (id == null || id.trim().isEmpty()) {
        returnPage = "error.jsp";
    }
    //There is a limit for a product id, but the id can be alphanumeric
    if (id != null && id.length() > 20) {
        id = id.substring(0, 19);
    }
    try {
        //This method returns true if the user has already bought the product.
       boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader);
       boolean isNewsPaid = UserService.hasUserBought(id, cookieHeader);
       //If the user has bought the product or has no more free views, metering should be disabled
       boolean disableMeter = hasBought || !hasFreeViews;
       if (!isNewsPaid) {
            //In this example, the product costs 0.99 euros and is a non managed plenigo product
            //The description usually is filled depending on the product, but for simplicity,
            //we will hardcode it
            Product prodToChkOut = new Product(0.99, "Sample news title description", id, "EUR", 0.55);
            //Since he has not bought the product, we need to build the checkout snippet so that he can
            //do the flow on the plenigo site and buy
            String snippet = new CheckoutSnippetBuilder(prodToChkOut).build();
            //Set all the attributes that you are going to need, the snippet is a url that opens a dialog
            //initiating the checkout process
            request.setAttribute("checkoutSnippet", snippet);
            //Indicates if the news has been paid
        }
        //The company is required for the javascript SDK
        request.setAttribute("id", id);
        //If he has already bought the product, we do not need to create a checkout snippet, we
        //only need the companyId and an indicator that the product has been already paid
        request.setAttribute("companyId", PlenigoManager.get().getCompanyId());
        request.setAttribute("isPaid", isNewsPaid);
        //We set this for the javascript SDK, in order to disable metering when its not needed.
        request.setAttribute("disableMeter", disableMeter);
    }catch(PlenigoException pe){
        //error handling for PlenigoExceptions
        returnPage = "error.jsp";
    }
    RequestDispatcher rd = request.getRequestDispatcher(returnPage);
    rd.forward(request, response);
}
```

#### Page logic

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>${id}</title>
<!-- import the Plenigo Javascript SDK -->
 <script type="application/javascript" src="https://www.plenigo.com/static_resources/javascript/${companyId}/plenigo_sdk.min.js" data-disable-metered="${disableMeter}"></script>
</head>
<body>
<c:choose>
//Display all the content if the user paid, else provide a button where the user can start the checkout flow
    <c:when test="${isPaid}">
        <p>This is the news content</p>
    </c:when>
    <c:otherwise>
        <p>Information about message that has to be paid here.</p>
        <button onclick="${checkoutSnippet}">You must buy this news in order to watch the content</button>
    </c:otherwise>
</c:choose>
</body>
</html>
```
### Get user information

To get this information you must do part of the Single Sign On until you finish the Login Flow part, after this the user will be redirected to the url you specified in the login request, you can use this code in the servlet or controller that will receive this request in order to obtain user information.

```java
javax.servlet.http.HttpServletRequest request = null;
//We fill the request object with the appropriate get object and we get the Cookie header this way
if(request.getParameterMap().containsKey("code")){
    AccessTokenRequest request = new AccessTokenRequest(request.getParameter("code"), redUrl)
    //The access token can be saved in the session and whenever an access token is expired we can use the
    //TokenService#getNewAccessToken to get a new one with the refreshToken without having to go through
    //the single sign on process again.
    TokenData accessToken = TokenService.getAccessToken(request);
    UserData userData = UserService.getUserData(accessToken.getAccessToken())
    //Use the user data for any logic that you require
}
```