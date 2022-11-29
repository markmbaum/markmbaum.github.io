function randomInterval (t) {
    return( t*2*Math.random() );
}

function bernoulli (p) {
    return( (Math.random() < p) ? true : false );
}

function selectTime(char) {
    t = 0;
    if (char == "\n") {
        t += randomInterval(100);
        if (bernoulli(0.02)) t += 1000;
    } else if (char == " ") {
        t += randomInterval(50);
        if (bernoulli(0.02)) t += 250;
    } else {
        t += randomInterval(20);
    }
    return(t);
}

function highlightPython (s) {
    return hljs.highlight(s, {language: "python"}).value;
}

function highlightJulia (s) {
    return hljs.highlight(s, {language: "julia"}).value;
}

function typeWriter (target, content, highlightFunc, finalFunc, index = 0) {
    if (index <= content.length) {
        var char = content.charAt(index);
        if (char == ' ' || char == '\n') {
            target.innerHTML = highlightFunc(content.slice(0,index+1));
        } else {
            target.innerHTML += content.charAt(index);
        }
        
        setTimeout(
            typeWriter,
            selectTime(char),
            target,
            content,
            highlightFunc,
            finalFunc,
            index + 1,
        );
    } else {
        target.innerHTML = highlightFunc(content);
        finalFunc();
    }
}

function stripExtension(element) {
    html = element.innerHTML;
    idx = html.indexOf('.');
    element.innerHTML = html.slice(0,idx) + '/';
}

function scriptColumns (button, script, right, left, text, highlighter, label, endFunc=function(){}) {
    button.one("click", function () {
        typeWriter(
            script,
            text,
            highlighter,
            function () {
                setTimeout(
                    function () { right.slideDown(500) },
                    250
                );
                setTimeout(
                    function () { stripExtension(label.children[0]) },
                    250
                );
                setTimeout(
                    function () { left.hide(500); },
                    10000
                );
                setTimeout(
                    function () { right.animate({width: "100%"}, 500) },
                    10000
                );
                endFunc();
            }
        );
    });
}

$(".right-column").hide(0);

$(".card").hover(
    function () {
        $(this).find(".card-text").css("text-decoration", "underline");
    },
    function () {
        $(this).find(".card-text").css("text-decoration", "none");
    }
);

scriptColumns(
    $("#research-button"),
    document.getElementById("research-script"),
    $("#research-right"),
    $("#research-left"),
    research_text,
    highlightPython,
    document.getElementById('research-button')
)

scriptColumns(
    $("#edu-button"),
    document.getElementById("edu-script"),
    $("#edu-right"),
    $("#edu-left"),
    edu_text,
    highlightJulia,
    document.getElementById('edu-button'),
    function () {
        setTimeout(
            function () {$("#advisor-error").hide(500)},
            8000
        );
    }
);