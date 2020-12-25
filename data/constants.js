const MESSAGE_PREFIX = '#'
const ARGUMENT_PREFIX = '-'
const VALUE_PREFIX = '='

// Total
var audio_counter = 0;
var video_counter = 0;
var users = [];

//Stickers
var sticker_counter = 0;
var sticker_errors = 0;

var gif_log = 0;
var gif_errors = 0;

var mp4_sticker_log = 0;
var mp4_sticker_errors = 0;

//Help
var help_counter = 0;

//Youtube
var youtube_audio_counter = 0;
var youtube_audio_errors = 0;

var youtube_video_counter = 0;
var youtube_video_errors = 0;

//Twitter

var twitter_video_counter = 0;
var twitter_video_errors = 0;

var twitter_audio_counter = 0;
var twitter_audio_errors = 0;

//exports

exports.audio_counter = audio_counter;
exports.video_counter = video_counter;

exports.sticker_counter = sticker_counter;
exports.sticker_errors = sticker_errors;

exports.gif_log = gif_log;
exports.gif_errors = gif_errors;

exports.mp4_sticker_log = mp4_sticker_log;
exports.mp4_sticker_errors = mp4_sticker_errors;

exports.help_counter = help_counter;

exports.youtube_audio_counter = youtube_audio_counter;
exports.youtube_audio_errors = youtube_audio_errors;

exports.youtube_video_counter = youtube_video_counter;
exports.youtube_video_errors = youtube_video_errors;

exports.twitter_video_counter = twitter_video_counter;
exports.twitter_video_errors = twitter_video_errors;

exports.twitter_audio_counter = twitter_audio_counter;
exports.twitter_audio_errors = twitter_audio_errors;

exports.users = users;





exports.MESSAGE_PREFIX = MESSAGE_PREFIX;
exports.ARGUMENT_PREFIX = ARGUMENT_PREFIX;
exports.VALUE_PREFIX = VALUE_PREFIX;