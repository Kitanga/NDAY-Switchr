/*  
 * May GOD Bless this Code, amen! (Leave this line untouched)
 */
/**
 * @file         Hide/show DOM Elements
 * @author       [Kitanga Nday]{@link https://twitter.com/kitanga_nday}
 * @copyright    2016 [Kitanga Nday]{@link https://twitter.com/kitanga_nday} All rights reserved
 * @license      [MIT License]{@link https://github.com/Kitanga/Switchr/blob/master/LICENSE}
 * @version      v1.0.0-stable
 */

/*TODO: Comment the whole file, every single line of code should be commented. OK almost every single line of code*/
/*TODO: Create jsdoc code blocks */

/**
 * Switchr - DOM element manipulator
 * @namespace Switchr
 * @param {Object} win Window object is given to function so that it has access to all global variables
 */
var Switchr = ( /** @lends Switchr */ function(win) {

    var self = this;

    /**
     * Helper functions for this API. Functions that shouldn't be here, but are needed
     * @type {Object}
     */
    this.helper = {};
    var helper = this.helper; /* I did this just in case later on someone wants to access the helper using Switchr outside of this self invoking function */

    /**
     * Get the length of the group. I.e, find how many elements/properties there are in an object.
     * @return {Number} Return the length
     */
    helper.getLength = function(_obj) {
        var counter = 0; /* Counter is the object that will actually do the counting of props */
        for (var i in _obj) { /* For loop through the object _obj and count how many props there are in it */
            counter++; /* Increment for each prop found */
        }
        return counter; /* Return counter for external use */
    };

    /**
     * Check the type of an object
     * @param  {Object} _obj  Could be any JavaScript object: String, Number, Function, Object, etc.
     * @param  {String} _type The type you want to check _obj with
     * @return {Boolean}      Returns a true/false value
     */
    helper.checkType = function(_obj, _type) {
        if (typeof _type === 'string') {
            var isType; /* This is the boolean that verifies if _obj is the wanted type (described by _type) */

            switch (_type) {
                case 'string':
                    if (typeof _obj === 'string') { /* Check if the _obj is a string using typeof */
                        isType = true; /* Set isType to true if this is the type... */
                    } else {
                        isType = false; /* Otherwise set isType to false */

                        /* This will be the way all checks will be done in this function */
                    }
                    break;
                case 'array':
                    if (_obj.constructor === Array) { /* For arrays, I use the object's constructor */
                        isType = true;
                    } else {
                        isType = false;
                    }
                    break;
                case 'undefined':
                    if (_obj === undefined) {
                        isType = true;
                    } else {
                        isType = false;
                    }
                    break;
                case 'function':
                    if (typeof _obj === 'function') {
                        isType = true;
                    } else {
                        isType = false;
                    }
                    break;
                case 'object':
                    if (typeof _obj === 'object') {
                        isType = true;
                    } else {
                        isType = false;
                    }
                    break;
                default:
                    console.error("Error: Something's up with parameter #2");
                    console.info('Just put the right type please.');
                    break;
            }

            if (isType !== undefined) { /* If isType was actually defined */
                return isType; /* Return it's value */
            } /* I, honestly, don't know why I have this in an if statement. Wouldn't this function be an undefined value in, e.g., bool = helper.checkType(blah, 'string'); */
        } else {
            console.error("One/All of your params aren't strings");
            console.info('Please use valid datatype (aka strings!!!!!)');
        }
    };

    /**
     * Get the first object property in object. Sort of like getting the first item in an array
     * @param  {Object} _obj Object to get first element from
     * @return {Object}      Returns whatever the first element is
     */
    helper.getFirst = function(_obj) {
        var toReturn = false; /* The object to return */

        if (_obj) { /* Check if _obj isn't undefined */
            for (var i in _obj) { /* For loop once inside of the object and get the first element */
                toReturn = (_obj[i]) ? _obj[i] : false; /* If the first element exists then get a reference for it */
                break; /* Break on the first iteration so that we have the first element only */
            }

            if (!toReturn) { /* If toReturn is false */
                console.error('There are no objects in the object.');
                console.info('Please add one or more objects inside the given object. So that this function can actually find the first element');
            }
            return toReturn; /* Return the object */
        } else {
            console.error('There are no parameters');
            console.info('Please add an object in as a parameter');
        }


    };

    /**
     * If the key exists in the obj as a property
     * @param  {String} key  The property name
     * @param  {Object} _obj The object we are searching in
     * @return {Boolean}     Return true or false
     */
    helper.ifKeyExists = function(key, _obj) {
        var exists = false; /* This is where the existence of the key is stored */
        for (var i in _obj) {
            if (i === key) { /* If i and the key are equal then the key does exist*/
                exists = true; /* Set to true 'cause it exists */
            }
        }

        return exists; /* Return the value */
    };

    /* Classes */

    /**
     * This is the class used to create Group instances.
     * @param {object} key The key used to reference the group object.
     */
    function Group(key) {

        /**
         * This is where all of the group's elements (aka HTML Element) are stored.
         * @type {Object}
         */
        this.elements = {};

        /**
         * This is what is used to add DOM elements to the group
         * @param {string|array} key  This is the key(s) used to identify elements
         * @param {string|array} id   The element's id(s) in the html code
         */
        this.add = function(key, id /* Add this in v2.0.0==> hideHow, showHow */ ) {

            /**
             * Adds elements to _obj's elements prop
             * @param {Object} _obj Object to which 'elements' belong
             * @param {string} _key The reference string used to find elements
             * @param {string} _id  ID used to find HTML Elements
             */
            function addElement(_obj, _key, _id) {
                _obj.elements[_key] = {
                    'domEle': document.getElementById(_id)
                };
            }

            if (!helper.ifKeyExists(key, this.elements)) { /* If the key doesn't exist in the group's element object then continue */

                if (helper.checkType(key, 'string') && helper.checkType(id, 'undefined')) { /* If the key's a string and the id is undefined then... */

                    /* ...we set the elements key and it's HTML Element id to key */
                    addElement(this, key, key);
                } else if (helper.checkType(key, 'array') && helper.checkType(id, 'undefined')) { /* If the key's an array and the id is undefined then... */

                    /* ...we do the same as done above but this time we use the array's strings as keys. */
                    for (var i = 0, length = key.length; i < length; i++) {
                        if (helper.checkType(key[i], 'string')) { /* Making sure that the key is a string */
                            addElement(this, key[i], key[i]);
                        }
                    }

                } else if (helper.checkType(key, 'string') && helper.checkType(id, 'string')) { /* If both the key and the id are strings then... */

                    /* Use the key as the reference key (aka property name) and the ID as the id used to get the element */
                    addElement(this, key, id);
                } else if (helper.checkType(key, 'array') && helper.checkType(id, 'array')) { /* If both the key and id are arrays then use the strings in them for the appropriate use */

                    for (var i = 0, length = key.length; i < length; i++) {
                        if (helper.checkType(key[i], 'string') && helper.checkType(id[i], 'string')) { /* Making sure that we are dealing with strings */
                            addElement(this, key[i], id[i]);
                        }
                    }
                }
            } else { /* Log errors to the browser's console telling you that the key already exists */
                console.error("The key (" + key + ") already exists.");
                console.info("Please use a different key");
            }
        };

        /**
         * Hides element(s)
         * @param  {array|string} key The key of the element to be hidden
         * @param  {function}    _ftn Function to be invoked after hiding of element
         */
        this.hide = function(key, _ftn) {
            if (!key) { /* Check if the key param was inputed */
                var element = helper.getFirst(this.elements); /* Get the first element in the elements object */

                self.hideMe(element.domEle); /* Hide element */
            } else if (helper.checkType(key, 'string')) { /* If key is a string */
                /* Hide element */
                self.hideMe(this.elements[key].domEle);
            } else if (helper.checkType(key, 'array')) { /* If key is an array */
                /* Loop through key array and get all keys to be hidden */
                for (var i = 0, length = key.length; i < length; i++) {
                    /* Hide elements that have same key as keys in array */
                    self.hideMe(this.element[key[i]].domEle);
                    /* A function that runs after the element has been hidden */
                    if (helper.checkType(_ftn, 'function')) {
                        _ftn(this.elements[key[i]].domEle); /* Invoke _ftn() */
                    }
                }
            } else if (helper.checkType(key, 'function')) { /* Check if key is a function */
                var element = helper.getFirst(this.elements); /* Get the first element in the elements object */
                /* Hide element */
                self.hideMe(element.domEle);
                key(element.domEle); /* Invoke callBack() */
            }
            if (helper.checkType(_ftn, 'function')) {
                _ftn(this.elements[key].domEle); /* Invoke _ftn() */
            }
        };

        /**
         * Hide all elements except the key given
         * @param  {string}    key The reference key for the element that shouldn't be hidden
         * @param  {function} _ftn The function that should run after all elements are hidden
         */
        this.hideAll = function(key, _ftn) {
            for (var i in this.elements) { /* For loop through elements and hide them */
                self.hideMe(this.elements[i].domEle); /* Hide this element */
            }
            if (key) { /* If key does exist */
                if (helper.checkType(key, 'string')) { /* Check if key is a string */
                    self.showMe(this.elements[key].domEle); /* This shows this element if the key param exists */
                } else if (helper.checkType(key, 'function')) { /* Check if key is a function */
                    key();
                }
            }

            if (helper.checkType(_ftn, 'function')) { /* if _ftn is a function */
                _ftn();
            }
        };

        /**
         * Show the element
         * @param  {string||array}  key  The reference key of element(s) that need to be shown
         * @param  {function}      _ftn  The function that should run after an element is shown
         */
        this.show = function(key, _ftn) {
            if (!key) { /* If the key param doesn't exists */
                var element = helper.getFirst(this.elements); /* Get the first element in the elements object */
                /* Show element */
                self.showMe(element.domEle);
            } else if (helper.checkType(key, 'string')) { /* If key is string */
                /* Show element */
                self.showMe(this.elements[key].domEle);
            } else if (helper.checkType(key, 'array')) { /* If key is an array */
                /* Loop through key array and get all keys to be shown */
                for (var i = 0, length = key.length; i < length; i++) {
                    /* Show elements that have same key as keys in array */
                    self.showMe(this.element[key[i]].domEle);
                    if (helper.checkType(_ftn, 'function')) { /* If _ftn is a function */
                        _ftn(this.elements[key[i]].domEle); /* Invoke _ftn() */
                    }
                }
            } else if (helper.checkType(key, 'function')) { /* If key is a function */
                var element = helper.getFirst(this.elements); /* Get the first element in the elements object */
                /* Show element */
                self.showMe(element.domEle);
                key(element.domEle); /* Invoke callBack() */
            }


            /* A custom function that runs after the element has been shown */
            if (helper.checkType(_ftn, 'function')) { /* If _ftn is a function */
                _ftn(this.elements[key].domEle); /* Invoke callBack() */
            }
        };

        /**
         * Show all elements
         * @param  {string}    key The reference key for element that shouldn't be shown
         * @param  {function} _ftn The function that runs after each element is shown
         */
        this.showAll = function(key, _ftn) {
            for (var i in this.elements) { /* For loop through elements and show them */
                self.showMe(this.elements[i].domEle); /* show this element */
            }
            if (key) { /* If key param does exist */
                if (helper.checkType(key, 'string')) { /* If key is a string */
                    self.hideMe(this.elements[key].domEle); /* This hides this element if the key param exists */
                } else if (helper.checkType(key, 'function')) { /* If key is a function */
                    key();
                }
            }

            if (helper.checkType(_ftn, 'function')) { /* If _ftn is a function */
                _ftn(); /* Call function */
            }
        };
    }
    /* END Classes */

    /**
     * This is where all the groups are stored
     * @type {Object}
     */
    this.Groups = {};

    /**
     * This is the default name for the main group (when the user doesn't define a default name). CORRECTION: User will not be allowed to change default name
     * @type {String}
     */
    this.baseGroupName = 'Father';

    /**
     * This is the function that hides the element. I created this because it was too repetetive in the show/hide/showAll/hideAll functions
     * @param  {Object} _ele The HTML Element that needs to be hidden
     */
    this.hideMe = function(_ele) {
        if (_ele) { /* If the _ele does exist */
            _ele.hidden = (_ele.hidden) ? true : true; /* Hide the element */
        } else {
            console.error('There are no parameters');
            console.info('Please add an html element in as a parameter');
        }
    };

    /**
     * This is the function that shows the element. I created this for the same reasons as this.hideMe()
     * @param  {String} _ele The HTML element that needs to be shown
     */
    this.showMe = function(_ele) {
        if (_ele) { /* If _ele exists or is set */
            _ele.hidden = (_ele.hidden) ? false : false; /* Show element */
        } else {
            console.error('There are no parameters');
            console.info('Please add an html element in as a parameter');
        }
    };

    /**
     * The function used to add groups to the Groups object
     * @param {String} group The key you want to use to reference the group
     */
    this.addGroup = function(group) {
        if (group && helper.ifKeyExists(group, this.Groups)) {
            if (helper.checkType(group, 'string')) { /* If the parameter is a string... */
                this.createGroup(group); /* Create 1 group using the key as the key */
            } else if (helper.checkType(group, 'array')) { /* If the param is an array... */
                for (var i = 0, length = group.length; i < length; i++) {
                    this.createGroup(group[i]); /* Create multiple group objects using the strings in array as keys */
                }
            }
        } else {
            console.error("There are no parameters or your param isn't a string");
            console.info('Please add either a string or array of strings as parameter');
        }
    };

    /**
     * Creates a new instance of Group()
     * @param  {String} key The string you want to use as a reference for this new group
     */
    this.createGroup = function(key) {
        this.Groups[key] = new Group(key);
    };

    /**
     * This function returns a reference to a group that the key references
     * @param  {String} key The key used to find the group
     * @return {Object}     The group object that the key references
     */
    this.group = function(key) {

        /**
         * This is the object which will be returned for further work
         * @type {Object}
         */
        var toReturn = {};

        if (!key) { /* If the key doesn't exist */
            toReturn = helper.getFirst(this.Groups); /* Get the first group */
            if (!toReturn) { /* Check this to see if there are no Group objects in Group object */
                console.error('There are no groups in the Group Object.');
                console.info('Please add one or more groups using the addGroup(key)');
            }
        } else if (key) { /* And if the key exists */
            var keyFound = false; /* If the key has been found then reference the object it points to */
            for (var i in this.Groups) {
                if (key === i) {
                    toReturn = this.Groups[key]; /* Set the variable that needs to be returned to the found group */
                    keyFound = true; /* Set keyFound to true so that the console logs below aren't executed */
                    break;
                }
            }
            if (!keyFound) { /* if key wasn't found */
                console.error('Your key: ' + key + '. was not found in the Group Object.');
                console.info('Please add this key using addGroup(key)');
                return false;
            }
        }

        return toReturn;
    };

    /**
     * This initializes Switchr by creating the first group(s)
     * @param  {String||Array} groupKey The string or array of strings to be used to create the groups
     */
    this.init = function(groupKey) {
        if (groupKey) { /* If param exists */
            if (helper.checkType(groupKey, 'array')) { /* If the param's a key */
                for (var i = 0, length = groupKey.length; i < length; i++) {
                    if (helper.checkType(groupKey[i], 'string')) { /* Make sure that the key is a string*/
                        this.createGroup(groupKey[i]); /* Create groups using strings in array */
                    }
                }
            } else {
                console.error("Parameter 1's data type should be Array. Data type of inputed parameter " + typeof groupKey);
            }
            /* Commentted the code block below because there's no need to rename the default group since it'll be the only one. User will most probably only call .group() since there's only one group */
            /* else if (typeof groupKey === 'string') {
                this.baseGroupName = key;
                this.groups[groupKey];
            }*/
        } else {
            this.createGroup(this.baseGroupName); /* If the param doesn't exist then we create a single group named 'Father' */
        }
    };

    return this;
})(window);