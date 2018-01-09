/**
 * Created by soenke on 26.06.17.
 */


(function ($) {

    $.extend(verge);

    // https://gist.github.com/yuanying/455571
    var body = $("body"),
        nav = $("#navigation"),
        content = $("#main_content"),
        onSite = $("#onSite"),
        footer = $("footer"),
        header = $("header"),
        win = $(window),
        sc = 0,
        createToc = function(contents_selector, target_selector){
        var prePos = 0,
            numOfSections = [],
            parent = $('<div>'),
            toc = parent,
            ul = null;

        $(contents_selector).find(':header').each(function(){
            var position = parseInt(this.nodeName.charAt(1)),
                gapPosition,
                i;

            if (prePos < position) {
                // numOfSections[position - 1] = 1;
                prePos = position;

                ul = $('<ol/>');

                parent.append(ul);
            } else if ( prePos === position ) {
                // numOfSections[position - 1] += 1;
            } else if (prePos > position){
                gapPosition = prePos - position;
                // numOfSections[position - 1] += 1;
                prePos = position;

                for (i=0; i<gapPosition; i++) {
                    parent = $(ul.parent().get(0));
                    ul = $(parent.parent().get(0));
                }
            }

            var title = ( $(this).text() ),
                li = $('<li class="header' + position + '"><a href="#' + $(this).attr("id") + '">' + title + '</a></li>');

            ul.append(li);

            parent = li;

            });
            $(target_selector).html(toc);
        },
        amIOn = function () {
            onSite.find("a").removeClass("in-viewport");
            onSite.find("a").each(function () {
                var a = $(this);
                if ( $.inViewport($(a.attr("href"))) ) {
                    a.addClass("in-viewport");
                }
            });
        };

    createToc(content, onSite);

    nav.css("max-height", win.height());

    content.css("min-height", win.height() - (footer.outerHeight() + header.outerHeight()));

    $("#navHandle").click(function (event) {
       body.toggleClass("menu-open");
       event.preventDefault();
    });
    
    window.setInterval(function () {
        var offset = win.scrollTop();
        if (sc === offset) {
            return;
        }

        sc = offset;

        if (offset > 100) {
            body.addClass("scroll");
            nav.css("height", win.height());
            amIOn();
        } else {
            body.removeClass("scroll");
        }

        if ($.inViewport(footer)) {
            nav.css("height", win.height() - footer.outerHeight())
        }

    }, 500);

}(jQuery, verge));
