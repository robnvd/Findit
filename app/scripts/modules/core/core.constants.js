(function () {
  'use strict';

  angular
    .module('Findit.Core')
    .constant('toastr', toastr)
    .constant('dateTimeFormat', 'DD MMM Y - HH:mm')
    .constant('moment', moment)
    .constant('searchResultTypes', ['atm', 'bank', 'bar', 'beauty_salon', 'book_store', 'bus_Station', 'cafe',
      'campground', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'casino', 'city_hall',
      'clothing_store', 'convenience_store', 'dentist', 'department_store', 'doctor', 'electrician',
      'electronics_store', 'fire_station', 'florist', 'furniture_store', 'gas_station', 'gym',
      'hair_care', 'hardware_store', 'hospital', 'jewelry_store', 'laundry', 'library', 'liquor_store',
      'meal_delivery', 'meal_takeaway', 'movie_theater', 'night_club', 'park', 'parking', 'pet_store',
      'pharmacy', 'police', 'post_office', 'restaurant', 'school', 'shoe_store', 'shopping_mall', 'stadium',
      'store', 'subway_station', 'train_station', 'university', 'zoo'
    ]);
})();
