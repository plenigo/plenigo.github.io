/**
 * Created by soenke on 26.06.17.
 */


(function ($) {

    // https://gist.github.com/yuanying/455571
    var createToc = function(contents_selector, target_selector){
        var prePos = 0,
            numOfSections = [],
            parent = $('<div>'),
            toc = parent,
            ul = null;

        $(contents_selector).find(':header').each(function(){
            var position = parseInt(this.nodeName.charAt(1)),
                i;


            if (prePos < position) {
                numOfSections[position - 1] = 1;
                prePos = position;

                ul = $('<ul>');
                parent.append(ul);
            } else if ( prePos == position ) {
                numOfSections[position - 1] += 1;
            } else if (prePos > position){
                var gapPosition = prePos - position;
                numOfSections[position - 1] += 1;
                prePos = position;

                for (i=0; i<gapPosition; i++) {
                    parent = $(ul.parent().get(0));
                    ul = $(parent.parent().get(0));
                }
            }
            var secName = '',
                title = '';

            for (i=1; i<position; i++) {
                var sec = numOfSections[i];
                title +=(sec + '.');
                secName += (sec + '_');
            }
            title += ( ' ' + $(this).text() );
            // $(this).html('<a name="s'+ secName + '">' + title + '</a>');

            if ($(this).is("h1")) {
                return true;
            }

            var li = $('<li><a href="#' + $(this).attr("id") + '">' + title + '</a></li>');
            ul.append(li);
            parent = li;
        });
        $(target_selector).html(toc);
    };

    createToc($("#main_content"), $("#onSite"));

    $("#navHandle").click(function (event) {
       $("body").toggleClass("menu-open");
       event.preventDefault();
    });

}(jQuery));