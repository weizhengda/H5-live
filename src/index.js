import VideoPlayer from './js/videoplayer';
import VideoList from './js/videolist';
import Comment from './js/comment';
import Favoriate from './js/favoriate';
import CommentSender from './js/commentsender';
import util from './js/util';
import Answer from './js/answer';
import Home from './js/home'
require('./css/index.css');
var comment, favoriate,answer,home;
$(()=>{
	var player = new VideoPlayer({
	        id: 'J_prismPlayer',
	        autoplay: true,
	        isLive:true,
	        playsinline:true,
	        controlBarVisibility:'always',
	        source:"http://common.qupai.me/player/qupai.mp4",
	        useH5Prism:true,
	        useFlashPrism:false,
          x5_video_position:'top',
          //prismplayer 2.0.1版本支持的属性，主要用户实现在android 微信上的同层播放
          x5_type:'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
	      cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
        });
  CommentSender.setup();
  var wrapper = $('.comment-list');
  comment = new Comment(wrapper);
  favoriate  = new Favoriate(wrapper);
  answer = new Answer();
  home = new Home();
  let offset = $('.ui-tab .ui-tab-nav').offset();
  let remainHeight = util.screenHeight() - offset.top - offset.height;
  $('.ui-tab-content').height(remainHeight);
  $('.comment-textbox').show();
  $('#enter').click(function(){
    home.hide();
    player.played = true;
  })
  $(function (){
            var option = {
                role: 'tab',
                autoplay: false
            };
            var tab = new fz.Scroll('.ui-tab', option);
            /* 滑动开始前 */
            tab.on('beforeScrollStart', function(fromIndex, toIndex) {
                if(toIndex==1)
                {
                    $('.comment-textbox').hide();
                }
                else
                {
                    $('.comment-textbox').show();
                }
            });
       });
});