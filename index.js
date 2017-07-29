var fonts=[];

// CodeMirror
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	lineNumbers: true,
	styleActiveLine: true,
	matchBrackets: true,
	theme: "pastel-on-dark",
	lineWrapping: true
});

function applyColors() {
	$("body").attr("style" ,"--foreground:" + $(".CodeMirror .cm-def").css("color") + "; --background:" + $(".CodeMirror").css("background-color") + ";");
}

// CodeMirror theme selector
var input = document.getElementById("select-theme");
function selectTheme() {
	var theme = input.options[input.selectedIndex].innerHTML;
	editor.setOption("theme", theme);
	document.cookie = "theme=" + theme;
	applyColors();
}

// ProgrammingFonts font selector
function selectFont() {
	var font = window.location.hash.substring(1);

	if (font === "input") {
		$("pre").css({ fontFamily: "Input Mono, monospace" });
		$("textarea").css({ fontFamily: "Input Mono, monospace" });
		$(".CodeMirror").css({ fontFamily: "Input Mono, monospace" });
	} else {
		$("pre").css({ fontFamily: font + ", monospace" });
		$("textarea").css({ fontFamily: font + ", monospace" });
		$(".CodeMirror").css({ fontFamily: font + ", monospace" });
	}

	$("#font-info p").hide();
	$("#font-info ." + font).show();

	document.cookie = "font=" + font;
}

window.onhashchange = selectFont;

function setSize() {
	var size = $("#size").val();
	$(".CodeMirror").css({ fontSize: size + "px" });
	document.cookie = "size=" + size;
}
function setSpacing() {
	var spacing = $("#spacing").val();
	$(".CodeMirror").css({ lineHeight: spacing });
	document.cookie = "spacing=" + spacing;
}
function setAntialiasing() {
	if ($("#aliasing").is(":checked")) {
		$(".CodeMirror").removeClass("no-smooth");
		document.cookie = "antialiasing=smooth";
	} else {
		$(".CodeMirror").addClass("no-smooth");
		document.cookie = "antialiasing=no-smooth";
	}
}
function selectLanguage() {
	var lang = $("#select-language").val();
	editor.setOption("mode", lang.toLowerCase());
	document.cookie = "language=" + lang;
}

$(document).ready(function(){

	var cookieValueSpacing = document.cookie.replace(/(?:(?:^|.*;\s*)spacing\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var cookieValueSize = document.cookie.replace(/(?:(?:^|.*;\s*)size\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var cookieValueAntialiasing = document.cookie.replace(/(?:(?:^|.*;\s*)antialiasing\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var cookieValueTheme = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var cookieValueLanguage = document.cookie.replace(/(?:(?:^|.*;\s*)language\s*\=\s*([^;]*).*$)|^.*$/, "$1");

	if (cookieValueSpacing !== "") {
		$("#spacing").val(cookieValueSpacing);
	}
	if (cookieValueSize !== "") {
		$("#size").val(cookieValueSize);
	}
	if (cookieValueAntialiasing === "smooth") {
		$("#aliasing").prop('checked', true);
	} else if (cookieValueAntialiasing === "no-smooth") {
		$("#aliasing").prop('checked', false);
	}
	if (cookieValueTheme !== "") {
		$("#select-theme").val(cookieValueTheme);
	}
	if (cookieValueLanguage !== "") {
		$("#select-language").val(cookieValueLanguage);
	}

	selectTheme();
	applyColors();
	setSize();
	setSpacing();
	setAntialiasing();
	selectLanguage();

	var icon = '<svg class="octicon" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"></path></svg>'

	$.getJSON("fonts.json", function(data) {
		$.each(data, function(k,v) {
			$("#select-font").append(
				"<div class='entry'><a href='#" + v.alias + "' data-value=\"" + v.alias + "\">" +
				"<span class='name'>" + v.name + "</span>" +
				"<span class='details'>" + v.author + " (" + v.year + ") — " + v.style + ", " + v.rendering + "</span>" +
				"</a>" +
				"<a href='" + v.website + "' rel=external> " + icon + "</a></div>"
			);
			$("#font-info").append(
				"<p class=\"" + v.alias + "\"> " +
				"<a href=\""+ v.website + "\" rel=\"external\">Get " + v.name + " " + icon + "</a>" +
				"</p>"
			);
		});
		selectFont();
	});

	$("#theme-next").click(function() {
		$("#select-theme :selected").next().prop("selected", true);
		selectTheme();
	});

	$("#theme-previous").click(function() {
		$("#select-theme :selected").prev().prop("selected", true);
		selectTheme();
	});
});
