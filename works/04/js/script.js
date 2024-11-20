(function($){

/*---------------------------------------------
	Slider
  ---------------------------------------------*/

$(window).on("load", function() {

	var interval = 5000;	// 画像が切り替わる間隔
	var timerID;
	var btnlock = 0;
	var current = 0;
	var $mv = $("#mainvisual li");
	var $btn = $("#mainvisual-button a");

	// ボタンをクリックしたときの処理
	$btn.on("click", function() {
		// 押されたボタンに対応した画像が現在表示中であれば動作をキャンセル
		if($(this).hasClass("current")) return false;
		// 押されたボタンに対応した画像へのスライド処理を実行
		var next = $btn.index(this);
		slide(next);
		return false;
	});

	// スライドを行うための処理
	var slide = function(n) {
		// 現在スライド動作中であれば新たな動作をキャンセルする
		if(btnlock) return false;
		// ボタンクリックを禁止する
		btnlock = 1;
		// 自動スライド処理を止める
		clearTimeout(timerID);
		// ボタンの表示を切り替える
		$btn.removeClass("current").eq(n).addClass("current");
		// 現在表示されている画像を背面に移動し、position:absoluteを設定
		$mv.eq(current).css({position:"absolute", zIndex:"1"});
		// 次に表示される画像を前面に移動し、position:relativeを設定、フェードしながら表示させる
		$mv.eq(n).css({position:"relative", zIndex:"1000", display:"block", opacity:"0"}).animate({opacity:"1"}, 500, function() {
			// 背面に移動した画像を非表示にする
			$mv.eq(current).css({display:"none"});
			current = n;
			// ボタンクリックを有効にする
			btnlock = 0;
			// 自動スライド処理を再開
			autoSlide();
		});
	}

	// 自動スライドのための処理
	var autoSlide = function() {
		// 一定時間経過後にスライド処理を実行
		timerID = setTimeout(function() {
			// 次の画像が何かを判定
			var next = (current == $mv.length - 1) ? 0 : current + 1;
			// 次の画像へのスライド処理を実行
			slide(next);
		}, interval);
	}

	// 自動スライド処理を実行
	autoSlide();

});



/*---------------------------------------------
	for Retina Display
  ---------------------------------------------*/

$(document).ready(function() {
	$("noscript[data-large][data-small]").each(function() {
		/* 解像度を判別し、高解像度であれば高解像度用画像のパスを変数に格納 */
		var src = (window.devicePixelRatio > 1) ?
			 $(this).data("large") :
			 $(this).data("small");
		/* img要素を書き込む */
		$("<img src='"+src+"' alt='"+$(this).data("alt")+"' />").insertAfter($(this));
	});
});



/*---------------------------------------------
	Check Windows
  ---------------------------------------------*/

/* Windowの場合は、htmlタグに「win」というclassを付ける */
var nut = navigator.userAgent.toLowerCase();
if(nut.indexOf("windows") != -1) $("html").addClass("win");



/*---------------------------------------------
	To Page Top
  ---------------------------------------------*/

$(document).ready(function() {
	$("#page-top a").click(function() {
		/* body（Safari）もしくはhtml（その他のブラウザ）をトップまでスクロール */
		var topID = (nut.indexOf("safari") != -1) ? "body" : "html";
		$(topID).stop().animate({scrollTop: 0}, 800, "swing");
		return false;
	});
});

})(jQuery);
