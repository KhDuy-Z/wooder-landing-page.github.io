document.querySelector('.btmenu').addEventListener('click', function(){
    this.classList.toggle('clicked');
    document.querySelector('.nav__menu').classList.toggle('active');
})
// Lang__option
let Lang__option = document.querySelector('.Lang__option')
document.querySelector('.Lang').addEventListener('click', function(e){
    e.stopPropagation();
    if(Lang__option.classList.contains('active')){
        Lang__option.style.display = 'none'
    }else{
        Lang__option.style.display = 'block'
    }
    Lang__option.classList.toggle('active')
})
document.body.addEventListener('click', function(){
    console.log('body click')
    Lang__option.style.display = 'none'
    Lang__option.classList.remove('active')
})
Lang__option.querySelectorAll('a').forEach((e, i) => {
    e.addEventListener('click', function(e){
        e.preventDefault();

        let text=this.innerText
        document.querySelector('.Lang span').innerText = text

    })
})

// Back to top
function backToTop(){
    let scrollTop = document.querySelector('html').scrollTop;
    if(scrollTop > 600){
        document.querySelector('.back-to-top').style.display = 'block'
    }else{
        document.querySelector('.back-to-top').style.display = 'none'
    }
}
document.querySelector('.back-to-top').addEventListener('click', function(e){
    e.preventDefault();
    window.scrollBy({
        top: -document.body.offsetHeight,
        behavior: 'smooth'
    })
})
backToTop();
window.addEventListener('scroll', backToTop)
// Scroll change color
let $slider = document.querySelector('.slider');
let $header = document.querySelector('header');
window.addEventListener('scroll', function(){
    let scrollTop = document.querySelector('html').scrollTop;
    if(scrollTop > $slider.offsetHeight - $header.offsetHeight){
        $header.style.background = 'black'
    }else{
        $header.style.background = 'transparent'
    }
})

//Video
// document.querySelectorAll('.Video .play_button').forEach((e) => {
//     e.addEventListener('click', function(e){
//         document.querySelector('.popup-video').style.display = 'flex'
//     })
// })
// document.querySelector('.popup-video .close').addEventListener('click', function(){
//     document.querySelector('.popup-video').style.display = 'none'
// })
let iframVideo = document.querySelector('#video-iframe')
document.querySelectorAll('.Video .play_button').forEach((e) => {
    e.addEventListener('click',function(e){
        let videoSrc = this.getAttribute('data-video-src')
        iframVideo.src = "https://www.youtube.com/embed/" + videoSrc;
        document.querySelector('.popup-video').style.display = 'flex'
    })
})
document.querySelector('.popup-video .close').addEventListener('click',function(){
    document.querySelector('.popup-video').style.display = 'none'
    iframVideo.src = ''
})

// Sliders
let $sliderItems = document.querySelectorAll('.slider__item');
let $sliderDots = document.querySelectorAll('.slider .dot li');
let sliderCurrent = 0;
let slideNumber = document.querySelector('.slider .number')
document.querySelector('.slider .prev').addEventListener('click',function(){
    console.log('prev')
    if(sliderCurrent > 0){
        slideTo(sliderCurrent - 1);
        // $sliderItems[sliderCurrent].classList.remove('active')
        // $sliderItems[sliderCurrent - 1].classList.add('active');
        // $sliderDots[sliderCurrent].classList.remove('is-selected');
        // sliderCurrent--;
        // $sliderDots[sliderCurrent].classList.add('is-selected')
    }
    // slideNumber.innerText = (sliderCurrent + 1).toString().padStart(2,'0');
})
document.querySelector('.slider .next').addEventListener('click',function(){
    // console.log(sliderCurrent)
    if(sliderCurrent < $sliderItems.length - 1){
        slideTo(sliderCurrent + 1);
        // $sliderItems[sliderCurrent].classList.remove('active');
        // $sliderItems[sliderCurrent + 1].classList.add('active');
        // $sliderDots[sliderCurrent].classList.remove('is-selected');
        // sliderCurrent++;
        // $sliderDots[sliderCurrent].classList.add('is-selected')
    }
    // slideNumber.innerText = (sliderCurrent + 1).toString().padStart(2,'0');
})
function slideTo(to){
    $sliderItems[sliderCurrent].classList.remove('active');
    $sliderItems[to].classList.add('active');
    $sliderDots[sliderCurrent].classList.remove('is-selected');
    $sliderDots[to].classList.add('is-selected');
    sliderCurrent = to;
    slideNumber.innerText = (to + 1).toString().padStart(2,'0');
}
$sliderDots.forEach((e, i) => {
    e.addEventListener('click', function(){
        slideTo(i)
    })
})


// $(window).on('scroll', function(){
//     let panel = $(this).next;
//     $('panel.active').stop().slideUp().removeClass('active')
//     panel.stop().toggleClass('active')
//     panel.stop().slideToggle(300);
// })

let $nav__menu = $('header .nav__menu a');
let section = []

for (let i = 0; i < $nav__menu.length; i++){
    let selector = $($nav__menu[i]).attr('data-section');
    let s = $(selector)
    section.push(s)
}

$(window).on('scroll', function(){
    let scrollTop = $(window).scrollTop();

    for(let i = 0; i < $nav__menu.length; i++){
        let topSection = section[i].position().top;
        let HeightSection = section[i].outerHeight();

        if(scrollTop + 300 >= topSection && scrollTop + 300 < (topSection + HeightSection)){
            $nav__menu.removeClass('active')
            $nav__menu[i].classList.add('active')
            break;
        }
    }

})


var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.gallery__carousel');

$(window).load(function(){
    $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        freeScroll: true
    });
})