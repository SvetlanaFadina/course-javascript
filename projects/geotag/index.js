/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import './index.html';
import './index.css'
import { formTemplate } from './templates';

const reviews = [];
document.addEventListener('DOMContentLoaded', () => {
  ymaps.ready(init);
  
  

  function init() {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 12,
    })
    myMap.events.add('click', function(e) {
        const coords = e.get('coords');

        openBallon(myMap, coords)
    });

    for (const review of getReviewsFromLS() || []) {
        addCluster(myMap, review.coords)
    }
  }
});

function getReviewsFromLS() {
    const reviews = localStorage.reviews
    console.log(reviews || "[]");
    return JSON.parse(reviews || "[]")
}

function getOptionsCluster(coords) {
    const clusterObjects = [];

    for (const review of reviews) {
        if (JSON.stringify(review.coords) === JSON.stringify(coords)) {
            const geoObj = new ymaps.GeoObject({
                geometry: {type: 'Point', coordinates: coords}
            })
            clusterObjects.push(geoObj) 
        }
        
    }

    return clusterObjects
}

function addCluster(map, coords) {
    const clusterer = new ymaps.Clusterer({clusterDisableClickZoom: true})
    clusterer.options.set('hasBalloon', false)

    function addToCluster() {
        const myGeoObjects = getOptionsCluster(coords)
        clusterer.add(myGeoObjects)
        map.geoObjects.add(clusterer)
        map.balloon.close()
    }

    clusterer.events.add('click', function(e) {
        e.preventDefault()
        openBallon(map, coords, clusterer, addToCluster)
    })

    addToCluster()
}

function getReviewList(coords) {
    let reviewListHTML = ''

    for (const review of reviews) {
        if (JSON.stringify(review.coords) === JSON.stringify(coords)) {
            reviewListHTML += `
                <div class ="review">
                    <div class="author"><strong>${review.author}</strong> ${review.place}</div>
                    <div>${review.reviewText}</div>
                </div>
            `
        }
    }
    return reviewListHTML
}

async function openBallon(map, coords, clusterer, fn) {
    await map.balloon.open(coords, {
        content: `<div class="reviews">${getReviewList(coords)}</div>${formTemplate}`
    })
    
    document.querySelector('#add-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (clusterer) {
            clusterer.removeAll()
        }

        const review = {
            coords,
            author: this.elements.author.value,
            place: this.elements.place.value,
            reviewText: this.elements.review.value,
        }

        reviews.push({
            coords: coords,
            author: this.elements.author.value,
            place: this.elements.place.value,
            reviewText: this.elements.review.value,
        });

        localStorage.reviews = JSON.stringify([...getReviewsFromLS(), review])
        !fn ? addCluster(map, coords) : fn()
       
        map.balloon.close()

        const addedReviews = JSON.stringify(reviews);

        localStorage.setItem("key", addedReviews);
    })
}



