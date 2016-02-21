/* Copyright (C) 2011 by Samuel Bailey
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* Sam's jQuery Hash Plugin
 * 
 * A jQuery plugin that saves variables to document.location.hash then gets them
 * back for you.
 *  
 * Set variables:
 *   $.hash('foo',42);       //sets the hash to #foo=42 (returns 42)
 *   $.hash('bar','asdf');   //sets the hash to #foo=42&bar=asdf (returns 'asdf')
 *   $.hash('bar','qwerty'); //sets the hash to #foo=42&bar=qwerty (returns 'qwerty')
 *
 * Get variables:
 *   $.hash('foo');          //returns '42'
 *   $.hash('bar');          //returns 'qwerty'
 *   $.hash('doesntexist');  //returns undefined
 *
 */

/*jslint browser: true, plusplus: true */
/*global jQuery */

(function ($, document, undefined) {
    "use strict";

	var getHash = function (name) { //private function
		var y, z, hashArray,
		hash = (location.href.split("#")[1] || undefined); //firefox returns a decoded string for document.location.hash, this expression returns the correct string for all browsers
		if (hash === undefined) { return undefined; }
		hashArray = hash.split(/\&/); //split the hash into an array of name=value pairs
		for (y = 0; y < hashArray.length; y++) {
			z = hashArray[y].split(/\=/); //split the name=value pair into an array [name,value]
			if (z[0] === name) { return z[1]; } //return the value as soon as we find a match
		}
		return undefined;
	}

	var setHash = function (name, value) { //private function
		var y, z, hashArray, hash, newhash,
		hash = (location.href.split("#")[1] || undefined); //firefox returns a decoded string for document.location.hash, this expression returns the correct string for all browsers
		if (getHash(name) !== undefined) {
			hashArray = hash.split(/\&/); //split the hash into an array of name=value pairs
			for (y = 0; y < hashArray.length; y++) {
				z = hashArray[y].split(/\=/); //split the name=value pair into an array [name,value]
				if (z[0] === name) {
					z[1] = value;
					hashArray[y] = z.join('=');
				}
			}
			document.location.hash = '#' + hashArray.join('&');
		} else {  //the variable doesn't exist yet
			newhash = hash ? '#' + hash + '&' : '#';
			newhash += name + '=' + value;
			document.location.hash = newhash;
		}
	}

	$.hash = $.fn.hash = function (name, value) { //jquery extension
		name = encodeURIComponent(name);
		if (value === undefined) {
			return decodeURIComponent(getHash(name));
		} else {
			setHash(name, encodeURIComponent(value));
			return value;
		}
	}

}(jQuery, document));
