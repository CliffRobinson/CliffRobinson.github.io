function getNestLevel() {
    return parseInt(document.getElementsByName('nest-level')[0].getAttribute('content'));
}

function initHeader(level) {
    let pageHeader = document.getElementsByTagName("head")[0];
    initAbsoluteHeaderLinks(pageHeader);
    //Now that the absolute links are made, let's make the relative links. 
    let rootDir = setRootDir(level);

    let insert = '\n<meta name="nest-level" content="'+level+'">';

    insert = '<link href="'+rootDir+'styles/main.css" rel="stylesheet" type="text/css" >'+'\n'+insert;
    insert = '<link href="'+rootDir+'styles/styles.css" rel="stylesheet" type="text/css" >'+'\n'+insert;

    let target = /<meta name="nest-level" content=".">/

    pageHeader.innerHTML = pageHeader.innerHTML.replace(target, insert);

    //pageHeader.innerHTML += '<link href="'+rootDir+'styles/main.css" rel="stylesheet" type="text/css" >';
    //pageHeader.innerHTML += '<link href="'+rootDir+'styles/styles.css" rel="stylesheet" type="text/css" >';
}

function setRootDir(level) {
    switch(level) {
        case 0:
            return './';
            break;
        case 1:
            return '../';
            break;
        case 2:
            return '../../';
            break;
    }
}

function initAbsoluteHeaderLinks(pageHeader) {
    
    let insert = '\n<meta name="nest-level" content="'+getNestLevel()+'">';
    insert = '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">'+'\n'+insert;
    insert = '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css">'+'\n'+insert;
    insert = '<!-- Absolute links created by pageinit-initHeader-initAbsoluteHeaderLinks -->'+'\n'+insert;

    let target = /<meta name="nest-level" content=".">/

    pageHeader.innerHTML = pageHeader.innerHTML.replace(target, insert);




    //pageHeader.innerHTML += '<meta charset="UTF-8">';
    //pageHeader.innerHTML += '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">';
    //pageHeader.innerHTML += '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css">';
    //pageHeader.innerHTML += '<!-- Absolute links created by pageinit-initHeader-initAbsoluteHeaderLinks -->';
}
/*
function initNavBar() {
    let nestLevel = getNestLevel();
    initNavBar(nestLevel);
}
*/
function initNavBar(nestLevel) {
    let rootDir = setRootDir(nestLevel);
    let navBar = document.getElementById('navbar');

    

    navBar.innerHTML = '<div class="three columns"><a class="button" href="'+rootDir+'">Main Page</a></div>';
    navBar.innerHTML += '<div class="three columns"><a class="button" href="'+rootDir+'blog/">Blog </a></div>';
    navBar.innerHTML += '<div class="three columns"><a class="button" href="'+rootDir+'EDA-projects">EDA Projects</a></div>';
    navBar.innerHTML += '<div class="three columns"><a class="button" href="'+rootDir+'Personal-Projects/">Personal Projects</a></div>';
    navBar.innerHTML += '<!-- navbar elements created by pageinit-initNavBar -->';
}

function initFooter() {
    let pageFooter = document.getElementsByTagName("footer")[0];

pageFooter.innerHTML = '<div class="foot two columns offset-by-two"><a class="icon-github"  href="https://github.com/CliffRobinson"></a></div>';
pageFooter.innerHTML += '<div class="foot two columns"><a class="icon-linkedin-circled"      href="https://www.linkedin.com/in/clifford-robinson-39b24621"></a></div>';
pageFooter.innerHTML += '<div class="foot two columns"><a class="icon-mail"                  href="mailto:clifford.f.robinson@gmail.com"></a></div>';
pageFooter.innerHTML += '<div class="foot two columns"> © Clifford Robinson, 2018</div>';
pageFooter.innerHTML += '<!-- Footer created by pageinit-initFooter() -->';
}

function startEverything(){
initFooter();
initHeader(getNestLevel());
initNavBar(getNestLevel());
}

document.addEventListener('DOMContentLoaded', startEverything);
