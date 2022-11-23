const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let photoArray=[];
let imageLoad=0;
let totalImages=30;
let ready=false;
// UNSPLASH API
const count=30;
const apiKey='4OSRUxNc7b_B4TU0R_y6X1xPMq-r2IqiI5qFORUogy8';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all the images are loaded
function imageLoaded(){
    console.log("Image Loaded");
    imageLoad++;
    if(imageLoad===totalImages){
        loader.hidden=true;
        ready=true;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// Display Photos by creating elements for link and photos and adding to DOM
function displayPhotos(){
    imageLoad=0;
    totalImages=photoArray.length;
    // Run function for each object in photoArray
    photoArray.forEach((photo)=>{
        // create <a> to link to Unsplash
        const item=document.createElement('a');
        
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // Create img for Photo
        const img=document.createElement('img');
        
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
        // Event Listener ,Check when each is finished loading
        img.addEventListener('load',imageLoaded);
        // Put img inside a and put both inside imageConatiner
        item.appendChild(img);
        imageContainer.appendChild(item);

    })

}
// Get photos from Unsplash
async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photoArray=await response.json();
        
        displayPhotos();
    }catch(error){

    }
}

// Check to see if scrollling near buttom of page,load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
    }
})
getPhotos();