/**
 * Created by soenke on 26.06.17.
 */


(function ($) {

    // https://gist.github.com/yuanying/455571
    var createToc = function(contents_selector, target_selector){
        var prePos = 0;
        var numOfSections = [];
        var parent = $('<div>');
        var toc = parent;
        var ul = null;
        $(contents_selector).find(':header').each(function(){
            var position = parseInt(this.nodeName.charAt(1));
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

                for (var i=0; i<gapPosition; i++) {
                    parent = $(ul.parent().get(0));
                    ul = $(parent.parent().get(0));
                }
            }
            var secName = '';
            var title = '';
            for (var i=0; i<position; i++) {
                var sec = numOfSections[i];
                title +=(sec + '.');
                secName += (sec + '_');
            }
            title += ( ' ' + $(this).text() );
            // $(this).html('<a name="s'+ secName + '">' + title + '</a>');

            var li = $('<li><a href="#s' + secName + '">' + title + '</a></li>');
            ul.append(li);
            parent = li;
        });
        $(target_selector).replaceWith(toc);
    };

    createToc($("#main_content"), $("#onSite"));


}(jQuery));