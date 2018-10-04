## Video-Player with access control

Based on the 3q video player plenigo offers you a video player with access control. You may need a 3q account one can create at [3q video](https://3q.video/de/)

There one can upload multiple videos.


### Installation

The installation is based on the 3qvideo player. All the configuration parameters you can see in their [documentation](https://github.com/3QSDN/3q.js)
```javascript
        window.plenigoVideoPlayer = window.plenigoVideoPlayer || [];

            plenigoVideoPlayer.push({
                'data-id': '5280e612-c311-11e8-ae4b-0cc47a188158', // Video ID from 3q backend
                'container': 'video1', // ID of HTML-Element in you html page
                'productIDs': 'P_PWywB6996251827351,P_ygHn66932077286351', // lst of plenigo product IDs to check access against
                'teaserLength': 2, // length of free videoteaser until video is stopped
                'no-access-callback': function (par1, par2) { // callbackfunction we call, if customer has no access
                    location.href = "/landingpage";
                }
            });
          
```

### Example with full html

Just put the plenigo Jacascript call somewhere in your html. To enable video player, add attribute `data-video="3q"`.

```html

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
</head>
<body>

    <header class="main">
        <h1>My 1st video</h1>
    </header>


        <div id="video"></div>
    
    
<script type="application/javascript"
        src="https://static.plenigo.com/static_resources/javascript/$COMPANY_ID$/plenigo_sdk.min.js" 
        data-lang="de" 
        data-video="3q"></script>

<script>

        window.plenigoVideoPlayer = window.plenigoVideoPlayer || [];

            plenigoVideoPlayer.push({
                'data-id': '5280e612-c311-11e8-ae4b-0cc47a188158',
                'container': 'video',
                'productIDs': 'P_WWWWQQQQ27351,P_WWWWQQQQ77286351',
                'sticky': true,
                'playlistbar' : true,
                'teaserLength': 2,
                'no-access-callback': function (productIds, videoId) {

                    location.href = "/video/checkout";
                }
            });
    </script>

</body>
</html>

```

If the customer has not bought at least one of the products given in the `productIDs` parameter, it will call call function given in `no-access-callback`. Here one can simply call a landing page, or open a dialog or simply start a plenigo checkout.
