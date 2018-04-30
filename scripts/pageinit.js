function initHeader() {
    let nestLevel = parseInt(document.getElementsByName('nest-level')[0].getAttribute('content'));
    initHeader (nestLevel);
}

function initHeader(level) {
    let pageHeader = document.getElementsByTagName("head")[0];
    initAbsoluteHeaderLinks(pageHeader);
    //Now that the absolute links are made, let's make the relative links. 
    let rootDir = '';

    switch(level) {
        case 0:
            rootDir = './';
            break;
        case 1:
            rootDir = '../';
            break;
        case 2:
            rootDir = '../../';
            break;
    }

    pageHeader.innerHTML += '<link href="'+rootDir+'styles/main.css" rel="stylesheet" type="text/css" >';
    pageHeader.innerHTML += '<link href="'+rootDir+'styles/styles.css" rel="stylesheet" type="text/css" >';
}
/*
<link href="./styles/main.css" rel="stylesheet" type="text/css" >
<link href="./styles/styles.css"  type="text/css" rel="stylesheet">
*/
function initAbsoluteHeaderLinks(pageHeader) {
    pageHeader.innerHTML += '<meta charset="UTF-8">';
    pageHeader.innerHTML += '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">';
    pageHeader.innerHTML += '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css">';
    pageHeader.innerHTML += '<!-- Absolute links created by pageinit-initHeader-initAbsoluteHeaderLinks -->';
}



function initFooter() {
    let pageFooter = document.getElementsByTagName("footer")[0];

pageFooter.innerHTML = '<div class="foot two columns offset-by-two"><a class="icon-github"  href="https://github.com/CliffRobinson"></a></div>';
pageFooter.innerHTML += '<div class="foot two columns"><a class="icon-linkedin-circled"      href="https://www.linkedin.com/in/clifford-robinson-39b24621"></a></div>';
pageFooter.innerHTML += '<div class="foot two columns"><a class="icon-mail"                  href="mailto:clifford.f.robinson@gmail.com"></a></div>';
pageFooter.innerHTML += '<div class="foot two columns">© Clifford Robinson, 2018</div>';
pageFooter.innerHTML += '<!-- Footer created by pageinit-initFooter() -->';
}

initFooter();
initHeader();

/*
<div class="foot two columns offset-by-two"><a class="icon-github"  href="https://github.com/CliffRobinson"></a></div>
<div class="foot two columns"><a class="icon-linkedin-circled"      href="https://www.linkedin.com/in/clifford-robinson-39b24621"></a></div>
<div class="foot two columns"><a class="icon-mail"                  href="mailto:clifford.f.robinson@gmail.com"></a></div>
<div class="foot two columns">© Clifford Robinson, 2018</div>
<!-- Footer created by pageinit-initFooter() -->
*/