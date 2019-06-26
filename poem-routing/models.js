'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const poemTitleSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  stanzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PoemStanza' }]
});

const poemStanzaSchema = mongoose.Schema({
  title: { type: mongoose.Schema.Types.ObjectId, ref: 'PoemTitle' },
  date: { type: Date, default: Date.now },
  author: { type: String, required: true },
  stanza: { type: String, required: true },
  lineNumber: { type: Number, required: false }
});

//serialize
poemTitleSchema.virtual('fullPoem').get(function() {  
  return {
    title: this.title,
    stanzas: this.stanzas.map(array => [array.stanza, array._id, array.author])
  };
});

poemTitleSchema.virtual('poemPocket').get(function() {  
  return {
    title: this.title,
    stanzas: this.stanzas.map(array => [array.stanza]),
    authors: this.stanzas.map(array => [array.author])
  };
});


const PoemTitle = mongoose.model('PoemTitle', poemTitleSchema);
const PoemStanza = mongoose.model('PoemStanza', poemStanzaSchema);

module.exports = { PoemTitle, PoemStanza };