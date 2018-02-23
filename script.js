let randurl = "https://www.wikipedia.org/wiki/Special:Random";
let apiurl = "https://www.wikipedia.org/w/api.php?";

$( "#randWiki" ).html(
        "<a href=" + randurl + ">Click to get a random wikipedia page!</a>"
        );


function test(callback) {
    apiurl += $.param({
        'action': 'opensearch',
        'search': 'SanFrancisco',
        'format': 'json',
        'limit': 10
    });
    //console.log(apiurl);
    $.ajax({
        url: apiurl,
        dataType: 'jsonp',
        success: function(a) {
            callback(a);
        }
    })
}
test(function(a){
    //console.log(a[3]);
    for (let i = 0; i < a[3].length; i++) {
        $("#container").append(
            "<div class='entry'><a href='" + a[3][i] + "'</a>" + a[3][i] + "</div>"); 
    }
});


