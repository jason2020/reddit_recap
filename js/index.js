// example request using ajax get.
// $.get('data/condensed_data.json', function(data){
//   for (var i = 0; i < data.data.length; i++) {
//     var element = document.createElement("div");
//     var inner = document.createTextNode(data.data[i].author);
//     element.appendChild(inner);
//     document.getElementById('demo').appendChild(element);
//   }
// });

// Example using the Non JQuery AJAX XMLHttpRequest;
// var req = new XMLHttpRequest();
// req.open('GET', 'data/condensed_data.json', true);
// req.send();
// req.onreadystatechange = function (){
//   if (req.readyState === XMLHttpRequest.DONE) {
//     console.log('typeof req.response',typeof req.response);
//     var data = JSON.parse(req.response)
//     console.log(data);
//     for (var i = 0; i < data.data.length; i++) {
//       var element = document.createElement("div");
//       var inner = document.createTextNode(data.data[i].author);
//       element.appendChild(inner);
//       document.getElementById('demo').appendChild(element);
//     }
//   }
// }
window.onload = function () {
  var req = new XMLHttpRequest();
  req.open('GET', 'data/condensed_data.json', true);
  req.send();
  req.onreadystatechange = function (){
    if (req.readyState === XMLHttpRequest.DONE) {
      var data = JSON.parse(req.response)
      window.reddit_feed = data;
      startProcess();
    }
  }
  var time = document.querySelectorAll('.time')
  for (var i = 0; i < time.length; i++) {
    var unixTime = time[i].innerHTML;
    time[i].innerHTML = moment.unix(unixTime);
  }

}

function startProcess () {
  var info = window.reddit_feed.data
  var length = info.length;
  // Code goes here:
  for (var i = 0; i < length; i++) {
    var obj = info[i];
    console.log(obj);
    var articleTitle = obj.title;
    var articleThumbnail = obj.thumbnail;
    var articleAuthor = obj.author;
    var articleBody = obj.body;
    var articleTime = obj.created;


    var container = document.createElement('div');
    var post = document.createElement('div');
    var title = document.createElement('div');
    var link = document.createElement('a');
    var thumbnail = document.createElement('div');
    var image = document.createElement('img');
    var author = document.createElement('div');
    var text = document.createElement('div');
    var time = document.createElement('div');
    
    title.innerHTML = articleTitle;
    title.className += "title";

    thumbnail.appendChild(image);
    link.appendChild(thumbnail);
    link.appendChild(author);
    link.appendChild(title);
    link.appendChild(text);
    link.appendChild(time);
    post.appendChild(link);
    container.appendChild(post);

    post.className += "post";
    link.href = "javascript:void(0)";
    thumbnail.className += "thumbnail";
    image.src = articleThumbnail;
    image.alt = "thumbnail";
    author.className += "author";
    text.className += "body";
    time.className += "time";

    author.innerHTML = articleAuthor;
    text.innerHTML = articleBody;
    time.innerHTML = articleTime;

    container.style.border = "1px solid black";

    container.className += "col-sm-12 col-md-4";

    document.getElementById("main").appendChild(container);

    document.body.style.backgroundColor = "#bfff80";

    // Styling

  }
}
