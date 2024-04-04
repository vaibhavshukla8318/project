/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


/*==================== profile details ====================*/
const profileDetails = document.querySelector(".profile-details");
const profile = document.getElementById("profile");
const profileImage = document.getElementById("profile-image");

// Add an event listener to the document to handle clicks outside the profileDetails container
document.addEventListener("click", (event) => {
    const isClickInsideProfileDetails = profileDetails.contains(event.target);
    
    if (!isClickInsideProfileDetails) {
        profile.style.display = "none";
        appearance.style.display = "none"
    }
});

// Stop propagation of click events inside the profileDetails container to prevent it from triggering the document click handler
profileDetails.addEventListener("click", (event) => {
    event.stopPropagation();
  
        profileImage.style.transform= 'rotate(45deg)';
        profileImage.style.transition= 'transform 0.5s ease';
  

    if(profile.style.display === "block"){
                profile.style.display = "none";
            }
            else{
                profile.style.display = "block";
    }
});

/*==================== Appearance container ====================*/

const appearanceContainer = document.getElementById("appearance-container");
const appearance = document.getElementById("appearance");

appearanceContainer.addEventListener("click", (event)=>{
    event.stopPropagation();

    if(appearance.style.display === "block"){
        appearance.style.display = "none";
    }
    else{
        profile.style.display = "none";
        appearance.style.display = "block";
    }
})

/*==================== Theme(Its not working) ====================*/
// theme




/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top <offset + height){
            // active navbar Links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate'); 
        }
        // if want to use animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    /*================sticky header ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== sticky navbar ====================*/
 
    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
};


/*==================== read more ====================*/
document.addEventListener("DOMContentLoaded", function () {
    const readMoreBtn = document.querySelector(".read-more-btn");
    const readMoreText = document.querySelector(".read-more-text");

    readMoreBtn.addEventListener("click", function () {
        readMoreText.classList.toggle("active");

        if (readMoreText.classList.contains("active")) {
            readMoreBtn.textContent = "Read Less";
        } else {
            readMoreBtn.textContent = "Read More";
        }
    });
});
