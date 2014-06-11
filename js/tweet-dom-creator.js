/**
 * Creates the DIV string to be appended to the HTML
 * JSON format is the standard format twitter uses
 */
function createTweetDom(tweet){

    var userName = tweet.user.name;
    var screenName = tweet.user.screen_name;
    var userLink = 'https://twitter.com/'+screenName;
    var profileImage = tweet.user.profile_image_url_https;

    var result =  '<div class="tweet clearfix">' +
        '<div class="profile-image">' +
        '<img src="'+profileImage+'" onerror="this.src=\'images/unknown-person.gif\'">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' +
        '<a href="'+userLink+'" target="_blank">'+ userName + '</a>' +
        '</span>' +
        '<span class="screen-name">' +
        '@' + screenName +
        '</span>' +
        '<span class="timestamp">' +
        formatTime(tweet.created_at) +
        '</span>' +
        '</div>' +
        '<div class="tweet-content">' +
        tweet.text;

    if(tweet.entities !== undefined && tweet.entities.media !== undefined ){
        result += '<div class="tweet-image">' +
            '<img src="' +
            tweet.entities.media[0].media_url_https +
            '">' +
            '</div>'
    }
       result+= '</div></div>'

    return result;
}

/*
 * Formats the time in the following manner
 * Longer than 24 hours (MM/dd/yyyy hh:mm:ss TT)
 * Less than 24 hours (hh:mm:ss TT)
 */
function formatTime(time){

    var now = new Date();
    var date = new Date(time);

    var amPm = "AM";

    var hour = date.getHours();

    if(hour>12) {
        hour = (hour - 12);
        amPm = "PM";
    }
    else if(hour===12)
        amPm = "PM";

    var minute = date.getMinutes();
    if(minute < 10)
        minute = '0'+minute;

    var seconds = date.getSeconds();
    if(seconds < 10)
        seconds = '0'+seconds;

    if(now.getTime()-date.getTime()>1000*60*60*24){
        return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() +
            " " + hour + ":" + minute + ":" + seconds + ' ' + amPm;
    }
    else
        return hour + ":" + minute + ":" + seconds + ' ' + amPm;
}