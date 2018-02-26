let randurl = "https://www.wikipedia.org/wiki/Special:Random";

$( "#randWiki" ).html(
        "<a href=" + randurl + ">Or click here to get a random wikipedia page</a>"
        );


/*
 * Get the search value and perform the api call
 */
function getWiki() {
    var apiurl = "https://www.wikipedia.org/w/api.php?";
    var term = $('#search').find('input[name="wiki"]').val().replace(/ /g, '_');

    $('#container').html(''); 
    //console.log(term);
    function test(callback) {
        apiurl += $.param({
            'action': 'opensearch',
            'search': term,
            'format': 'json',
            'limit': 5
        });

        //console.log(apiurl);
        $.ajax({
            url: apiurl,
            dataType: 'jsonp',
            success: function(a) {
                callback(a);
                console.log(a);
            }
            
        })
    }
    test(function(a){
        //console.log(a[3]);
        for (let i = 0; i < a[1].length; i++) {
            $("#container").append(
                "<div id='entry" + i + "'><a href='" + a[3][i] + "'</a>" + a[1][i] + "<div id='summary" + i + "'></div></div>"); 
            /*
             * Get the summary of the wikipedia article and display it when hovered
             */
            $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' +
                    a[1][i].replace(/ /g, '_'), function(data) {
                        //console.log(data['extract']);
                        $("#summary" + i).html(data['extract']);
                        $("#summary" + i).css('display', 'none');
                        $('#entry' + i).mouseenter(function() {
                            $('#summary' + i).css('display', 'block');
                        });
                        $('#entry' + i).mouseleave(function() {
                            $('#summary' + i).css('display', 'none');
                        });
                    });
        }
    });

}




