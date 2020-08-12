'use strict';

const fremont = {
  name: 'Fremont',
  city: 'Seattle',
  population: '23,566',
  founded: '1820',
  body: '<p>This is example text to show you how <strong>HTML</strong> can be escaped using <em>Mustache</em>.</p>'
};

const templateHtml = document.getElementById('neighborhood-template').innerHTML;
const newElement = Mustache.render(templateHtml, fremont);

console.log(newElement);


const renderMustacheAndJquery = (obj) => {
  const template = $('#neighborhood-template').html();
  const newElement = Mustache.render(template, obj);
  $('section').append(newElement);
};

renderMustacheAndJquery(fremont);


neighborhoodDataSet.forEach(renderMustacheAndJquery);
