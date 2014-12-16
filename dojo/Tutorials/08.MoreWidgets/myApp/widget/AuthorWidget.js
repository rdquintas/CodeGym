define([
    "dojo/_base/declare",
    "dojo/_base/fx", "dojo/_base/lang", "dojo/dom-style", "dojo/mouse", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/AuthorWidget.html"
], function(declare, baseFx, lang, domStyle, mouse, on, _WidgetBase, _TemplatedMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        name: "No Name",
        // Using require.toUrl, we can get a path to our AuthorWidget's space
        // and we want to have a default avatar, just in case
        avatar: require.toUrl("./images/defaultAvatar.png"),
        bio: "",
        // Our template - important!
        templateString: template,
        // A class to be applied to the root node in our template
        baseClass: "authorWidget",
        // A reference to our background animation
        mouseAnim: null,
        // Colors for our background animation
        baseBackgroundColor: "#fff",
        mouseBackgroundColor: "#def"
    });
});
